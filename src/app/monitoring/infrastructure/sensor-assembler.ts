import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Sensor} from '../domain/model/sensor.entity';
import {SensorResource, SensorsResponse} from './sensors-response';

/**
 * Maps sensor entities to and from API resources.
 */
export class SensorAssembler implements BaseAssembler<Sensor, SensorResource, SensorsResponse> {
  /**
   * Converts a SensorsResponse to an array of Sensor entities.
   * @param response - The API response containing sensor resources.
   * @returns An array of Sensor entities.
   */
  toEntitiesFromResponse = (response: SensorsResponse): Sensor[] =>
    response.sensors.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a SensorResource to a Sensor entity.
   * @param resource - The resource to convert.
   * @returns The converted Sensor entity.
   */
  toEntityFromResource = (resource: SensorResource): Sensor =>
    new Sensor({
      id: resource.id,
      code: resource.code,
      deviceId: resource.deviceId,
      type: resource.type,
      unit: resource.unit,
      equipmentCode: resource.equipmentCode,
      lowerLimit: resource.lowerLimit,
      upperLimit: resource.upperLimit,
      status: resource.status,
      assignedBatch: resource.assignedBatch
    });

  /**
   * Converts a Sensor entity to a SensorResource.
   * @param entity - The entity to convert.
   * @returns The converted SensorResource.
   */
  toResourceFromEntity = (entity: Sensor): SensorResource =>
    ({
      id: entity.id,
      code: entity.code,
      deviceId: entity.deviceId,
      type: entity.type,
      unit: entity.unit,
      equipmentCode: entity.equipmentCode,
      lowerLimit: entity.lowerLimit,
      upperLimit: entity.upperLimit,
      status: entity.status,
      assignedBatch: entity.assignedBatch
    } as SensorResource);
}
