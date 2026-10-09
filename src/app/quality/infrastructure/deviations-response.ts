import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a deviation.
 */
export interface DeviationResource extends BaseResource {
  /**
   * Unique identifier of the deviation.
   */
  id: number;
  /**
   * Deviation code, such as DEV-26017.
   */
  code: string;
  /**
   * Short title.
   */
  title: string;
  /**
   * Affected batch.
   */
  batchCode: string;
  /**
   * Affected production order.
   */
  orderCode: string;
  /**
   * Deviation summary.
   */
  summary: string;
  /**
   * Classification (minor, major or critical).
   */
  classification: string;
  /**
   * Initial containment.
   */
  containment: string;
  /**
   * Severity score from 1 to 5.
   */
  severity: number;
  /**
   * Likelihood score from 1 to 5.
   */
  likelihood: number;
  /**
   * Detectability score from 1 to 5.
   */
  detectability: number;
  /**
   * Status (open, submitted, dispositioned or closed).
   */
  status: string;
  /**
   * Root-cause category.
   */
  rootCause: string;
  /**
   * Linked CAPA plan, if any.
   */
  capaCode: string;
  /**
   * Who reported it.
   */
  reportedBy: string;
  /**
   * When it was reported (ISO 8601).
   */
  reportedAt: string;
  /**
   * QA owner of the assessment.
   */
  owner: string;
  /**
   * Due date of the assessment (ISO 8601).
   */
  dueAt: string;
}

/**
 * Response envelope for deviation collection queries.
 */
export interface DeviationsResponse extends BaseResponse {
  /**
   * Array of deviation resources included in the response.
   */
  deviations: DeviationResource[];
}
