import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents an invoice of a subscription.
 */
export class Invoice implements BaseEntity {
  /**
   * Unique identifier of the invoice.
   */
  #id: number;

  /**
   * Identifier of the invoiced subscription.
   */
  #subscriptionId: number;

  /**
   * Invoice number.
   */
  #number: string;

  /**
   * Issue date (ISO 8601).
   */
  #issuedAt: string;

  /**
   * Amount in US dollars, before tax.
   */
  #amount: number;

  /**
   * Payment status of the invoice (approved or declined).
   */
  #status: string;

  /**
   * Creates a new invoice.
   * @param invoice - Initial values of the invoice.
   */
  constructor(invoice: { id: number; subscriptionId: number; number: string; issuedAt: string; amount: number; status: string }) {
    this.#id = invoice.id;
    this.#subscriptionId = invoice.subscriptionId;
    this.#number = invoice.number;
    this.#issuedAt = invoice.issuedAt;
    this.#amount = invoice.amount;
    this.#status = invoice.status;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get subscriptionId(): number { return this.#subscriptionId; }
  set subscriptionId(value: number) { this.#subscriptionId = value; }

  get number(): string { return this.#number; }
  set number(value: string) { this.#number = value; }

  get issuedAt(): string { return this.#issuedAt; }
  set issuedAt(value: string) { this.#issuedAt = value; }

  get amount(): number { return this.#amount; }
  set amount(value: number) { this.#amount = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }
}
