import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a production order issued against an approved master formula.
 */
export class ProductionOrder implements BaseEntity {
  /**
   * Unique identifier of the production order.
   */
  #id: number;

  /**
   * Order code, such as PO-26041.
   */
  #code: string;

  /**
   * Code of the product.
   */
  #productCode: string;

  /**
   * Identifier of the master formula used.
   */
  #formulaId: number;

  /**
   * Code of the batch produced by the order.
   */
  #batchCode: string;

  /**
   * Planned quantity in units.
   */
  #plannedQuantity: number;

  /**
   * Manufacturing line.
   */
  #line: string;

  /**
   * Status of the order (planned, approved, in-progress, on-hold or completed).
   */
  #status: string;

  /**
   * Planned start (ISO 8601).
   */
  #plannedStart: string;

  /**
   * Planned end (ISO 8601).
   */
  #plannedEnd: string;

  /**
   * Creates a new production order.
   * @param productionOrder - Initial values of the production order.
   */
  constructor(productionOrder: { id: number; code: string; productCode: string; formulaId: number; batchCode: string; plannedQuantity: number; line: string; status: string; plannedStart: string; plannedEnd: string }) {
    this.#id = productionOrder.id;
    this.#code = productionOrder.code;
    this.#productCode = productionOrder.productCode;
    this.#formulaId = productionOrder.formulaId;
    this.#batchCode = productionOrder.batchCode;
    this.#plannedQuantity = productionOrder.plannedQuantity;
    this.#line = productionOrder.line;
    this.#status = productionOrder.status;
    this.#plannedStart = productionOrder.plannedStart;
    this.#plannedEnd = productionOrder.plannedEnd;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get productCode(): string { return this.#productCode; }
  set productCode(value: string) { this.#productCode = value; }

  get formulaId(): number { return this.#formulaId; }
  set formulaId(value: number) { this.#formulaId = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get plannedQuantity(): number { return this.#plannedQuantity; }
  set plannedQuantity(value: number) { this.#plannedQuantity = value; }

  get line(): string { return this.#line; }
  set line(value: string) { this.#line = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get plannedStart(): string { return this.#plannedStart; }
  set plannedStart(value: string) { this.#plannedStart = value; }

  get plannedEnd(): string { return this.#plannedEnd; }
  set plannedEnd(value: string) { this.#plannedEnd = value; }
}
