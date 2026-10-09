import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a traceability gap.
 */
export interface TraceabilityGapResource extends BaseResource {
  /**
   * Unique identifier of the traceability gap.
   */
  id: number;
  /**
   * Batch with the gap.
   */
  batchCode: string;
  /**
   * Product of the batch.
   */
  product: string;
  /**
   * Mandatory record that is missing.
   */
  missingRecord: string;
  /**
   * Where the record is required.
   */
  detail: string;
}

/**
 * Response envelope for traceability gap collection queries.
 */
export interface TraceabilityGapsResponse extends BaseResponse {
  /**
   * Array of traceability gap resources included in the response.
   */
  traceabilityGaps: TraceabilityGapResource[];
}
