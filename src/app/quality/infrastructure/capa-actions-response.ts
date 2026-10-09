import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a CAPA action.
 */
export interface CapaActionResource extends BaseResource {
  /**
   * Unique identifier of the CAPA action.
   */
  id: number;
  /**
   * Code of the CAPA plan.
   */
  capaCode: string;
  /**
   * Action code, such as CA-01.
   */
  code: string;
  /**
   * What has to be done.
   */
  title: string;
  /**
   * Action owner.
   */
  owner: string;
  /**
   * Due date (ISO 8601).
   */
  dueAt: string;
  /**
   * Status (open, planned, in-review or complete).
   */
  status: string;
  /**
   * Evidence required to close the action.
   */
  evidence: string;
  /**
   * Whether the evidence was attached.
   */
  evidenceAttached: boolean;
}

/**
 * Response envelope for CAPA action collection queries.
 */
export interface CapaActionsResponse extends BaseResponse {
  /**
   * Array of CAPA action resources included in the response.
   */
  capaActions: CapaActionResource[];
}
