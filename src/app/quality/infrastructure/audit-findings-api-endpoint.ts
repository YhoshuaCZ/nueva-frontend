import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {AuditFinding} from '../domain/model/audit-finding.entity';
import {AuditFindingResource, AuditFindingsResponse} from './audit-findings-response';
import {AuditFindingAssembler} from './audit-finding-assembler';

/**
 * Endpoint client for audit finding CRUD operations.
 */
export class AuditFindingsApiEndpoint extends BaseApiEndpoint<AuditFinding, AuditFindingResource, AuditFindingsResponse, AuditFindingAssembler> {
  /**
   * Creates an instance of AuditFindingsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAuditFindingsEndpointPath}`, new AuditFindingAssembler());
  }
}
