import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a invoice.
 */
export interface InvoiceResource extends BaseResource {
  /**
   * Unique identifier of the invoice.
   */
  id: number;
  /**
   * Identifier of the invoiced subscription.
   */
  subscriptionId: number;
  /**
   * Invoice number.
   */
  number: string;
  /**
   * Issue date (ISO 8601).
   */
  issuedAt: string;
  /**
   * Amount in US dollars, before tax.
   */
  amount: number;
  /**
   * Payment status of the invoice (approved or declined).
   */
  status: string;
}

/**
 * Response envelope for invoice collection queries.
 */
export interface InvoicesResponse extends BaseResponse {
  /**
   * Array of invoice resources included in the response.
   */
  invoices: InvoiceResource[];
}
