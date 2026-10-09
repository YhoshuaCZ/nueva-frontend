import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a laboratory organization registered in DoofPlus.
 */
export class Organization implements BaseEntity {
  /**
   * Unique identifier of the organization.
   */
  #id: number;

  /**
   * Legal name (razón social) of the laboratory.
   */
  #legalName: string;

  /**
   * Peruvian taxpayer number (RUC), 11 digits.
   */
  #ruc: string;

  /**
   * Country or region of the organization.
   */
  #region: string;

  /**
   * Name of the first administrator.
   */
  #ownerName: string;

  /**
   * Status of the organization (active or pending-verification).
   */
  #status: string;

  /**
   * Creates a new organization.
   * @param organization - Initial values of the organization.
   */
  constructor(organization: { id: number; legalName: string; ruc: string; region: string; ownerName: string; status: string }) {
    this.#id = organization.id;
    this.#legalName = organization.legalName;
    this.#ruc = organization.ruc;
    this.#region = organization.region;
    this.#ownerName = organization.ownerName;
    this.#status = organization.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get legalName(): string { return this.#legalName; }
  set legalName(value: string) { this.#legalName = value; }

  get ruc(): string { return this.#ruc; }
  set ruc(value: string) { this.#ruc = value; }

  get region(): string { return this.#region; }
  set region(value: string) { this.#region = value; }

  get ownerName(): string { return this.#ownerName; }
  set ownerName(value: string) { this.#ownerName = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
