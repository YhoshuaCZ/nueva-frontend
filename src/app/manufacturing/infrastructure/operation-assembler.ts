import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Operation} from '../domain/model/operation.entity';
import {OperationResource, OperationsResponse} from './operations-response';

/**
 * Maps operation entities to and from API resources.
 */
export class OperationAssembler implements BaseAssembler<Operation, OperationResource, OperationsResponse> {
  /**
   * Converts a OperationsResponse to an array of Operation entities.
   * @param response - The API response containing operation resources.
   * @returns An array of Operation entities.
   */
  toEntitiesFromResponse = (response: OperationsResponse): Operation[] =>
    response.operations.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a OperationResource to a Operation entity.
   * @param resource - The resource to convert.
   * @returns The converted Operation entity.
   */
  toEntityFromResource = (resource: OperationResource): Operation =>
    new Operation({
      id: resource.id,
      orderId: resource.orderId,
      sequence: resource.sequence,
      name: resource.name,
      equipment: resource.equipment,
      progress: resource.progress,
      status: resource.status,
      reference: resource.reference
    });

  /**
   * Converts a Operation entity to a OperationResource.
   * @param entity - The entity to convert.
   * @returns The converted OperationResource.
   */
  toResourceFromEntity = (entity: Operation): OperationResource =>
    ({
      id: entity.id,
      orderId: entity.orderId,
      sequence: entity.sequence,
      name: entity.name,
      equipment: entity.equipment,
      progress: entity.progress,
      status: entity.status,
      reference: entity.reference
    } as OperationResource);
}
