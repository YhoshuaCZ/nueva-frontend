import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents the subscription of an organization to a plan, paid through Niubiz.
 */
export class Subscription implements BaseEntity {
  /**
   * Unique identifier of the subscription.
   */
  #id: number;

  /**
   * Identifier of the subscribed organization.
   */
  #organizationId: number;

  /**
   * Key of the subscribed plan.
   */
  #planKey: string;

  /**
   * Billing cycle (monthly or annual).
   */
  #billingCycle: string;

  /**
   * Status of the subscription (active or pending).
   */
  #status: string;

  /**
   * State of the last charge (approved or declined).
   */
  #paymentState: string;

  /**
   * Date of the next invoice (ISO 8601).
   */
  #nextInvoiceDate: string;

  /**
   * Whether the subscription renews automatically.
   */
  #autoRenew: boolean;

  /**
   * Brand of the card on file.
   */
  #cardBrand: string;

  /**
   * Last four digits of the card on file.
   */
  #cardLast4: string;

  /**
   * Expiry date of the card (MM/YYYY).
   */
  #cardExpiry: string;

  /**
   * Email that receives invoices and renewal reminders.
   */
  #billingEmail: string;

  /**
   * Creates a new subscription.
   * @param subscription - Initial values of the subscription.
   */
  constructor(subscription: { id: number; organizationId: number; planKey: string; billingCycle: string; status: string; paymentState: string; nextInvoiceDate: string; autoRenew: boolean; cardBrand: string; cardLast4: string; cardExpiry: string; billingEmail: string }) {
    this.#id = subscription.id;
    this.#organizationId = subscription.organizationId;
    this.#planKey = subscription.planKey;
    this.#billingCycle = subscription.billingCycle;
    this.#status = subscription.status;
    this.#paymentState = subscription.paymentState;
    this.#nextInvoiceDate = subscription.nextInvoiceDate;
    this.#autoRenew = subscription.autoRenew;
    this.#cardBrand = subscription.cardBrand;
    this.#cardLast4 = subscription.cardLast4;
    this.#cardExpiry = subscription.cardExpiry;
    this.#billingEmail = subscription.billingEmail;
  }

  get id(): number { return this.#id; }
  set id(value: number) { this.#id = value; }

  get organizationId(): number { return this.#organizationId; }
  set organizationId(value: number) { this.#organizationId = value; }

  get planKey(): string { return this.#planKey; }
  set planKey(value: string) { this.#planKey = value; }

  get billingCycle(): string { return this.#billingCycle; }
  set billingCycle(value: string) { this.#billingCycle = value; }

  get status(): string { return this.#status; }
  set status(value: string) { this.#status = value; }

  get paymentState(): string { return this.#paymentState; }
  set paymentState(value: string) { this.#paymentState = value; }

  get nextInvoiceDate(): string { return this.#nextInvoiceDate; }
  set nextInvoiceDate(value: string) { this.#nextInvoiceDate = value; }

  get autoRenew(): boolean { return this.#autoRenew; }
  set autoRenew(value: boolean) { this.#autoRenew = value; }

  get cardBrand(): string { return this.#cardBrand; }
  set cardBrand(value: string) { this.#cardBrand = value; }

  get cardLast4(): string { return this.#cardLast4; }
  set cardLast4(value: string) { this.#cardLast4 = value; }

  get cardExpiry(): string { return this.#cardExpiry; }
  set cardExpiry(value: string) { this.#cardExpiry = value; }

  get billingEmail(): string { return this.#billingEmail; }
  set billingEmail(value: string) { this.#billingEmail = value; }
}
