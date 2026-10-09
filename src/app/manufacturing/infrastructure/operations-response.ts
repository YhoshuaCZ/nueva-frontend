import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a operation.
 */
export interface OperationResource extends BaseResource {
  /**
   * Unique identifier of the operation.
   */
  id: number;
  /**
   * Identifier of the production order.
   */
  orderId: number;
  /**
   * Position of the operation.
   */
  sequence: number;
  /**
   * Name of the operation.
   */
  name: string;
  /**
   * Equipment or station and its owner.
   */
  equipment: string;
  /**
   * Progress from 0 to 100.
   */
  progress: number;
  /**
   * Status (complete, in-progress, on-hold or not-started).
   */
  status: string;
  /**
   * Record that explains the status, such as a deviation.
   */
  reference: string;
}

/**
 * Response envelope for operation collection queries.
 */
export interface OperationsResponse extends BaseResponse {
  /**
   * Array of operation resources included in the response.
   */
  operations: OperationResource[];
}
