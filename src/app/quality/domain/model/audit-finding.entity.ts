import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a finding of an audit with its evidence and closure requirement.
 */
export class AuditFinding implements BaseEntity {
  /**
   * Unique identifier of the audit finding.
   */
  #id: number;

  /**
   * Code of the audit.
   */
  #auditCode: string;

  /**
   * Finding code, such as F-01.
   */
  #code: string;

  /**
   * Finding title.
   */
  #title: string;

  /**
   * Classification (major or minor).
   */
  #classification: string;

  /**
   * Owner of the response.
   */
  #owner: string;

  /**
   * Due date (ISO 8601).
   */
  #dueAt: string;

  /**
   * Status (evidence-pending, in-review or closed).
   */
  #status: string;

  /**
   * What the auditor observed.
   */
  #observation: string;

  /**
   * Evidence and corrective response.
   */
  #response: string;

  /**
   * What is needed to close the finding.
   */
  #closureRequirement: string;

  /**
   * Creates a new audit finding.
   * @param auditFinding - Initial values of the audit finding.
   */
  constructor(auditFinding: { id: number; auditCode: string; code: string; title: string; classification: string; owner: string; dueAt: string; status: string; observation: string; response: string; closureRequirement: string }) {
    this.#id = auditFinding.id;
    this.#auditCode = auditFinding.auditCode;
    this.#code = auditFinding.code;
    this.#title = auditFinding.title;
    this.#classification = auditFinding.classification;
    this.#owner = auditFinding.owner;
    this.#dueAt = auditFinding.dueAt;
    this.#status = auditFinding.status;
    this.#observation = auditFinding.observation;
    this.#response = auditFinding.response;
    this.#closureRequirement = auditFinding.closureRequirement;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get auditCode(): string { return this.#auditCode; }
  set auditCode(value: string) { this.#auditCode = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get classification(): string { return this.#classification; }
  set classification(value: string) { this.#classification = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get dueAt(): string { return this.#dueAt; }
  set dueAt(value: string) { this.#dueAt = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get observation(): string { return this.#observation; }
  set observation(value: string) { this.#observation = value; }

  get response(): string { return this.#response; }
  set response(value: string) { this.#response = value; }

  get closureRequirement(): string { return this.#closureRequirement; }
  set closureRequirement(value: string) { this.#closureRequirement = value; }
}
