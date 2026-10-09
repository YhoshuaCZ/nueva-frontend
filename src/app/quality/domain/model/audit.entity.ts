import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an internal or supplier audit.
 */
export class Audit implements BaseEntity {
  /**
   * Unique identifier of the audit.
   */
  #id: number;

  /**
   * Audit code, such as AUD-26004.
   */
  #code: string;

  /**
   * Audit title.
   */
  #title: string;

  /**
   * Dates of the audit.
   */
  #period: string;

  /**
   * Areas already reviewed.
   */
  #areasReviewed: number;

  /**
   * Areas to review.
   */
  #areasTotal: number;

  /**
   * Status (in-progress or closed).
   */
  #status: string;

  /**
   * Creates a new audit.
   * @param audit - Initial values of the audit.
   */
  constructor(audit: { id: number; code: string; title: string; period: string; areasReviewed: number; areasTotal: number; status: string }) {
    this.#id = audit.id;
    this.#code = audit.code;
    this.#title = audit.title;
    this.#period = audit.period;
    this.#areasReviewed = audit.areasReviewed;
    this.#areasTotal = audit.areasTotal;
    this.#status = audit.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get period(): string { return this.#period; }
  set period(value: string) { this.#period = value; }

  get areasReviewed(): number { return this.#areasReviewed; }
  set areasReviewed(value: number) { this.#areasReviewed = value; }

  get areasTotal(): number { return this.#areasTotal; }
  set areasTotal(value: number) { this.#areasTotal = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
