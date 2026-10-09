import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a evidence.
 */
export interface EvidenceResource extends BaseResource {
  /**
   * Unique identifier of the evidence.
   */
  id: number;
  /**
   * Code of the record the file supports.
   */
  recordCode: string;
  /**
   * File name.
   */
  fileName: string;
  /**
   * Who attached it and what it shows.
   */
  detail: string;
  /**
   * Status (attached, pending-review or reviewed).
   */
  status: string;
}

/**
 * Response envelope for evidence collection queries.
 */
export interface EvidenceResponse extends BaseResponse {
  /**
   * Array of evidence resources included in the response.
   */
  evidence: EvidenceResource[];
}
