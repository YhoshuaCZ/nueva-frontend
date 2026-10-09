import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a audit.
 */
export interface AuditResource extends BaseResource {
  /**
   * Unique identifier of the audit.
   */
  id: number;
  /**
   * Audit code, such as AUD-26004.
   */
  code: string;
  /**
   * Audit title.
   */
  title: string;
  /**
   * Dates of the audit.
   */
  period: string;
  /**
   * Areas already reviewed.
   */
  areasReviewed: number;
  /**
   * Areas to review.
   */
  areasTotal: number;
  /**
   * Status (in-progress or closed).
   */
  status: string;
}

/**
 * Response envelope for audit collection queries.
 */
export interface AuditsResponse extends BaseResponse {
  /**
   * Array of audit resources included in the response.
   */
  audits: AuditResource[];
}
