import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {AdministrativeActivity} from '../domain/model/administrative-activity.entity';
import {AdministrativeActivityResource, AdministrativeActivitiesResponse} from './administrative-activities-response';
import {AdministrativeActivityAssembler} from './administrative-activity-assembler';

/**
 * Endpoint client for administrative activity CRUD operations.
 */
export class AdministrativeActivitiesApiEndpoint extends BaseApiEndpoint<AdministrativeActivity, AdministrativeActivityResource, AdministrativeActivitiesResponse, AdministrativeActivityAssembler> {
  /**
   * Creates an instance of AdministrativeActivitiesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAdministrativeActivitiesEndpointPath}`, new AdministrativeActivityAssembler());
  }
}
