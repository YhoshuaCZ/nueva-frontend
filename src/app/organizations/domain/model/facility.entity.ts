import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a plant or laboratory of an organization.
 */
export class Facility implements BaseEntity {
  /**
   * Unique identifier of the facility.
   */
  #id: number;

  /**
   * Identifier of the organization the facility belongs to.
   */
  #organizationId: number;

  /**
   * Name of the facility.
   */
  #name: string;

  /**
   * Type of facility (manufacturing or qc-laboratory).
   */
  #type: string;

  /**
   * Time zone of the facility.
   */
  #timezone: string;

  /**
   * Person responsible for the facility.
   */
  #ownerName: string;

  /**
   * Status of the facility (active or inactive).
   */
  #status: string;

  /**
   * Creates a new facility.
   * @param facility - Initial values of the facility.
   */
  constructor(facility: { id: number; organizationId: number; name: string; type: string; timezone: string; ownerName: string; status: string }) {
    this.#id = facility.id;
    this.#organizationId = facility.organizationId;
    this.#name = facility.name;
    this.#type = facility.type;
    this.#timezone = facility.timezone;
    this.#ownerName = facility.ownerName;
    this.#status = facility.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get organizationId(): number { return this.#organizationId; }
  set organizationId(value: number) { this.#organizationId = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get type(): string { return this.#type; }
  set type(value: string) { this.#type = value; }

  get timezone(): string { return this.#timezone; }
  set timezone(value: string) { this.#timezone = value; }

  get ownerName(): string { return this.#ownerName; }
  set ownerName(value: string) { this.#ownerName = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
