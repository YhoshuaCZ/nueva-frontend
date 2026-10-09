import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a QC test result calculated with the formula of an approved analytical protocol.
 */
export class AnalyticalResult implements BaseEntity {
  /**
   * Unique identifier of the analytical result.
   */
  #id: number;

  /**
   * Tested batch.
   */
  #batchCode: string;

  /**
   * Sample code.
   */
  #sampleCode: string;

  /**
   * Analytical report, such as AR-26041.
   */
  #reportCode: string;

  /**
   * Test name.
   */
  #test: string;

  /**
   * Analytical protocol and version.
   */
  #protocol: string;

  /**
   * Calculated result with its unit.
   */
  #result: string;

  /**
   * Specification.
   */
  #specification: string;

  /**
   * Analyst who submitted the result.
   */
  #analyst: string;

  /**
   * Status (within, oos or pending).
   */
  #status: string;

  /**
   * Approval of the report (requested or approved).
   */
  #approval: string;

  /**
   * Creates a new analytical result.
   * @param analyticalResult - Initial values of the analytical result.
   */
  constructor(analyticalResult: { id: number; batchCode: string; sampleCode: string; reportCode: string; test: string; protocol: string; result: string; specification: string; analyst: string; status: string; approval: string }) {
    this.#id = analyticalResult.id;
    this.#batchCode = analyticalResult.batchCode;
    this.#sampleCode = analyticalResult.sampleCode;
    this.#reportCode = analyticalResult.reportCode;
    this.#test = analyticalResult.test;
    this.#protocol = analyticalResult.protocol;
    this.#result = analyticalResult.result;
    this.#specification = analyticalResult.specification;
    this.#analyst = analyticalResult.analyst;
    this.#status = analyticalResult.status;
    this.#approval = analyticalResult.approval;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get sampleCode(): string { return this.#sampleCode; }
  set sampleCode(value: string) { this.#sampleCode = value; }

  get reportCode(): string { return this.#reportCode; }
  set reportCode(value: string) { this.#reportCode = value; }

  get test(): string { return this.#test; }
  set test(value: string) { this.#test = value; }

  get protocol(): string { return this.#protocol; }
  set protocol(value: string) { this.#protocol = value; }

  get result(): string { return this.#result; }
  set result(value: string) { this.#result = value; }

  get specification(): string { return this.#specification; }
  set specification(value: string) { this.#specification = value; }

  get analyst(): string { return this.#analyst; }
  set analyst(value: string) { this.#analyst = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get approval(): string { return this.#approval; }
  set approval(value: string) { this.#approval = value; }
}
