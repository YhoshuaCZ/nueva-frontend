import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {User} from '../domain/model/user.entity';
import {UserResource, UsersResponse} from './users-response';
import {UserAssembler} from './user-assembler';

/**
 * Endpoint client for user CRUD operations.
 */
export class UsersApiEndpoint extends BaseApiEndpoint<User, UserResource, UsersResponse, UserAssembler> {
  /**
   * Creates an instance of UsersApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderUsersEndpointPath}`, new UserAssembler());
  }
}
