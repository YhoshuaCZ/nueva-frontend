import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a mandatory record missing in a closed batch.
 */
export class TraceabilityGap implements BaseEntity {
  /**
   * Unique identifier of the traceability gap.
   */
  #id: number;

  /**
   * Batch with the gap.
   */
  #batchCode: string;

  /**
   * Product of the batch.
   */
  #product: string;

  /**
   * Mandatory record that is missing.
   */
  #missingRecord: string;

  /**
   * Where the record is required.
   */
  #detail: string;

  /**
   * Creates a new traceability gap.
   * @param traceabilityGap - Initial values of the traceability gap.
   */
  constructor(traceabilityGap: { id: number; batchCode: string; product: string; missingRecord: string; detail: string }) {
    this.#id = traceabilityGap.id;
    this.#batchCode = traceabilityGap.batchCode;
    this.#product = traceabilityGap.product;
    this.#missingRecord = traceabilityGap.missingRecord;
    this.#detail = traceabilityGap.detail;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get product(): string { return this.#product; }
  set product(value: string) { this.#product = value; }

  get missingRecord(): string { return this.#missingRecord; }
  set missingRecord(value: string) { this.#missingRecord = value; }

  get detail(): string { return this.#detail; }
  set detail(value: string) { this.#detail = value; }
}
