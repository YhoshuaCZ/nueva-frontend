import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a version of a controlled document, such as an SOP.
 */
export class QualityDocument implements BaseEntity {
  /**
   * Unique identifier of the quality document.
   */
  #id: number;

  /**
   * Document code, such as SOP-QA-014.
   */
  #code: string;

  /**
   * Document title.
   */
  #title: string;

  /**
   * Version number.
   */
  #version: string;

  /**
   * Status of the version (draft, in-review, approved or obsolete).
   */
  #status: string;

  /**
   * Author of the version.
   */
  #author: string;

  /**
   * Technical reviewer.
   */
  #technicalReviewer: string;

  /**
   * Quality manager who must approve the version.
   */
  #approver: string;

  /**
   * Date of the change (ISO 8601).
   */
  #changedAt: string;

  /**
   * Purpose section.
   */
  #purpose: string;

  /**
   * Scope section.
   */
  #scope: string;

  /**
   * Response procedure section.
   */
  #procedure: string;

  /**
   * Summary of the revision.
   */
  #revisionSummary: string;

  /**
   * Periodic review cycle in months.
   */
  #reviewCycleMonths: number;

  /**
   * Creates a new quality document.
   * @param qualityDocument - Initial values of the quality document.
   */
  constructor(qualityDocument: { id: number; code: string; title: string; version: string; status: string; author: string; technicalReviewer: string; approver: string; changedAt: string; purpose: string; scope: string; procedure: string; revisionSummary: string; reviewCycleMonths: number }) {
    this.#id = qualityDocument.id;
    this.#code = qualityDocument.code;
    this.#title = qualityDocument.title;
    this.#version = qualityDocument.version;
    this.#status = qualityDocument.status;
    this.#author = qualityDocument.author;
    this.#technicalReviewer = qualityDocument.technicalReviewer;
    this.#approver = qualityDocument.approver;
    this.#changedAt = qualityDocument.changedAt;
    this.#purpose = qualityDocument.purpose;
    this.#scope = qualityDocument.scope;
    this.#procedure = qualityDocument.procedure;
    this.#revisionSummary = qualityDocument.revisionSummary;
    this.#reviewCycleMonths = qualityDocument.reviewCycleMonths;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get version(): string { return this.#version; }
  set version(value: string) { this.#version = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get author(): string { return this.#author; }
  set author(value: string) { this.#author = value; }

  get technicalReviewer(): string { return this.#technicalReviewer; }
  set technicalReviewer(value: string) { this.#technicalReviewer = value; }

  get approver(): string { return this.#approver; }
  set approver(value: string) { this.#approver = value; }

  get changedAt(): string { return this.#changedAt; }
  set changedAt(value: string) { this.#changedAt = value; }

  get purpose(): string { return this.#purpose; }
  set purpose(value: string) { this.#purpose = value; }

  get scope(): string { return this.#scope; }
  set scope(value: string) { this.#scope = value; }

  get procedure(): string { return this.#procedure; }
  set procedure(value: string) { this.#procedure = value; }

  get revisionSummary(): string { return this.#revisionSummary; }
  set revisionSummary(value: string) { this.#revisionSummary = value; }

  get reviewCycleMonths(): number { return this.#reviewCycleMonths; }
  set reviewCycleMonths(value: number) { this.#reviewCycleMonths = value; }
}
