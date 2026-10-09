import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Evidence} from '../domain/model/evidence.entity';
import {EvidenceResource, EvidenceResponse} from './evidence-response';
import {EvidenceAssembler} from './evidence-assembler';

/**
 * Endpoint client for evidence CRUD operations.
 */
export class EvidenceApiEndpoint extends BaseApiEndpoint<Evidence, EvidenceResource, EvidenceResponse, EvidenceAssembler> {
  /**
   * Creates an instance of EvidenceApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderEvidenceEndpointPath}`, new EvidenceAssembler());
  }
}
