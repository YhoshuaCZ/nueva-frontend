import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a batch.
 */
export interface BatchResource extends BaseResource {
  /**
   * Unique identifier of the batch.
   */
  id: number;
  /**
   * Unique batch code, such as B-26041.
   */
  code: string;
  /**
   * Code of the product.
   */
  productCode: string;
  /**
   * Code of the production order.
   */
  orderCode: string;
  /**
   * Quantity in units.
   */
  quantity: number;
  /**
   * Manufacturing line.
   */
  line: string;
  /**
   * Person responsible for the batch.
   */
  owner: string;
  /**
   * Status (planned, in-progress, on-hold, release-requested or released).
   */
  status: string;
  /**
   * Progress from 0 to 100.
   */
  progress: number;
  /**
   * Open incident that affects the batch, if any.
   */
  incident: string;
  /**
   * Last activity on the batch.
   */
  lastActivity: string;
  /**
   * Date of the last activity (ISO 8601).
   */
  lastActivityAt: string;
}

/**
 * Response envelope for batch collection queries.
 */
export interface BatchesResponse extends BaseResponse {
  /**
   * Array of batch resources included in the response.
   */
  batches: BatchResource[];
}
