import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a deviation trend.
 */
export interface DeviationTrendResource extends BaseResource {
  /**
   * Unique identifier of the deviation trend.
   */
  id: number;
  /**
   * Root-cause category.
   */
  rootCause: string;
  /**
   * Month (YYYY-MM).
   */
  month: string;
  /**
   * Closed deviations.
   */
  count: number;
}

/**
 * Response envelope for deviation trend collection queries.
 */
export interface DeviationTrendsResponse extends BaseResponse {
  /**
   * Array of deviation trend resources included in the response.
   */
  deviationTrends: DeviationTrendResource[];
}
