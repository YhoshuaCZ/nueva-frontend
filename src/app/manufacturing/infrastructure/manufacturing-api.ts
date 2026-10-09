import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Product} from '../domain/model/product.entity';
import {MasterFormula} from '../domain/model/master-formula.entity';
import {FormulaItem} from '../domain/model/formula-item.entity';
import {ProductionOrder} from '../domain/model/production-order.entity';
import {Operation} from '../domain/model/operation.entity';
import {Batch} from '../domain/model/batch.entity';
import {BatchEvent} from '../domain/model/batch-event.entity';
import {MaterialLot} from '../domain/model/material-lot.entity';
import {ProductsApiEndpoint} from './products-api-endpoint';
import {MasterFormulasApiEndpoint} from './master-formulas-api-endpoint';
import {FormulaItemsApiEndpoint} from './formula-items-api-endpoint';
import {ProductionOrdersApiEndpoint} from './production-orders-api-endpoint';
import {OperationsApiEndpoint} from './operations-api-endpoint';
import {BatchesApiEndpoint} from './batches-api-endpoint';
import {BatchEventsApiEndpoint} from './batch-events-api-endpoint';
import {MaterialLotsApiEndpoint} from './material-lots-api-endpoint';

/**
 * Infrastructure facade for the Manufacturing & Batch Management endpoints.
 */
@Injectable({providedIn: 'root'})
export class ManufacturingApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly productsEndpoint = new ProductsApiEndpoint(this.http);
  private readonly formulasEndpoint = new MasterFormulasApiEndpoint(this.http);
  private readonly formulaItemsEndpoint = new FormulaItemsApiEndpoint(this.http);
  private readonly ordersEndpoint = new ProductionOrdersApiEndpoint(this.http);
  private readonly operationsEndpoint = new OperationsApiEndpoint(this.http);
  private readonly batchesEndpoint = new BatchesApiEndpoint(this.http);
  private readonly batchEventsEndpoint = new BatchEventsApiEndpoint(this.http);
  private readonly materialLotsEndpoint = new MaterialLotsApiEndpoint(this.http);

  /** Retrieves the product catalog. */
  getProducts = (): Observable<Product[]> => this.productsEndpoint.getAll();

  /** Registers a product. */
  createProduct = (product: Product): Observable<Product> => this.productsEndpoint.create(product);

  /** Retrieves all master formula versions. */
  getMasterFormulas = (): Observable<MasterFormula[]> => this.formulasEndpoint.getAll();

  /** Retrieves the components and parameters of all master formulas. */
  getFormulaItems = (): Observable<FormulaItem[]> => this.formulaItemsEndpoint.getAll();

  /** Retrieves the production orders. */
  getProductionOrders = (): Observable<ProductionOrder[]> => this.ordersEndpoint.getAll();

  /** Creates a production order. */
  createProductionOrder = (order: ProductionOrder): Observable<ProductionOrder> => this.ordersEndpoint.create(order);

  /** Retrieves the operations of all orders. */
  getOperations = (): Observable<Operation[]> => this.operationsEndpoint.getAll();

  /** Updates an operation. */
  updateOperation = (operation: Operation): Observable<Operation> => this.operationsEndpoint.update(operation, operation.id);

  /** Retrieves the batches. */
  getBatches = (): Observable<Batch[]> => this.batchesEndpoint.getAll();

  /** Creates a batch. */
  createBatch = (batch: Batch): Observable<Batch> => this.batchesEndpoint.create(batch);

  /** Updates a batch. */
  updateBatch = (batch: Batch): Observable<Batch> => this.batchesEndpoint.update(batch, batch.id);

  /** Retrieves the status history of all batches. */
  getBatchEvents = (): Observable<BatchEvent[]> => this.batchEventsEndpoint.getAll();

  /** Adds an entry to the status history of a batch. */
  createBatchEvent = (event: BatchEvent): Observable<BatchEvent> => this.batchEventsEndpoint.create(event);

  /** Retrieves the raw-material lots. */
  getMaterialLots = (): Observable<MaterialLot[]> => this.materialLotsEndpoint.getAll();

  /** Records a raw-material receipt. */
  createMaterialLot = (lot: MaterialLot): Observable<MaterialLot> => this.materialLotsEndpoint.create(lot);

  /** Updates a raw-material lot. */
  updateMaterialLot = (lot: MaterialLot): Observable<MaterialLot> => this.materialLotsEndpoint.update(lot, lot.id);
}
