import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a comment of the discussion of a record. Comments are not approvals.
 */
export class TaskComment implements BaseEntity {
  /**
   * Unique identifier of the comment.
   */
  #id: number;

  /**
   * Record discussed.
   */
  #recordCode: string;

  /**
   * Author.
   */
  #author: string;

  /**
   * Initials of the author.
   */
  #initials: string;

  /**
   * When it was posted (ISO 8601).
   */
  #postedAt: string;

  /**
   * Comment text.
   */
  #text: string;

  /**
   * Creates a new comment.
   * @param taskComment - Initial values of the comment.
   */
  constructor(taskComment: { id: number; recordCode: string; author: string; initials: string; postedAt: string; text: string }) {
    this.#id = taskComment.id;
    this.#recordCode = taskComment.recordCode;
    this.#author = taskComment.author;
    this.#initials = taskComment.initials;
    this.#postedAt = taskComment.postedAt;
    this.#text = taskComment.text;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get recordCode(): string { return this.#recordCode; }
  set recordCode(value: string) { this.#recordCode = value; }

  get author(): string { return this.#author; }
  set author(value: string) { this.#author = value; }

  get initials(): string { return this.#initials; }
  set initials(value: string) { this.#initials = value; }

  get postedAt(): string { return this.#postedAt; }
  set postedAt(value: string) { this.#postedAt = value; }

  get text(): string { return this.#text; }
  set text(value: string) { this.#text = value; }
}
