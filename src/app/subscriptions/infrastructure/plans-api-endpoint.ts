import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Plan} from '../domain/model/plan.entity';
import {PlanResource, PlansResponse} from './plans-response';
import {PlanAssembler} from './plan-assembler';

/**
 * Endpoint client for plan CRUD operations.
 */
export class PlansApiEndpoint extends BaseApiEndpoint<Plan, PlanResource, PlansResponse, PlanAssembler> {
  /**
   * Creates an instance of PlansApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderPlansEndpointPath}`, new PlanAssembler());
  }
}
