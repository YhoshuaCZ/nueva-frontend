import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Batch} from '../domain/model/batch.entity';
import {BatchResource, BatchesResponse} from './batch-response';
import {BatchAssembler} from './batch-assembler';

/**
 * Endpoint client for batch CRUD operations.
 */
export class BatchesApiEndpoint extends BaseApiEndpoint<Batch, BatchResource, BatchesResponse, BatchAssembler> {
  /**
   * Creates an instance of BatchesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderBatchesEndpointPath}`, new BatchAssembler());
  }
}
