import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {CapaAction} from '../domain/model/capa-action.entity';
import {CapaActionResource, CapaActionsResponse} from './capa-actions-response';
import {CapaActionAssembler} from './capa-action-assembler';

/**
 * Endpoint client for CAPA action CRUD operations.
 */
export class CapaActionsApiEndpoint extends BaseApiEndpoint<CapaAction, CapaActionResource, CapaActionsResponse, CapaActionAssembler> {
  /**
   * Creates an instance of CapaActionsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderCapaActionsEndpointPath}`, new CapaActionAssembler());
  }
}
