import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an evidence-backed report for internal review, audits or DIGEMID inspections.
 */
export class RegulatoryReport implements BaseEntity {
  /**
   * Unique identifier of the regulatory report.
   */
  #id: number;

  /**
   * Report code, such as RPT-26012.
   */
  #code: string;

  /**
   * Report type.
   */
  #type: string;

  /**
   * Period or record scope.
   */
  #scope: string;

  /**
   * Report owner.
   */
  #owner: string;

  /**
   * Status (draft, blocked or approved).
   */
  #status: string;

  /**
   * Template used.
   */
  #template: string;

  /**
   * Output format.
   */
  #format: string;

  /**
   * Creation date (ISO 8601).
   */
  #createdAt: string;

  /**
   * Creates a new regulatory report.
   * @param regulatoryReport - Initial values of the regulatory report.
   */
  constructor(regulatoryReport: { id: number; code: string; type: string; scope: string; owner: string; status: string; template: string; format: string; createdAt: string }) {
    this.#id = regulatoryReport.id;
    this.#code = regulatoryReport.code;
    this.#type = regulatoryReport.type;
    this.#scope = regulatoryReport.scope;
    this.#owner = regulatoryReport.owner;
    this.#status = regulatoryReport.status;
    this.#template = regulatoryReport.template;
    this.#format = regulatoryReport.format;
    this.#createdAt = regulatoryReport.createdAt;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get type(): string { return this.#type; }
  set type(value: string) { this.#type = value; }

  get scope(): string { return this.#scope; }
  set scope(value: string) { this.#scope = value; }

  get owner(): string { return this.#owner; }
  set owner(value: string) { this.#owner = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get template(): string { return this.#template; }
  set template(value: string) { this.#template = value; }

  get format(): string { return this.#format; }
  set format(value: string) { this.#format = value; }

  get createdAt(): string { return this.#createdAt; }
  set createdAt(value: string) { this.#createdAt = value; }
}
