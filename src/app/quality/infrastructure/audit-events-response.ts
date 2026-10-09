import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a audit event.
 */
export interface AuditEventResource extends BaseResource {
  /**
   * Unique identifier of the audit event.
   */
  id: number;
  /**
   * Event identifier, such as EVT-89412.
   */
  eventCode: string;
  /**
   * When it happened (ISO 8601, UTC).
   */
  occurredAt: string;
  /**
   * Who or what performed it.
   */
  actor: string;
  /**
   * Role of the actor.
   */
  actorRole: string;
  /**
   * What happened.
   */
  event: string;
  /**
   * Affected record.
   */
  record: string;
  /**
   * Result of the event.
   */
  result: string;
  /**
   * Changed field, if any.
   */
  field: string;
  /**
   * Value before the change.
   */
  before: string;
  /**
   * Value after the change.
   */
  after: string;
  /**
   * Reason of the change.
   */
  reason: string;
}

/**
 * Response envelope for audit event collection queries.
 */
export interface AuditEventsResponse extends BaseResponse {
  /**
   * Array of audit event resources included in the response.
   */
  auditEvents: AuditEventResource[];
}
