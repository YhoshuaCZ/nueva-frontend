import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Audit} from '../domain/model/audit.entity';
import {AuditResource, AuditsResponse} from './audits-response';
import {AuditAssembler} from './audit-assembler';

/**
 * Endpoint client for audit CRUD operations.
 */
export class AuditsApiEndpoint extends BaseApiEndpoint<Audit, AuditResource, AuditsResponse, AuditAssembler> {
  /**
   * Creates an instance of AuditsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAuditsEndpointPath}`, new AuditAssembler());
  }
}
