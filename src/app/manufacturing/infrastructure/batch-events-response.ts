import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a batch event.
 */
export interface BatchEventResource extends BaseResource {
  /**
   * Unique identifier of the batch event.
   */
  id: number;
  /**
   * Code of the batch.
   */
  batchCode: string;
  /**
   * What happened.
   */
  title: string;
  /**
   * Who or what was involved.
   */
  detail: string;
  /**
   * When it happened (ISO 8601).
   */
  occurredAt: string;
  /**
   * Color of the entry (normal, warning or danger).
   */
  tone: string;
}

/**
 * Response envelope for batch event collection queries.
 */
export interface BatchEventsResponse extends BaseResponse {
  /**
   * Array of batch event resources included in the response.
   */
  batchEvents: BatchEventResource[];
}
