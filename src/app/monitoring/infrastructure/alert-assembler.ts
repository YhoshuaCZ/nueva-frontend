import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Alert} from '../domain/model/alert.entity';
import {AlertResource, AlertsResponse} from './alerts-response';

/**
 * Maps alert entities to and from API resources.
 */
export class AlertAssembler implements BaseAssembler<Alert, AlertResource, AlertsResponse> {
  /**
   * Converts a AlertsResponse to an array of Alert entities.
   * @param response - The API response containing alert resources.
   * @returns An array of Alert entities.
   */
  toEntitiesFromResponse = (response: AlertsResponse): Alert[] =>
    response.alerts.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AlertResource to a Alert entity.
   * @param resource - The resource to convert.
   * @returns The converted Alert entity.
   */
  toEntityFromResource = (resource: AlertResource): Alert =>
    new Alert({
      id: resource.id,
      code: resource.code,
      sensorCode: resource.sensorCode,
      equipmentCode: resource.equipmentCode,
      severity: resource.severity,
      status: resource.status,
      title: resource.title,
      detail: resource.detail,
      batchCode: resource.batchCode,
      acknowledgedBy: resource.acknowledgedBy,
      acknowledgedAt: resource.acknowledgedAt,
      responseNote: resource.responseNote,
      linkedRecord: resource.linkedRecord
    });

  /**
   * Converts a Alert entity to a AlertResource.
   * @param entity - The entity to convert.
   * @returns The converted AlertResource.
   */
  toResourceFromEntity = (entity: Alert): AlertResource =>
    ({
      id: entity.id,
      code: entity.code,
      sensorCode: entity.sensorCode,
      equipmentCode: entity.equipmentCode,
      severity: entity.severity,
      status: entity.status,
      title: entity.title,
      detail: entity.detail,
      batchCode: entity.batchCode,
      acknowledgedBy: entity.acknowledgedBy,
      acknowledgedAt: entity.acknowledgedAt,
      responseNote: entity.responseNote,
      linkedRecord: entity.linkedRecord
    } as AlertResource);
}
