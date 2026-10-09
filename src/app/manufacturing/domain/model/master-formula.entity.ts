import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an approved or draft version of the master formula of a product.
 */
export class MasterFormula implements BaseEntity {
  /**
   * Unique identifier of the master formula.
   */
  #id: number;

  /**
   * Code of the product.
   */
  #productCode: string;

  /**
   * Version of the formula, such as v3.2.
   */
  #version: string;

  /**
   * Status of the version (approved or draft).
   */
  #status: string;

  /**
   * Quality manager who approved the version.
   */
  #approvedBy: string;

  /**
   * Approval date (ISO 8601).
   */
  #approvedAt: string;

  /**
   * Standard batch size in units.
   */
  #batchSize: number;

  /**
   * Creates a new master formula.
   * @param masterFormula - Initial values of the master formula.
   */
  constructor(masterFormula: { id: number; productCode: string; version: string; status: string; approvedBy: string; approvedAt: string; batchSize: number }) {
    this.#id = masterFormula.id;
    this.#productCode = masterFormula.productCode;
    this.#version = masterFormula.version;
    this.#status = masterFormula.status;
    this.#approvedBy = masterFormula.approvedBy;
    this.#approvedAt = masterFormula.approvedAt;
    this.#batchSize = masterFormula.batchSize;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get productCode(): string { return this.#productCode; }
  set productCode(value: string) { this.#productCode = value; }

  get version(): string { return this.#version; }
  set version(value: string) { this.#version = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get approvedBy(): string { return this.#approvedBy; }
  set approvedBy(value: string) { this.#approvedBy = value; }

  get approvedAt(): string { return this.#approvedAt; }
  set approvedAt(value: string) { this.#approvedAt = value; }

  get batchSize(): number { return this.#batchSize; }
  set batchSize(value: number) { this.#batchSize = value; }
}
