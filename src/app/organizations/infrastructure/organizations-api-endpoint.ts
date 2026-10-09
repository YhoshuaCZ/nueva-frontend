import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Organization} from '../domain/model/organization.entity';
import {OrganizationResource, OrganizationsResponse} from './organizations-response';
import {OrganizationAssembler} from './organization-assembler';

/**
 * Endpoint client for organization CRUD operations.
 */
export class OrganizationsApiEndpoint extends BaseApiEndpoint<Organization, OrganizationResource, OrganizationsResponse, OrganizationAssembler> {
  /**
   * Creates an instance of OrganizationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderOrganizationsEndpointPath}`, new OrganizationAssembler());
  }
}
