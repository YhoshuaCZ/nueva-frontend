import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AdministrativeActivity} from '../domain/model/administrative-activity.entity';
import {AdministrativeActivityResource, AdministrativeActivitiesResponse} from './administrative-activities-response';

/**
 * Maps administrative activity entities to and from API resources.
 */
export class AdministrativeActivityAssembler implements BaseAssembler<AdministrativeActivity, AdministrativeActivityResource, AdministrativeActivitiesResponse> {
  /**
   * Converts a AdministrativeActivitiesResponse to an array of AdministrativeActivity entities.
   * @param response - The API response containing administrative activity resources.
   * @returns An array of AdministrativeActivity entities.
   */
  toEntitiesFromResponse = (response: AdministrativeActivitiesResponse): AdministrativeActivity[] =>
    response.administrativeActivities.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AdministrativeActivityResource to a AdministrativeActivity entity.
   * @param resource - The resource to convert.
   * @returns The converted AdministrativeActivity entity.
   */
  toEntityFromResource = (resource: AdministrativeActivityResource): AdministrativeActivity =>
    new AdministrativeActivity({
      id: resource.id,
      title: resource.title,
      actor: resource.actor,
      occurredAt: resource.occurredAt
    });

  /**
   * Converts a AdministrativeActivity entity to a AdministrativeActivityResource.
   * @param entity - The entity to convert.
   * @returns The converted AdministrativeActivityResource.
   */
  toResourceFromEntity = (entity: AdministrativeActivity): AdministrativeActivityResource =>
    ({
      id: entity.id,
      title: entity.title,
      actor: entity.actor,
      occurredAt: entity.occurredAt
    } as AdministrativeActivityResource);
}
