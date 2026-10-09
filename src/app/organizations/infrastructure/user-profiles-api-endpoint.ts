import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {UserProfile} from '../domain/model/user-profile.entity';
import {UserProfileResource, UserProfilesResponse} from './user-profiles-response';
import {UserProfileAssembler} from './user-profile-assembler';

/**
 * Endpoint client for user profile CRUD operations.
 */
export class UserProfilesApiEndpoint extends BaseApiEndpoint<UserProfile, UserProfileResource, UserProfilesResponse, UserProfileAssembler> {
  /**
   * Creates an instance of UserProfilesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderUserProfilesEndpointPath}`, new UserProfileAssembler());
  }
}
