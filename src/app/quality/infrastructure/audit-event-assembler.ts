import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AuditEvent} from '../domain/model/audit-event.entity';
import {AuditEventResource, AuditEventsResponse} from './audit-events-response';

/**
 * Maps audit event entities to and from API resources.
 */
export class AuditEventAssembler implements BaseAssembler<AuditEvent, AuditEventResource, AuditEventsResponse> {
  /**
   * Converts a AuditEventsResponse to an array of AuditEvent entities.
   * @param response - The API response containing audit event resources.
   * @returns An array of AuditEvent entities.
   */
  toEntitiesFromResponse = (response: AuditEventsResponse): AuditEvent[] =>
    response.auditEvents.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AuditEventResource to a AuditEvent entity.
   * @param resource - The resource to convert.
   * @returns The converted AuditEvent entity.
   */
  toEntityFromResource = (resource: AuditEventResource): AuditEvent =>
    new AuditEvent({
      id: resource.id,
      eventCode: resource.eventCode,
      occurredAt: resource.occurredAt,
      actor: resource.actor,
      actorRole: resource.actorRole,
      event: resource.event,
      record: resource.record,
      result: resource.result,
      field: resource.field,
      before: resource.before,
      after: resource.after,
      reason: resource.reason
    });

  /**
   * Converts a AuditEvent entity to a AuditEventResource.
   * @param entity - The entity to convert.
   * @returns The converted AuditEventResource.
   */
  toResourceFromEntity = (entity: AuditEvent): AuditEventResource =>
    ({
      id: entity.id,
      eventCode: entity.eventCode,
      occurredAt: entity.occurredAt,
      actor: entity.actor,
      actorRole: entity.actorRole,
      event: entity.event,
      record: entity.record,
      result: entity.result,
      field: entity.field,
      before: entity.before,
      after: entity.after,
      reason: entity.reason
    } as AuditEventResource);
}
