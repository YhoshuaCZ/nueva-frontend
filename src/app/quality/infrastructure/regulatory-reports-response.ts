import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a regulatory report.
 */
export interface RegulatoryReportResource extends BaseResource {
  /**
   * Unique identifier of the regulatory report.
   */
  id: number;
  /**
   * Report code, such as RPT-26012.
   */
  code: string;
  /**
   * Report type.
   */
  type: string;
  /**
   * Period or record scope.
   */
  scope: string;
  /**
   * Report owner.
   */
  owner: string;
  /**
   * Status (draft, blocked or approved).
   */
  status: string;
  /**
   * Template used.
   */
  template: string;
  /**
   * Output format.
   */
  format: string;
  /**
   * Creation date (ISO 8601).
   */
  createdAt: string;
}

/**
 * Response envelope for regulatory report collection queries.
 */
export interface RegulatoryReportsResponse extends BaseResponse {
  /**
   * Array of regulatory report resources included in the response.
   */
  regulatoryReports: RegulatoryReportResource[];
}
