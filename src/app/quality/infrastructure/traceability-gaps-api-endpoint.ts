import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {TraceabilityGap} from '../domain/model/traceability-gap.entity';
import {TraceabilityGapResource, TraceabilityGapsResponse} from './traceability-gaps-response';
import {TraceabilityGapAssembler} from './traceability-gap-assembler';

/**
 * Endpoint client for traceability gap CRUD operations.
 */
export class TraceabilityGapsApiEndpoint extends BaseApiEndpoint<TraceabilityGap, TraceabilityGapResource, TraceabilityGapsResponse, TraceabilityGapAssembler> {
  /**
   * Creates an instance of TraceabilityGapsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderTraceabilityGapsEndpointPath}`, new TraceabilityGapAssembler());
  }
}
