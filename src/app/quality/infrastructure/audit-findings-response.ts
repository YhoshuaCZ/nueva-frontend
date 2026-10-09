import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a audit finding.
 */
export interface AuditFindingResource extends BaseResource {
  /**
   * Unique identifier of the audit finding.
   */
  id: number;
  /**
   * Code of the audit.
   */
  auditCode: string;
  /**
   * Finding code, such as F-01.
   */
  code: string;
  /**
   * Finding title.
   */
  title: string;
  /**
   * Classification (major or minor).
   */
  classification: string;
  /**
   * Owner of the response.
   */
  owner: string;
  /**
   * Due date (ISO 8601).
   */
  dueAt: string;
  /**
   * Status (evidence-pending, in-review or closed).
   */
  status: string;
  /**
   * What the auditor observed.
   */
  observation: string;
  /**
   * Evidence and corrective response.
   */
  response: string;
  /**
   * What is needed to close the finding.
   */
  closureRequirement: string;
}

/**
 * Response envelope for audit finding collection queries.
 */
export interface AuditFindingsResponse extends BaseResponse {
  /**
   * Array of audit finding resources included in the response.
   */
  auditFindings: AuditFindingResource[];
}
