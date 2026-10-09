import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Reading} from '../domain/model/reading.entity';
import {ReadingResource, ReadingsResponse} from './readings-response';
import {ReadingAssembler} from './reading-assembler';

/**
 * Endpoint client for reading CRUD operations.
 */
export class ReadingsApiEndpoint extends BaseApiEndpoint<Reading, ReadingResource, ReadingsResponse, ReadingAssembler> {
  /**
   * Creates an instance of ReadingsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderReadingsEndpointPath}`, new ReadingAssembler());
  }
}
