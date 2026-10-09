import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {AuditEvent} from '../domain/model/audit-event.entity';
import {AuditEventResource, AuditEventsResponse} from './audit-events-response';
import {AuditEventAssembler} from './audit-event-assembler';

/**
 * Endpoint client for audit event CRUD operations.
 */
export class AuditEventsApiEndpoint extends BaseApiEndpoint<AuditEvent, AuditEventResource, AuditEventsResponse, AuditEventAssembler> {
  /**
   * Creates an instance of AuditEventsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderAuditEventsEndpointPath}`, new AuditEventAssembler());
  }
}
