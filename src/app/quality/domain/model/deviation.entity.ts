import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a deviation report with its investigation, risk assessment and disposition.
 */
export class Deviation implements BaseEntity {
  /**
   * Unique identifier of the deviation.
   */
  #id: number;

  /**
   * Deviation code, such as DEV-26017.
   */
  #code: string;

  /**
   * Short title.
   */
  #title: string;

  /**
   * Affected batch.
   */
  #batchCode: string;

  /**
   * Affected production order.
   */
  #orderCode: string;

  /**
   * Deviation summary.
   */
  #summary: string;

  /**
   * Classification (minor, major or critical).
   */
  #classification: string;

  /**
   * Initial containment.
   */
  #containment: string;

  /**
   * Severity score from 1 to 5.
   */
  #severity: number;

  /**
   * Likelihood score from 1 to 5.
   */
  #likelihood: number;

  /**
   * Detectability score from 1 to 5.
   */
  #detectability: number;

  /**
   * Status (open, submitted, dispositioned or closed).
   */
  #status: string;

  /**
   * Root-cause category.
   */
  #rootCause: string;

  /**
   * Linked CAPA plan, if any.
   */
  #capaCode: string;

  /**
   * Who reported it.
   */
  #reportedBy: string;

  /**
   * When it was reported (ISO 8601).
   */
  #reportedAt: string;

  /**
   * QA owner of the assessment.
   */
  #owner: string;

  /**
   * Due date of the assessment (ISO 8601).
   */
  #dueAt: string;

  /**
   * Creates a new deviation.
   * @param deviation - Initial values of the deviation.
   */
  constructor(deviation: { id: number; code: string; title: string; batchCode: string; orderCode: string; summary: string; classification: string; containment: string; severity: number; likelihood: number; detectability: number; status: string; rootCause: string; capaCode: string; reportedBy: string; reportedAt: string; owner: string; dueAt: string }) {
    this.#id = deviation.id;
    this.#code = deviation.code;
    this.#title = deviation.title;
    this.#batchCode = deviation.batchCode;
    this.#orderCode = deviation.orderCode;
    this.#summary = deviation.summary;
    this.#classification = deviation.classification;
    this.#containment = deviation.containment;
    this.#severity = deviation.severity;
    this.#likelihood = deviation.likelihood;
    this.#detectability = deviation.detectability;
    this.#status = deviation.status;
    this.#rootCause = deviation.rootCause;
    this.#capaCode = deviation.capaCode;
    this.#reportedBy = deviation.reportedBy;
    this.#reportedAt = deviation.reportedAt;
    this.#owner = deviation.owner;
    this.#dueAt = deviation.dueAt;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get orderCode(): string { return this.#orderCode; }
  set orderCode(value: string) { this.#orderCode = value; }

  get summary(): string { return this.#summary; }
  set summary(value: string) { this.#summary = value; }

  get classification(): string { return this.#classification; }
  set classification(value: string) { this.#classification = value; }

  get containment(): string { return this.#containment; }
  set containment(value: string) { this.#containment = value; }

  get severity(): number { return this.#severity; }
  set severity(value: number) { this.#severity = value; }

  get likelihood(): number { return this.#likelihood; }
  set likelihood(value: number) { this.#likelihood = value; }

  get detectability(): number { return this.#detectability; }
  set detectability(value: number) { this.#detectability = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get rootCause(): string { return this.#rootCause; }
  set rootCause(value: string) { this.#rootCause = value; }

  get capaCode(): string { return this.#capaCode; }
  set capaCode(value: string) { this.#capaCode = value; }

  get reportedBy(): string { return this.#reportedBy; }
  set reportedBy(value: string) { this.#reportedBy = value; }

  get reportedAt(): string { return this.#reportedAt; }
  set reportedAt(value: string) { this.#reportedAt = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get dueAt(): string { return this.#dueAt; }
  set dueAt(value: string) { this.#dueAt = value; }
}
