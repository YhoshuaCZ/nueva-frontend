import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a task assigned to an accountable owner and linked to a record.
 */
export class CollaborationTask implements BaseEntity {
  /**
   * Unique identifier of the task.
   */
  #id: number;

  /**
   * What has to be done.
   */
  #title: string;

  /**
   * Linked record.
   */
  #recordCode: string;

  /**
   * Context of the task.
   */
  #detail: string;

  /**
   * Accountable owner.
   */
  #owner: string;

  /**
   * Due date and time (ISO 8601).
   */
  #dueAt: string;

  /**
   * Status (to-do, in-review, ready, pending, open or done).
   */
  #status: string;

  /**
   * Creates a new task.
   * @param collaborationTask - Initial values of the task.
   */
  constructor(collaborationTask: { id: number; title: string; recordCode: string; detail: string; owner: string; dueAt: string; status: string }) {
    this.#id = collaborationTask.id;
    this.#title = collaborationTask.title;
    this.#recordCode = collaborationTask.recordCode;
    this.#detail = collaborationTask.detail;
    this.#owner = collaborationTask.owner;
    this.#dueAt = collaborationTask.dueAt;
    this.#status = collaborationTask.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get recordCode(): string { return this.#recordCode; }
  set recordCode(value: string) { this.#recordCode = value; }

  get detail(): string { return this.#detail; }
  set detail(value: string) { this.#detail = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get dueAt(): string { return this.#dueAt; }
  set dueAt(value: string) { this.#dueAt = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
