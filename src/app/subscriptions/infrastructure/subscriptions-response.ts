import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a subscription.
 */
export interface SubscriptionResource extends BaseResource {
  /**
   * Unique identifier of the subscription.
   */
  id: number;
  /**
   * Identifier of the subscribed organization.
   */
  organizationId: number;
  /**
   * Key of the subscribed plan.
   */
  planKey: string;
  /**
   * Billing cycle (monthly or annual).
   */
  billingCycle: string;
  /**
   * Status of the subscription (active or pending).
   */
  status: string;
  /**
   * State of the last charge (approved or declined).
   */
  paymentState: string;
  /**
   * Date of the next invoice (ISO 8601).
   */
  nextInvoiceDate: string;
  /**
   * Whether the subscription renews automatically.
   */
  autoRenew: boolean;
  /**
   * Brand of the card on file.
   */
  cardBrand: string;
  /**
   * Last four digits of the card on file.
   */
  cardLast4: string;
  /**
   * Expiry date of the card (MM/YYYY).
   */
  cardExpiry: string;
  /**
   * Email that receives invoices and renewal reminders.
   */
  billingEmail: string;
}

/**
 * Response envelope for subscription collection queries.
 */
export interface SubscriptionsResponse extends BaseResponse {
  /**
   * Array of subscription resources included in the response.
   */
  subscriptions: SubscriptionResource[];
}
