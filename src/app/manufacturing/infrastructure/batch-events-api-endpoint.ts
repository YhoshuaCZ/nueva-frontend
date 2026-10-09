import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {BatchEvent} from '../domain/model/batch-event.entity';
import {BatchEventResource, BatchEventsResponse} from './batch-events-response';
import {BatchEventAssembler} from './batch-event-assembler';

/**
 * Endpoint client for batch event CRUD operations.
 */
export class BatchEventsApiEndpoint extends BaseApiEndpoint<BatchEvent, BatchEventResource, BatchEventsResponse, BatchEventAssembler> {
  /**
   * Creates an instance of BatchEventsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBatchEventsEndpointPath}`, new BatchEventAssembler());
  }
}
