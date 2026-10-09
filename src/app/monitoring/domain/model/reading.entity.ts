import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a telemetry reading captured automatically by ThingsBoard.
 */
export class Reading implements BaseEntity {
  /**
   * Unique identifier of the reading.
   */
  #id: number;

  /**
   * Code of the sensor.
   */
  #sensorCode: string;

  /**
   * Batch the reading is linked to, if any.
   */
  #batchCode: string;

  /**
   * Measured value.
   */
  #value: number;

  /**
   * Time of the reading (ISO 8601).
   */
  #recordedAt: string;

  /**
   * Source of the reading.
   */
  #source: string;

  /**
   * Creates a new reading.
   * @param reading - Initial values of the reading.
   */
  constructor(reading: { id: number; sensorCode: string; batchCode: string; value: number; recordedAt: string; source: string }) {
    this.#id = reading.id;
    this.#sensorCode = reading.sensorCode;
    this.#batchCode = reading.batchCode;
    this.#value = reading.value;
    this.#recordedAt = reading.recordedAt;
    this.#source = reading.source;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get sensorCode(): string { return this.#sensorCode; }
  set sensorCode(value: string) { this.#sensorCode = value; }

  get batchCode(): string { return this.#batchCode; }
  set batchCode(value: string) { this.#batchCode = value; }

  get value(): number { return this.#value; }
  set value(value: number) { this.#value = value; }

  get recordedAt(): string { return this.#recordedAt; }
  set recordedAt(value: string) { this.#recordedAt = value; }

  get source(): string { return this.#source; }
  set source(value: string) { this.#source = value; }
}
