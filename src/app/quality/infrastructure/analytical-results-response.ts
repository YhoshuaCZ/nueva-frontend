import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a analytical result.
 */
export interface AnalyticalResultResource extends BaseResource {
  /**
   * Unique identifier of the analytical result.
   */
  id: number;
  /**
   * Tested batch.
   */
  batchCode: string;
  /**
   * Sample code.
   */
  sampleCode: string;
  /**
   * Analytical report, such as AR-26041.
   */
  reportCode: string;
  /**
   * Test name.
   */
  test: string;
  /**
   * Analytical protocol and version.
   */
  protocol: string;
  /**
   * Calculated result with its unit.
   */
  result: string;
  /**
   * Specification.
   */
  specification: string;
  /**
   * Analyst who submitted the result.
   */
  analyst: string;
  /**
   * Status (within, oos or pending).
   */
  status: string;
  /**
   * Approval of the report (requested or approved).
   */
  approval: string;
}

/**
 * Response envelope for analytical result collection queries.
 */
export interface AnalyticalResultsResponse extends BaseResponse {
  /**
   * Array of analytical result resources included in the response.
   */
  analyticalResults: AnalyticalResultResource[];
}
