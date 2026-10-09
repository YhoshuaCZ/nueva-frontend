import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, retry} from 'rxjs';
import {ManufacturingApi} from '../infrastructure/manufacturing-api';
import {Product} from '../domain/model/product.entity';
import {MasterFormula} from '../domain/model/master-formula.entity';
import {FormulaItem} from '../domain/model/formula-item.entity';
import {ProductionOrder} from '../domain/model/production-order.entity';
import {Operation} from '../domain/model/operation.entity';
import {Batch} from '../domain/model/batch.entity';
import {BatchEvent} from '../domain/model/batch-event.entity';
import {MaterialLot} from '../domain/model/material-lot.entity';

/**
 * Reason why a batch could not be created.
 */
export type BatchRejection = 'duplicate-code' | 'formula-not-approved';

/**
 * Holds products, master formulas, production orders, batches and raw-material lots.
 */
@Injectable({providedIn: 'root'})
export class ManufacturingStore {
  private readonly manufacturingApi = inject(ManufacturingApi);

  private readonly productsSignal = signal<Product[]>([]);
  private readonly formulasSignal = signal<MasterFormula[]>([]);
  private readonly formulaItemsSignal = signal<FormulaItem[]>([]);
  private readonly ordersSignal = signal<ProductionOrder[]>([]);
  private readonly operationsSignal = signal<Operation[]>([]);
  private readonly batchesSignal = signal<Batch[]>([]);
  private readonly batchEventsSignal = signal<BatchEvent[]>([]);
  private readonly materialLotsSignal = signal<MaterialLot[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly products = this.productsSignal.asReadonly();
  readonly formulas = this.formulasSignal.asReadonly();
  readonly formulaItems = this.formulaItemsSignal.asReadonly();
  readonly orders = this.ordersSignal.asReadonly();
  readonly operations = this.operationsSignal.asReadonly();
  readonly batches = this.batchesSignal.asReadonly();
  readonly batchEvents = this.batchEventsSignal.asReadonly();
  readonly materialLots = this.materialLotsSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /**
   * Number of batches in each status.
   */
  readonly batchCounts = computed(() => {
    const counts: Record<string, number> = {};
    this.batches().forEach(batch => counts[batch.status] = (counts[batch.status] ?? 0) + 1);
    return counts;
  });

  /**
   * Creates the store and loads the manufacturing data.
   */
  constructor() {
    this.load(this.manufacturingApi.getProducts(), this.productsSignal, 'products');
    this.load(this.manufacturingApi.getMasterFormulas(), this.formulasSignal, 'master formulas');
    this.load(this.manufacturingApi.getFormulaItems(), this.formulaItemsSignal, 'formula items');
    this.load(this.manufacturingApi.getProductionOrders(), this.ordersSignal, 'production orders');
    this.load(this.manufacturingApi.getOperations(), this.operationsSignal, 'operations');
    this.load(this.manufacturingApi.getBatches(), this.batchesSignal, 'batches');
    this.load(this.manufacturingApi.getBatchEvents(), this.batchEventsSignal, 'batch history');
    this.load(this.manufacturingApi.getMaterialLots(), this.materialLotsSignal, 'raw materials');
  }

  /** Product with the given code. */
  productByCode = (code: string): Signal<Product | undefined> => computed(() => this.products().find(item => item.code === code));

  /** Approved (effective) master formula of a product. */
  effectiveFormula = (productCode: string): Signal<MasterFormula | undefined> =>
    computed(() => this.formulas().find(formula => formula.productCode === productCode && formula.status === 'approved'));

  /** Components and parameters of a master formula. */
  itemsOfFormula = (formulaId: number): Signal<FormulaItem[]> =>
    computed(() => this.formulaItems().filter(item => item.formulaId === formulaId));

  /** Production order with the given code. */
  orderByCode = (code: string): Signal<ProductionOrder | undefined> => computed(() => this.orders().find(item => item.code === code));

  /** Operations of an order, in sequence. */
  operationsOfOrder = (orderId: number): Signal<Operation[]> =>
    computed(() => this.operations().filter(item => item.orderId === orderId).sort((a, b) => a.sequence - b.sequence));

  /** Batch with the given code. */
  batchByCode = (code: string): Signal<Batch | undefined> => computed(() => this.batches().find(item => item.code === code));

  /** Status history of a batch, oldest first. */
  eventsOfBatch = (batchCode: string): Signal<BatchEvent[]> =>
    computed(() => this.batchEvents().filter(item => item.batchCode === batchCode).sort((a, b) => a.occurredAt.localeCompare(b.occurredAt)));

  /** Raw-material lots allocated to a batch. */
  lotsOfBatch = (batchCode: string): Signal<MaterialLot[]> =>
    computed(() => this.materialLots().filter(item => item.allocatedBatch === batchCode));

  /**
   * Registers a product when its code is unique.
   * @param product - Product to register.
   * @returns False when the code already exists.
   */
  addProduct = (product: Product): boolean => {
    if (this.products().some(item => item.code.toUpperCase() === product.code.toUpperCase())) return false;
    this.manufacturingApi.createProduct(product).pipe(retry(2)).subscribe({
      next: created => this.productsSignal.update(items => [...items, created]),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to register the product'))
    });
    return true;
  };

  /**
   * Checks the rules to create a batch: a unique code and an approved master formula.
   * @param code - Batch code.
   * @param productCode - Code of the product.
   * @returns The reasons why the batch cannot be created (empty when it can).
   */
  validateBatch = (code: string, productCode: string): BatchRejection[] => {
    const reasons: BatchRejection[] = [];
    if (this.batches().some(batch => batch.code.toUpperCase() === code.toUpperCase())) reasons.push('duplicate-code');
    if (!this.effectiveFormula(productCode)()) reasons.push('formula-not-approved');
    return reasons;
  };

  /**
   * Creates a planned batch and its production order with the effective master formula.
   * @param batch - Batch to create.
   */
  addBatch = (batch: Batch): void => {
    const formula = this.effectiveFormula(batch.productCode)();
    if (!formula) return;
    this.loadingSignal.set(true);
    this.manufacturingApi.createBatch(batch).pipe(retry(2)).subscribe({
      next: created => {
        this.batchesSignal.update(items => [created, ...items]);
        this.loadingSignal.set(false);
        this.addEvent(created.code, 'Created & materials allocated', created.owner, 'normal');
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create the batch'));
        this.loadingSignal.set(false);
      }
    });
    this.manufacturingApi.createProductionOrder(new ProductionOrder({
      id: 0, code: batch.orderCode, productCode: batch.productCode, formulaId: formula.id, batchCode: batch.code,
      plannedQuantity: batch.quantity, line: batch.line, status: 'planned',
      plannedStart: new Date().toISOString(), plannedEnd: new Date().toISOString()
    })).subscribe({
      next: order => this.ordersSignal.update(items => [...items, order]),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to create the production order'))
    });
  };

  /**
   * Records progress on the next pending operation of an order. Not allowed while an operation is on hold.
   * @param orderId - Identifier of the order.
   */
  recordOperation = (orderId: number): void => {
    const operations = this.operationsOfOrder(orderId)();
    if (operations.some(operation => operation.status === 'on-hold')) return;
    const next = operations.find(operation => operation.status !== 'complete');
    if (!next) return;
    next.progress = 100;
    next.status = 'complete';
    this.manufacturingApi.updateOperation(next).pipe(retry(2)).subscribe({
      next: updated => this.operationsSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to record the operation'))
    });
  };

  /**
   * Releases a batch after the QA electronic signature.
   * @param batchCode - Code of the batch.
   */
  releaseBatch = (batchCode: string): void => {
    const batch = this.batchByCode(batchCode)();
    if (!batch) return;
    batch.status = 'released';
    batch.lastActivity = 'Released by QA';
    batch.lastActivityAt = new Date().toISOString();
    this.manufacturingApi.updateBatch(batch).pipe(retry(2)).subscribe({
      next: updated => this.batchesSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to release the batch'))
    });
    this.addEvent(batchCode, 'Released for distribution', 'QA electronic signature', 'normal');
  };

  /**
   * Records a raw-material receipt; the lot enters quarantine and moves to sampling.
   * @param lot - Lot received.
   */
  addMaterialLot = (lot: MaterialLot): void => {
    this.loadingSignal.set(true);
    this.manufacturingApi.createMaterialLot(lot).pipe(retry(2)).subscribe({
      next: created => {
        this.materialLotsSignal.update(items => [created, ...items]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to record the receipt'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Requests the QC inspection of a lot in quarantine.
   * @param lot - Lot to inspect.
   */
  requestInspection = (lot: MaterialLot): void => {
    lot.samplingStatus = 'requested';
    lot.status = 'inspection';
    this.manufacturingApi.updateMaterialLot(lot).pipe(retry(2)).subscribe({
      next: updated => this.materialLotsSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to request the inspection'))
    });
  };

  /**
   * Adds an entry to the status history of a batch.
   * @param batchCode - Code of the batch.
   * @param title - What happened.
   * @param detail - Who or what was involved.
   * @param tone - Color of the entry.
   */
  private addEvent(batchCode: string, title: string, detail: string, tone: string): void {
    this.manufacturingApi.createBatchEvent(new BatchEvent({id: 0, batchCode, title, detail, occurredAt: new Date().toISOString(), tone}))
      .subscribe({next: event => this.batchEventsSignal.update(items => [...items, event])});
  }

  /**
   * Loads a collection into a signal.
   * @param source - Request that returns the collection.
   * @param target - Signal that stores it.
   * @param name - Name used in the error message.
   */
  private load<T>(source: Observable<T[]>, target: WritableSignal<T[]>, name: string): void {
    source.subscribe({
      next: items => target.set(items),
      error: err => this.errorSignal.set(this.formatError(err, `Failed to load ${name}`))
    });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
