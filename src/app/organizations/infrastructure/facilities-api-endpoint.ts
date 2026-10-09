import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Facility} from '../domain/model/facility.entity';
import {FacilityResource, FacilitiesResponse} from './facilities-response';
import {FacilityAssembler} from './facility-assembler';

/**
 * Endpoint client for facility CRUD operations.
 */
export class FacilitiesApiEndpoint extends BaseApiEndpoint<Facility, FacilityResource, FacilitiesResponse, FacilityAssembler> {
  /**
   * Creates an instance of FacilitiesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderFacilitiesEndpointPath}`, new FacilityAssembler());
  }
}
