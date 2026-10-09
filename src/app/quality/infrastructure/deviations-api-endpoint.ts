import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Deviation} from '../domain/model/deviation.entity';
import {DeviationResource, DeviationsResponse} from './deviations-response';
import {DeviationAssembler} from './deviation-assembler';

/**
 * Endpoint client for deviation CRUD operations.
 */
export class DeviationsApiEndpoint extends BaseApiEndpoint<Deviation, DeviationResource, DeviationsResponse, DeviationAssembler> {
  /**
   * Creates an instance of DeviationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDeviationsEndpointPath}`, new DeviationAssembler());
  }
}
