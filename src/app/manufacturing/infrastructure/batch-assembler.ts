import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Batch} from '../domain/model/batch.entity';
import {BatchResource, BatchesResponse} from './batch-response';

/**
 * Maps batch entities to and from API resources.
 */
export class BatchAssembler implements BaseAssembler<Batch, BatchResource, BatchesResponse> {
  /**
   * Converts a BatchesResponse to an array of Batch entities.
   * @param response - The API response containing batch resources.
   * @returns An array of Batch entities.
   */
  toEntitiesFromResponse = (response: BatchesResponse): Batch[] =>
    response.batches.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a BatchResource to a Batch entity.
   * @param resource - The resource to convert.
   * @returns The converted Batch entity.
   */
  toEntityFromResource = (resource: BatchResource): Batch =>
    new Batch({
      id: resource.id,
      code: resource.code,
      productCode: resource.productCode,
      orderCode: resource.orderCode,
      quantity: resource.quantity,
      line: resource.line,
      owner: resource.owner,
      status: resource.status,
      progress: resource.progress,
      incident: resource.incident,
      lastActivity: resource.lastActivity,
      lastActivityAt: resource.lastActivityAt
    });

  /**
   * Converts a Batch entity to a BatchResource.
   * @param entity - The entity to convert.
   * @returns The converted BatchResource.
   */
  toResourceFromEntity = (entity: Batch): BatchResource =>
    ({
      id: entity.id,
      code: entity.code,
      productCode: entity.productCode,
      orderCode: entity.orderCode,
      quantity: entity.quantity,
      line: entity.line,
      owner: entity.owner,
      status: entity.status,
      progress: entity.progress,
      incident: entity.incident,
      lastActivity: entity.lastActivity,
      lastActivityAt: entity.lastActivityAt
    } as BatchResource);
}
