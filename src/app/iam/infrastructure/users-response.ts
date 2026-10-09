import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a user.
 */
export interface UserResource extends BaseResource {
  /**
   * Unique identifier of the user.
   */
  id: number;
  /**
   * Full name of the user.
   */
  fullName: string;
  /**
   * Initials shown in the avatar.
   */
  initials: string;
  /**
   * Work email used to sign in.
   */
  email: string;
  /**
   * Role key assigned by the laboratory administrator.
   */
  role: string;
  /**
   * Environment the role grants access to (qa, production or administration).
   */
  environment: string;
  /**
   * Facilities the user can access.
   */
  facility: string;
  /**
   * Account status (active or invited).
   */
  status: string;
  /**
   * Identifier of the organization the user belongs to.
   */
  organizationId: number;
  /**
   * Name of the laboratory organization.
   */
  organizationName: string;
  /**
   * Plant where the user works.
   */
  plant: string;
  /**
   * Special privilege shown in the workspace, if any.
   */
  privilege: string;
}

/**
 * Response envelope for user collection queries.
 */
export interface UsersResponse extends BaseResponse {
  /**
   * Array of user resources included in the response.
   */
  users: UserResource[];
}
