import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an entry of the status history of a batch.
 */
export class BatchEvent implements BaseEntity {
  /**
   * Unique identifier of the batch event.
   */
  #id: number;

  /**
   * Code of the batch.
   */
  #batchCode: string;

  /**
   * What happened.
   */
  #title: string;

  /**
   * Who or what was involved.
   */
  #detail: string;

  /**
   * When it happened (ISO 8601).
   */
  #occurredAt: string;

  /**
   * Color of the entry (normal, warning or danger).
   */
  #tone: string;

  /**
   * Creates a new batch event.
   * @param batchEvent - Initial values of the batch event.
   */
  constructor(batchEvent: { id: number; batchCode: string; title: string; detail: string; occurredAt: string; tone: string }) {
    this.#id = batchEvent.id;
    this.#batchCode = batchEvent.batchCode;
    this.#title = batchEvent.title;
    this.#detail = batchEvent.detail;
    this.#occurredAt = batchEvent.occurredAt;
    this.#tone = batchEvent.tone;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get detail(): string { return this.#detail; }
  set detail(value: string) { this.#detail = value; }

  get occurredAt(): string { return this.#occurredAt; }
  set occurredAt(value: string) { this.#occurredAt = value; }

  get tone(): string { return this.#tone; }
  set tone(value: string) { this.#tone = value; }
}
