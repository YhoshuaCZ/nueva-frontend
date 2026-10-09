import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an operation of the manufacturing execution of an order.
 */
export class Operation implements BaseEntity {
  /**
   * Unique identifier of the operation.
   */
  #id: number;

  /**
   * Identifier of the production order.
   */
  #orderId: number;

  /**
   * Position of the operation.
   */
  #sequence: number;

  /**
   * Name of the operation.
   */
  #name: string;

  /**
   * Equipment or station and its owner.
   */
  #equipment: string;

  /**
   * Progress from 0 to 100.
   */
  #progress: number;

  /**
   * Status (complete, in-progress, on-hold or not-started).
   */
  #status: string;

  /**
   * Record that explains the status, such as a deviation.
   */
  #reference: string;

  /**
   * Creates a new operation.
   * @param operation - Initial values of the operation.
   */
  constructor(operation: { id: number; orderId: number; sequence: number; name: string; equipment: string; progress: number; status: string; reference: string }) {
    this.#id = operation.id;
    this.#orderId = operation.orderId;
    this.#sequence = operation.sequence;
    this.#name = operation.name;
    this.#equipment = operation.equipment;
    this.#progress = operation.progress;
    this.#status = operation.status;
    this.#reference = operation.reference;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get orderId(): number { return this.#orderId; }
  set orderId(value: number) { this.#orderId = value; }

  get sequence(): number { return this.#sequence; }
  set sequence(value: number) { this.#sequence = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get equipment(): string { return this.#equipment; }
  set equipment(value: string) { this.#equipment = value; }

  get progress(): number { return this.#progress; }
  set progress(value: number) { this.#progress = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get reference(): string { return this.#reference; }
  set reference(value: string) { this.#reference = value; }
}
