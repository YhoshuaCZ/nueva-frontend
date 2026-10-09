import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an alert raised when a reading leaves its limits or a sensor stops reporting.
 */
export class Alert implements BaseEntity {
  /**
   * Unique identifier of the alert.
   */
  #id: number;

  /**
   * Alert code, such as ALT-26031.
   */
  #code: string;

  /**
   * Code of the sensor.
   */
  #sensorCode: string;

  /**
   * Code or name of the equipment.
   */
  #equipmentCode: string;

  /**
   * Severity (critical or warning).
   */
  #severity: string;

  /**
   * Status (open, acknowledged, under-investigation or closed).
   */
  #status: string;

  /**
   * Short description.
   */
  #title: string;

  /**
   * What happened, with values and times.
   */
  #detail: string;

  /**
   * Affected batch, if any.
   */
  #batchCode: string;

  /**
   * Who acknowledged the alert.
   */
  #acknowledgedBy: string;

  /**
   * When it was acknowledged (ISO 8601).
   */
  #acknowledgedAt: string;

  /**
   * Corrective actions taken.
   */
  #responseNote: string;

  /**
   * Linked incident or deviation.
   */
  #linkedRecord: string;

  /**
   * Creates a new alert.
   * @param alert - Initial values of the alert.
   */
  constructor(alert: { id: number; code: string; sensorCode: string; equipmentCode: string; severity: string; status: string; title: string; detail: string; batchCode: string; acknowledgedBy: string; acknowledgedAt: string; responseNote: string; linkedRecord: string }) {
    this.#id = alert.id;
    this.#code = alert.code;
    this.#sensorCode = alert.sensorCode;
    this.#equipmentCode = alert.equipmentCode;
    this.#severity = alert.severity;
    this.#status = alert.status;
    this.#title = alert.title;
    this.#detail = alert.detail;
    this.#batchCode = alert.batchCode;
    this.#acknowledgedBy = alert.acknowledgedBy;
    this.#acknowledgedAt = alert.acknowledgedAt;
    this.#responseNote = alert.responseNote;
    this.#linkedRecord = alert.linkedRecord;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get sensorCode(): string { return this.#sensorCode; }
  set sensorCode(value: string) { this.#sensorCode = value; }

  get equipmentCode(): string { return this.#equipmentCode; }
  set equipmentCode(value: string) { this.#equipmentCode = value; }

  get severity(): string { return this.#severity; }
  set severity(value: string) { this.#severity = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get title(): string { return this.#title; }
  set title(value: string) { this.#title = value; }

  get detail(): string { return this.#detail; }
  set detail(value: string) { this.#detail = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get acknowledgedBy(): string { return this.#acknowledgedBy; }
  set acknowledgedBy(value: string) { this.#acknowledgedBy = value; }

  get acknowledgedAt(): string { return this.#acknowledgedAt; }
  set acknowledgedAt(value: string) { this.#acknowledgedAt = value; }

  get responseNote(): string { return this.#responseNote; }
  set responseNote(value: string) { this.#responseNote = value; }

  get linkedRecord(): string { return this.#linkedRecord; }
  set linkedRecord(value: string) { this.#linkedRecord = value; }
}
