import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a piece of equipment with its calibration and preventive maintenance.
 */
export class Equipment implements BaseEntity {
  /**
   * Unique identifier of the equipment.
   */
  #id: number;

  /**
   * Equipment code, such as EQ-COAT-02.
   */
  #code: string;

  /**
   * Type of equipment.
   */
  #name: string;

  /**
   * Brand, model and serial number.
   */
  #model: string;

  /**
   * Plant and line or laboratory.
   */
  #location: string;

  /**
   * Calibration status (fit, due or not-fit).
   */
  #calibrationStatus: string;

  /**
   * Calibration due date (ISO 8601).
   */
  #calibrationDue: string;

  /**
   * Current calibration certificate.
   */
  #certificate: string;

  /**
   * Next preventive maintenance (ISO 8601).
   */
  #nextMaintenance: string;

  /**
   * Person responsible for maintenance.
   */
  #maintenanceOwner: string;

  /**
   * Open maintenance work order, if any.
   */
  #workOrder: string;

  /**
   * Short note about the current condition.
   */
  #healthNote: string;

  /**
   * Creates a new equipment.
   * @param equipment - Initial values of the equipment.
   */
  constructor(equipment: { id: number; code: string; name: string; model: string; location: string; calibrationStatus: string; calibrationDue: string; certificate: string; nextMaintenance: string; maintenanceOwner: string; workOrder: string; healthNote: string }) {
    this.#id = equipment.id;
    this.#code = equipment.code;
    this.#name = equipment.name;
    this.#model = equipment.model;
    this.#location = equipment.location;
    this.#calibrationStatus = equipment.calibrationStatus;
    this.#calibrationDue = equipment.calibrationDue;
    this.#certificate = equipment.certificate;
    this.#nextMaintenance = equipment.nextMaintenance;
    this.#maintenanceOwner = equipment.maintenanceOwner;
    this.#workOrder = equipment.workOrder;
    this.#healthNote = equipment.healthNote;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get model(): string { return this.#model; }
  set model(value: string) { this.#model = value; }

  get location(): string { return this.#location; }
  set location(value: string) { this.#location = value; }

  get calibrationStatus(): string { return this.#calibrationStatus; }
  set calibrationStatus(value: string) { this.#calibrationStatus = value; }

  get calibrationDue(): string { return this.#calibrationDue; }
  set calibrationDue(value: string) { this.#calibrationDue = value; }

  get certificate(): string { return this.#certificate; }
  set certificate(value: string) { this.#certificate = value; }

  get nextMaintenance(): string { return this.#nextMaintenance; }
  set nextMaintenance(value: string) { this.#nextMaintenance = value; }

  get maintenanceOwner(): string { return this.#maintenanceOwner; }
  set maintenanceOwner(value: string) { this.#maintenanceOwner = value; }

  get workOrder(): string { return this.#workOrder; }
  set workOrder(value: string) { this.#workOrder = value; }

  get healthNote(): string { return this.#healthNote; }
  set healthNote(value: string) { this.#healthNote = value; }
}
