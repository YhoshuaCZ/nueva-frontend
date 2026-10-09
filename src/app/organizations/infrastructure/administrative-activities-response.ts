import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a administrative activity.
 */
export interface AdministrativeActivityResource extends BaseResource {
  /**
   * Unique identifier of the administrative activity.
   */
  id: number;
  /**
   * Description of the event.
   */
  title: string;
  /**
   * Person or system that performed the event.
   */
  actor: string;
  /**
   * Date and time of the event (ISO 8601).
   */
  occurredAt: string;
}

/**
 * Response envelope for administrative activity collection queries.
 */
export interface AdministrativeActivitiesResponse extends BaseResponse {
  /**
   * Array of administrative activity resources included in the response.
   */
  administrativeActivities: AdministrativeActivityResource[];
}
