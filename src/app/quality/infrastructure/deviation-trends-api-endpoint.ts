import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {DeviationTrend} from '../domain/model/deviation-trend.entity';
import {DeviationTrendResource, DeviationTrendsResponse} from './deviation-trends-response';
import {DeviationTrendAssembler} from './deviation-trend-assembler';

/**
 * Endpoint client for deviation trend CRUD operations.
 */
export class DeviationTrendsApiEndpoint extends BaseApiEndpoint<DeviationTrend, DeviationTrendResource, DeviationTrendsResponse, DeviationTrendAssembler> {
  /**
   * Creates an instance of DeviationTrendsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderDeviationTrendsEndpointPath}`, new DeviationTrendAssembler());
  }
}
