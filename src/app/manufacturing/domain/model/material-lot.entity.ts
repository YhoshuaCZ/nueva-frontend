import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a received lot of raw material and its quarantine inspection.
 */
export class MaterialLot implements BaseEntity {
  /**
   * Unique identifier of the material lot.
   */
  #id: number;

  /**
   * Internal lot code, such as RM-26104.
   */
  #code: string;

  /**
   * Receipt code, such as RCV-26104.
   */
  #receiptCode: string;

  /**
   * Material name.
   */
  #material: string;

  /**
   * Category (api, excipient or packaging).
   */
  #category: string;

  /**
   * Supplier name.
   */
  #supplier: string;

  /**
   * Lot code of the supplier.
   */
  #supplierLot: string;

  /**
   * Quantity received and packaging.
   */
  #quantity: string;

  /**
   * Expiry date (ISO 8601).
   */
  #expiryDate: string;

  /**
   * Storage location.
   */
  #storageLocation: string;

  /**
   * File name of the certificate of analysis.
   */
  #certificate: string;

  /**
   * Disposition (quarantine, sampling, inspection, approved or rejected).
   */
  #status: string;

  /**
   * Whether the packaging was verified.
   */
  #packagingVerified: boolean;

  /**
   * Whether identity and labeling were verified.
   */
  #identityVerified: boolean;

  /**
   * QC sampling status (pending, requested or done).
   */
  #samplingStatus: string;

  /**
   * Batch the lot is allocated to, if any.
   */
  #allocatedBatch: string;

  /**
   * Creates a new material lot.
   * @param materialLot - Initial values of the material lot.
   */
  constructor(materialLot: { id: number; code: string; receiptCode: string; material: string; category: string; supplier: string; supplierLot: string; quantity: string; expiryDate: string; storageLocation: string; certificate: string; status: string; packagingVerified: boolean; identityVerified: boolean; samplingStatus: string; allocatedBatch: string }) {
    this.#id = materialLot.id;
    this.#code = materialLot.code;
    this.#receiptCode = materialLot.receiptCode;
    this.#material = materialLot.material;
    this.#category = materialLot.category;
    this.#supplier = materialLot.supplier;
    this.#supplierLot = materialLot.supplierLot;
    this.#quantity = materialLot.quantity;
    this.#expiryDate = materialLot.expiryDate;
    this.#storageLocation = materialLot.storageLocation;
    this.#certificate = materialLot.certificate;
    this.#status = materialLot.status;
    this.#packagingVerified = materialLot.packagingVerified;
    this.#identityVerified = materialLot.identityVerified;
    this.#samplingStatus = materialLot.samplingStatus;
    this.#allocatedBatch = materialLot.allocatedBatch;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get receiptCode(): string { return this.#receiptCode; }
  set receiptCode(value: string) { this.#receiptCode = value; }

  get material(): string { return this.#material; }
  set material(value: string) { this.#material = value; }

  get category(): string { return this.#category; }
  set category(value: string) { this.#category = value; }

  get supplier(): string { return this.#supplier; }
  set supplier(value: string) { this.#supplier = value; }

  get supplierLot(): string { return this.#supplierLot; }
  set supplierLot(value: string) { this.#supplierLot = value; }

  get quantity(): string { return this.#quantity; }
  set quantity(value: string) { this.#quantity = value; }

  get expiryDate(): string { return this.#expiryDate; }
  set expiryDate(value: string) { this.#expiryDate = value; }

  get storageLocation(): string { return this.#storageLocation; }
  set storageLocation(value: string) { this.#storageLocation = value; }

  get certificate(): string { return this.#certificate; }
  set certificate(value: string) { this.#certificate = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get packagingVerified(): boolean { return this.#packagingVerified; }
  set packagingVerified(value: boolean) { this.#packagingVerified = value; }

  get identityVerified(): boolean { return this.#identityVerified; }
  set identityVerified(value: boolean) { this.#identityVerified = value; }

  get samplingStatus(): string { return this.#samplingStatus; }
  set samplingStatus(value: string) { this.#samplingStatus = value; }

  get allocatedBatch(): string { return this.#allocatedBatch; }
  set allocatedBatch(value: string) { this.#allocatedBatch = value; }
}
