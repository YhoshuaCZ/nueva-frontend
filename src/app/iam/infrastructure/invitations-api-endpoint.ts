import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Invitation} from '../domain/model/invitation.entity';
import {InvitationResource, InvitationsResponse} from './invitations-response';
import {InvitationAssembler} from './invitation-assembler';

/**
 * Endpoint client for invitation CRUD operations.
 */
export class InvitationsApiEndpoint extends BaseApiEndpoint<Invitation, InvitationResource, InvitationsResponse, InvitationAssembler> {
  /**
   * Creates an instance of InvitationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderInvitationsEndpointPath}`, new InvitationAssembler());
  }
}
