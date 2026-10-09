import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Alert} from '../domain/model/alert.entity';
import {AlertResource, AlertsResponse} from './alerts-response';
import {AlertAssembler} from './alert-assembler';

/**
 * Endpoint client for alert CRUD operations.
 */
export class AlertsApiEndpoint extends BaseApiEndpoint<Alert, AlertResource, AlertsResponse, AlertAssembler> {
  /**
   * Creates an instance of AlertsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAlertsEndpointPath}`, new AlertAssembler());
  }
}
