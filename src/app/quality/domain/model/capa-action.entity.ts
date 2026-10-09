import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a corrective or preventive action of a CAPA plan.
 */
export class CapaAction implements BaseEntity {
  /**
   * Unique identifier of the CAPA action.
   */
  #id: number;

  /**
   * Code of the CAPA plan.
   */
  #capaCode: string;

  /**
   * Action code, such as CA-01.
   */
  #code: string;

  /**
   * What has to be done.
   */
  #title: string;

  /**
   * Action owner.
   */
  #owner: string;

  /**
   * Due date (ISO 8601).
   */
  #dueAt: string;

  /**
   * Status (open, planned, in-review or complete).
   */
  #status: string;

  /**
   * Evidence required to close the action.
   */
  #evidence: string;

  /**
   * Whether the evidence was attached.
   */
  #evidenceAttached: boolean;

  /**
   * Creates a new CAPA action.
   * @param capaAction - Initial values of the CAPA action.
   */
  constructor(capaAction: { id: number; capaCode: string; code: string; title: string; owner: string; dueAt: string; status: string; evidence: string; evidenceAttached: boolean }) {
    this.#id = capaAction.id;
    this.#capaCode = capaAction.capaCode;
    this.#code = capaAction.code;
    this.#title = capaAction.title;
    this.#owner = capaAction.owner;
    this.#dueAt = capaAction.dueAt;
    this.#status = capaAction.status;
    this.#evidence = capaAction.evidence;
    this.#evidenceAttached = capaAction.evidenceAttached;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get capaCode(): string { return this.#capaCode; }
  set capaCode(value: string) { this.#capaCode = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get dueAt(): string { return this.#dueAt; }
  set dueAt(value: string) { this.#dueAt = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get evidence(): string { return this.#evidence; }
  set evidence(value: string) { this.#evidence = value; }

  get evidenceAttached(): boolean { return this.#evidenceAttached; }
  set evidenceAttached(value: boolean) { this.#evidenceAttached = value; }
}
