import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a user profile.
 */
export interface UserProfileResource extends BaseResource {
  /**
   * Unique identifier of the user profile.
   */
  id: number;
  /**
   * Identifier of the IAM user the profile belongs to.
   */
  userId: number;
  /**
   * First name.
   */
  firstName: string;
  /**
   * Last name.
   */
  lastName: string;
  /**
   * Work email, managed by IAM.
   */
  email: string;
  /**
   * Area where the user works.
   */
  area: string;
  /**
   * Site where the user works.
   */
  site: string;
  /**
   * Whether critical events are sent by email.
   */
  emailNotifications: boolean;
  /**
   * Whether tasks and alerts appear in the notification bell.
   */
  inAppNotifications: boolean;
  /**
   * Preferred language (en or es).
   */
  language: string;
}

/**
 * Response envelope for user profile collection queries.
 */
export interface UserProfilesResponse extends BaseResponse {
  /**
   * Array of user profile resources included in the response.
   */
  userProfiles: UserProfileResource[];
}
