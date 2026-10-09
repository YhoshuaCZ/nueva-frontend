import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {CapaPlan} from '../domain/model/capa-plan.entity';
import {CapaPlanResource, CapaPlansResponse} from './capa-plans-response';
import {CapaPlanAssembler} from './capa-plan-assembler';

/**
 * Endpoint client for CAPA plan CRUD operations.
 */
export class CapaPlansApiEndpoint extends BaseApiEndpoint<CapaPlan, CapaPlanResource, CapaPlansResponse, CapaPlanAssembler> {
  /**
   * Creates an instance of CapaPlansApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderCapaPlansEndpointPath}`, new CapaPlanAssembler());
  }
}
