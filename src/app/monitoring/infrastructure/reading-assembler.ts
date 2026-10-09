import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Reading} from '../domain/model/reading.entity';
import {ReadingResource, ReadingsResponse} from './readings-response';

/**
 * Maps reading entities to and from API resources.
 */
export class ReadingAssembler implements BaseAssembler<Reading, ReadingResource, ReadingsResponse> {
  /**
   * Converts a ReadingsResponse to an array of Reading entities.
   * @param response - The API response containing reading resources.
   * @returns An array of Reading entities.
   */
  toEntitiesFromResponse = (response: ReadingsResponse): Reading[] =>
    response.readings.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a ReadingResource to a Reading entity.
   * @param resource - The resource to convert.
   * @returns The converted Reading entity.
   */
  toEntityFromResource = (resource: ReadingResource): Reading =>
    new Reading({
      id: resource.id,
      sensorCode: resource.sensorCode,
      batchCode: resource.batchCode,
      value: resource.value,
      recordedAt: resource.recordedAt,
      source: resource.source
    });

  /**
   * Converts a Reading entity to a ReadingResource.
   * @param entity - The entity to convert.
   * @returns The converted ReadingResource.
   */
  toResourceFromEntity = (entity: Reading): ReadingResource =>
    ({
      id: entity.id,
      sensorCode: entity.sensorCode,
      batchCode: entity.batchCode,
      value: entity.value,
      recordedAt: entity.recordedAt,
      source: entity.source
    } as ReadingResource);
}
