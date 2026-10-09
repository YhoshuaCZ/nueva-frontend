import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a pharmaceutical product of the catalog.
 */
export class Product implements BaseEntity {
  /**
   * Unique identifier of the product.
   */
  #id: number;

  /**
   * Unique product code, such as AC500.
   */
  #code: string;

  /**
   * Product name and strength.
   */
  #name: string;

  /**
   * Dosage form (tablet, capsule...).
   */
  #dosageForm: string;

  /**
   * Version of the current master formula, or empty.
   */
  #formulaVersion: string;

  /**
   * Status of the current master formula (approved, pending or none).
   */
  #formulaStatus: string;

  /**
   * Creates a new product.
   * @param product - Initial values of the product.
   */
  constructor(product: { id: number; code: string; name: string; dosageForm: string; formulaVersion: string; formulaStatus: string }) {
    this.#id = product.id;
    this.#code = product.code;
    this.#name = product.name;
    this.#dosageForm = product.dosageForm;
    this.#formulaVersion = product.formulaVersion;
    this.#formulaStatus = product.formulaStatus;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get code(): string { return this.#code; }
  set code(value: string) { this.#code = value; }

  get name(): string { return this.#name; }
  set name(value: string) { this.#name = value; }

  get dosageForm(): string { return this.#dosageForm; }
  set dosageForm(value: string) { this.#dosageForm = value; }

  get formulaVersion(): string { return this.#formulaVersion; }
  set formulaVersion(value: string) { this.#formulaVersion = value; }

  get formulaStatus(): string { return this.#formulaStatus; }
  set formulaStatus(value: string) { this.#formulaStatus = value; }
}
