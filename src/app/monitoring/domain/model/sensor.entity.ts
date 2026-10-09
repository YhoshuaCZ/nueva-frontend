import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an IoT sensor registered in ThingsBoard and installed on a piece of equipment.
 */
export class Sensor implements BaseEntity {
  /**
   * Unique identifier of the sensor.
   */
  #id: number;

  /**
   * Sensor code, such as T-204.
   */
  #code: string;

  /**
   * ThingsBoard device identifier.
   */
  #deviceId: string;

  /**
   * Measured variable (temperature, humidity or pressure).
   */
  #type: string;

  /**
   * Unit of the readings.
   */
  #unit: string;

  /**
   * Code of the equipment where the sensor is installed.
   */
  #equipmentCode: string;

  /**
   * Lower acceptable limit.
   */
  #lowerLimit: number;

  /**
   * Upper acceptable limit.
   */
  #upperLimit: number;

  /**
   * Status (active or offline).
   */
  #status: string;

  /**
   * Batch in progress that receives the readings, if any.
   */
  #assignedBatch: string;

  /**
   * Creates a new sensor.
   * @param sensor - Initial values of the sensor.
   */
  constructor(sensor: { id: number; code: string; deviceId: string; type: string; unit: string; equipmentCode: string; lowerLimit: number; upperLimit: number; status: string; assignedBatch: string }) {
    this.#id = sensor.id;
    this.#code = sensor.code;
    this.#deviceId = sensor.deviceId;
    this.#type = sensor.type;
    this.#unit = sensor.unit;
    this.#equipmentCode = sensor.equipmentCode;
    this.#lowerLimit = sensor.lowerLimit;
    this.#upperLimit = sensor.upperLimit;
    this.#status = sensor.status;
    this.#assignedBatch = sensor.assignedBatch;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get deviceId(): string { return this.#deviceId; }
  set deviceId(value: string) { this.#deviceId = value; }

  get type(): string { return this.#type; }
  set type(value: string) { this.#type = value; }

  get unit(): string { return this.#unit; }
  set unit(value: string) { this.#unit = value; }

  get equipmentCode(): string { return this.#equipmentCode; }
  set equipmentCode(value: string) { this.#equipmentCode = value; }

  get lowerLimit(): number { return this.#lowerLimit; }
  set lowerLimit(value: number) { this.#lowerLimit = value; }

  get upperLimit(): number { return this.#upperLimit; }
  set upperLimit(value: number) { this.#upperLimit = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get assignedBatch(): string { return this.#assignedBatch; }
  set assignedBatch(value: string) { this.#assignedBatch = value; }
}
