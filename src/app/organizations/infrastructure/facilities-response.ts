import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a facility.
 */
export interface FacilityResource extends BaseResource {
  /**
   * Unique identifier of the facility.
   */
  id: number;
  /**
   * Identifier of the organization the facility belongs to.
   */
  organizationId: number;
  /**
   * Name of the facility.
   */
  name: string;
  /**
   * Type of facility (manufacturing or qc-laboratory).
   */
  type: string;
  /**
   * Time zone of the facility.
   */
  timezone: string;
  /**
   * Person responsible for the facility.
   */
  ownerName: string;
  /**
   * Status of the facility (active or inactive).
   */
  status: string;
}

/**
 * Response envelope for facility collection queries.
 */
export interface FacilitiesResponse extends BaseResponse {
  /**
   * Array of facility resources included in the response.
   */
  facilities: FacilityResource[];
}
