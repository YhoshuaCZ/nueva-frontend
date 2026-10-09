import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Operation} from '../domain/model/operation.entity';
import {OperationResource, OperationsResponse} from './operations-response';
import {OperationAssembler} from './operation-assembler';

/**
 * Endpoint client for operation CRUD operations.
 */
export class OperationsApiEndpoint extends BaseApiEndpoint<Operation, OperationResource, OperationsResponse, OperationAssembler> {
  /**
   * Creates an instance of OperationsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderOperationsEndpointPath}`, new OperationAssembler());
  }
}
