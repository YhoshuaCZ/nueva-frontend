import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a role profile.
 */
export interface RoleProfileResource extends BaseResource {
  /**
   * Unique identifier of the role profile.
   */
  id: number;
  /**
   * Role key referenced by users.
   */
  key: string;
  /**
   * Display name of the profile.
   */
  name: string;
  /**
   * Records the profile can create or edit.
   */
  createEdit: string[];
  /**
   * What the profile can approve or sign.
   */
  approveSign: string;
  /**
   * Main restriction of the profile.
   */
  restriction: string;
  /**
   * Color tone of the profile chip.
   */
  tone: string;
}

/**
 * Response envelope for role profile collection queries.
 */
export interface RoleProfilesResponse extends BaseResponse {
  /**
   * Array of role profile resources included in the response.
   */
  roleProfiles: RoleProfileResource[];
}
