import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {RoleProfile} from '../domain/model/role-profile.entity';
import {RoleProfileResource, RoleProfilesResponse} from './role-profiles-response';
import {RoleProfileAssembler} from './role-profile-assembler';

/**
 * Endpoint client for role profile CRUD operations.
 */
export class RoleProfilesApiEndpoint extends BaseApiEndpoint<RoleProfile, RoleProfileResource, RoleProfilesResponse, RoleProfileAssembler> {
  /**
   * Creates an instance of RoleProfilesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderRoleProfilesEndpointPath}`, new RoleProfileAssembler());
  }
}
