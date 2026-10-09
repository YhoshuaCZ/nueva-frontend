import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a invitation.
 */
export interface InvitationResource extends BaseResource {
  /**
   * Unique identifier of the invitation.
   */
  id: number;
  /**
   * Full name of the invited person.
   */
  fullName: string;
  /**
   * Work email that receives the invitation.
   */
  email: string;
  /**
   * Role key the invited user will receive.
   */
  role: string;
  /**
   * Facility the invited user will access.
   */
  facility: string;
  /**
   * Optional note included in the invitation.
   */
  note: string;
  /**
   * Invitation status (pending, accepted or expired).
   */
  status: string;
  /**
   * Date the invitation was sent (ISO 8601).
   */
  sentAt: string;
}

/**
 * Response envelope for invitation collection queries.
 */
export interface InvitationsResponse extends BaseResponse {
  /**
   * Array of invitation resources included in the response.
   */
  invitations: InvitationResource[];
}
