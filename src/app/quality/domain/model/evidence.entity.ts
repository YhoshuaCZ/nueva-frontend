import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a file attached as evidence to a quality record.
 */
export class Evidence implements BaseEntity {
  /**
   * Unique identifier of the evidence.
   */
  #id: number;

  /**
   * Code of the record the file supports.
   */
  #recordCode: string;

  /**
   * File name.
   */
  #fileName: string;

  /**
   * Who attached it and what it shows.
   */
  #detail: string;

  /**
   * Status (attached, pending-review or reviewed).
   */
  #status: string;

  /**
   * Creates a new evidence.
   * @param evidence - Initial values of the evidence.
   */
  constructor(evidence: { id: number; recordCode: string; fileName: string; detail: string; status: string }) {
    this.#id = evidence.id;
    this.#recordCode = evidence.recordCode;
    this.#fileName = evidence.fileName;
    this.#detail = evidence.detail;
    this.#status = evidence.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get recordCode(): string { return this.#recordCode; }
  set recordCode(value: string) { this.#recordCode = value; }

  get fileName(): string { return this.#fileName; }
  set fileName(value: string) { this.#fileName = value; }

  get detail(): string { return this.#detail; }
  set detail(value: string) { this.#detail = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
