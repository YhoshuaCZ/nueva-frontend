import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {BatchEvent} from '../domain/model/batch-event.entity';
import {BatchEventResource, BatchEventsResponse} from './batch-events-response';

/**
 * Maps batch event entities to and from API resources.
 */
export class BatchEventAssembler implements BaseAssembler<BatchEvent, BatchEventResource, BatchEventsResponse> {
  /**
   * Converts a BatchEventsResponse to an array of BatchEvent entities.
   * @param response - The API response containing batch event resources.
   * @returns An array of BatchEvent entities.
   */
  toEntitiesFromResponse = (response: BatchEventsResponse): BatchEvent[] =>
    response.batchEvents.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BatchEventResource to a BatchEvent entity.
   * @param resource - The resource to convert.
   * @returns The converted BatchEvent entity.
   */
  toEntityFromResource = (resource: BatchEventResource): BatchEvent =>
    new BatchEvent({
      id: resource.id,
      batchCode: resource.batchCode,
      title: resource.title,
      detail: resource.detail,
      occurredAt: resource.occurredAt,
      tone: resource.tone
    });

  /**
   * Converts a BatchEvent entity to a BatchEventResource.
   * @param entity - The entity to convert.
   * @returns The converted BatchEventResource.
   */
  toResourceFromEntity = (entity: BatchEvent): BatchEventResource =>
    ({
      id: entity.id,
      batchCode: entity.batchCode,
      title: entity.title,
      detail: entity.detail,
      occurredAt: entity.occurredAt,
      tone: entity.tone
    } as BatchEventResource);
}
