import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a CAPA plan.
 */
export interface CapaPlanResource extends BaseResource {
  /**
   * Unique identifier of the CAPA plan.
   */
  id: number;
  /**
   * CAPA code, such as CAPA-26009.
   */
  code: string;
  /**
   * Problem addressed.
   */
  title: string;
  /**
   * Deviation that originated the plan.
   */
  sourceDeviation: string;
  /**
   * Plan owner.
   */
  owner: string;
  /**
   * Independent reviewer.
   */
  reviewer: string;
  /**
   * Root cause found.
   */
  rootCause: string;
  /**
   * Effectiveness acceptance criterion.
   */
  acceptanceCriterion: string;
  /**
   * Date of the effectiveness check (ISO 8601).
   */
  effectivenessCheckAt: string;
  /**
   * Status (draft, in-progress, in-approval or closed).
   */
  status: string;
}

/**
 * Response envelope for CAPA plan collection queries.
 */
export interface CapaPlansResponse extends BaseResponse {
  /**
   * Array of CAPA plan resources included in the response.
   */
  capaPlans: CapaPlanResource[];
}
