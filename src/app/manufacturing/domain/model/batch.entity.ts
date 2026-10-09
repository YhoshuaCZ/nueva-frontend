import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a manufacturing batch and its quality gates.
 */
export class Batch implements BaseEntity {
  /**
   * Unique identifier of the batch.
   */
  #id: number;

  /**
   * Unique batch code, such as B-26041.
   */
  #code: string;

  /**
   * Code of the product.
   */
  #productCode: string;

  /**
   * Code of the production order.
   */
  #orderCode: string;

  /**
   * Quantity in units.
   */
  #quantity: number;

  /**
   * Manufacturing line.
   */
  #line: string;

  /**
   * Person responsible for the batch.
   */
  #owner: string;

  /**
   * Status (planned, in-progress, on-hold, release-requested or released).
   */
  #status: string;

  /**
   * Progress from 0 to 100.
   */
  #progress: number;

  /**
   * Open incident that affects the batch, if any.
   */
  #incident: string;

  /**
   * Last activity on the batch.
   */
  #lastActivity: string;

  /**
   * Date of the last activity (ISO 8601).
   */
  #lastActivityAt: string;

  /**
   * Creates a new batch.
   * @param batch - Initial values of the batch.
   */
  constructor(batch: { id: number; code: string; productCode: string; orderCode: string; quantity: number; line: string; owner: string; status: string; progress: number; incident: string; lastActivity: string; lastActivityAt: string }) {
    this.#id = batch.id;
    this.#code = batch.code;
    this.#productCode = batch.productCode;
    this.#orderCode = batch.orderCode;
    this.#quantity = batch.quantity;
    this.#line = batch.line;
    this.#owner = batch.owner;
    this.#status = batch.status;
    this.#progress = batch.progress;
    this.#incident = batch.incident;
    this.#lastActivity = batch.lastActivity;
    this.#lastActivityAt = batch.lastActivityAt;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get productCode(): string { return this.#productCode; }
  set productCode(value: string) { this.#productCode = value; }

  get orderCode(): string { return this.#orderCode; }
  set orderCode(value: string) { this.#orderCode = value; }

  get quantity(): number { return this.#quantity; }
  set quantity(value: number) { this.#quantity = value; }

  get line(): string { return this.#line; }
  set line(value: string) { this.#line = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get progress(): number { return this.#progress; }
  set progress(value: number) { this.#progress = value; }

  get incident(): string { return this.#incident; }
  set incident(value: string) { this.#incident = value; }

  get lastActivity(): string { return this.#lastActivity; }
  set lastActivity(value: string) { this.#lastActivity = value; }

  get lastActivityAt(): string { return this.#lastActivityAt; }
  set lastActivityAt(value: string) { this.#lastActivityAt = value; }
}
