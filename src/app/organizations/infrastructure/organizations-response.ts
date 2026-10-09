import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a organization.
 */
export interface OrganizationResource extends BaseResource {
  /**
   * Unique identifier of the organization.
   */
  id: number;
  /**
   * Legal name (razón social) of the laboratory.
   */
  legalName: string;
  /**
   * Peruvian taxpayer number (RUC), 11 digits.
   */
  ruc: string;
  /**
   * Country or region of the organization.
   */
  region: string;
  /**
   * Name of the first administrator.
   */
  ownerName: string;
  /**
   * Status of the organization (active or pending-verification).
   */
  status: string;
}

/**
 * Response envelope for organization collection queries.
 */
export interface OrganizationsResponse extends BaseResponse {
  /**
   * Array of organization resources included in the response.
   */
  organizations: OrganizationResource[];
}
