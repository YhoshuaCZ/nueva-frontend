import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a plan.
 */
export interface PlanResource extends BaseResource {
  /**
   * Unique identifier of the plan.
   */
  id: number;
  /**
   * Plan key (standard-lab or enterprise).
   */
  key: string;
  /**
   * Display name of the plan.
   */
  name: string;
  /**
   * Price per month in US dollars.
   */
  monthlyPrice: number;
  /**
   * Price per year in US dollars (two months free).
   */
  annualPrice: number;
  /**
   * Maximum number of users; 0 means unlimited.
   */
  userLimit: number;
  /**
   * Maximum number of IoT devices; 0 means unlimited.
   */
  iotDeviceLimit: number;
}

/**
 * Response envelope for plan collection queries.
 */
export interface PlansResponse extends BaseResponse {
  /**
   * Array of plan resources included in the response.
   */
  plans: PlanResource[];
}
