import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Equipment} from '../domain/model/equipment.entity';
import {EquipmentResource, EquipmentResponse} from './equipment-response';

/**
 * Maps equipment entities to and from API resources.
 */
export class EquipmentAssembler implements BaseAssembler<Equipment, EquipmentResource, EquipmentResponse> {
  /**
   * Converts a EquipmentResponse to an array of Equipment entities.
   * @param response - The API response containing equipment resources.
   * @returns An array of Equipment entities.
   */
  toEntitiesFromResponse = (response: EquipmentResponse): Equipment[] =>
    response.equipment.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a EquipmentResource to a Equipment entity.
   * @param resource - The resource to convert.
   * @returns The converted Equipment entity.
   */
  toEntityFromResource = (resource: EquipmentResource): Equipment =>
    new Equipment({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      model: resource.model,
      location: resource.location,
      calibrationStatus: resource.calibrationStatus,
      calibrationDue: resource.calibrationDue,
      certificate: resource.certificate,
      nextMaintenance: resource.nextMaintenance,
      maintenanceOwner: resource.maintenanceOwner,
      workOrder: resource.workOrder,
      healthNote: resource.healthNote
    });

  /**
   * Converts a Equipment entity to a EquipmentResource.
   * @param entity - The entity to convert.
   * @returns The converted EquipmentResource.
   */
  toResourceFromEntity = (entity: Equipment): EquipmentResource =>
    ({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      model: entity.model,
      location: entity.location,
      calibrationStatus: entity.calibrationStatus,
      calibrationDue: entity.calibrationDue,
      certificate: entity.certificate,
      nextMaintenance: entity.nextMaintenance,
      maintenanceOwner: entity.maintenanceOwner,
      workOrder: entity.workOrder,
      healthNote: entity.healthNote
    } as EquipmentResource);
}
