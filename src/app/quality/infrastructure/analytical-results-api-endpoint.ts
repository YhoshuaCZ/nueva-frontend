import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {AnalyticalResult} from '../domain/model/analytical-result.entity';
import {AnalyticalResultResource, AnalyticalResultsResponse} from './analytical-results-response';
import {AnalyticalResultAssembler} from './analytical-result-assembler';

/**
 * Endpoint client for analytical result CRUD operations.
 */
export class AnalyticalResultsApiEndpoint extends BaseApiEndpoint<AnalyticalResult, AnalyticalResultResource, AnalyticalResultsResponse, AnalyticalResultAssembler> {
  /**
   * Creates an instance of AnalyticalResultsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAnalyticalResultsEndpointPath}`, new AnalyticalResultAssembler());
  }
}
