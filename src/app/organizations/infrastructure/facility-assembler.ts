import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Facility} from '../domain/model/facility.entity';
import {FacilityResource, FacilitiesResponse} from './facilities-response';

/**
 * Maps facility entities to and from API resources.
 */
export class FacilityAssembler implements BaseAssembler<Facility, FacilityResource, FacilitiesResponse> {
  /**
   * Converts a FacilitiesResponse to an array of Facility entities.
   * @param response - The API response containing facility resources.
   * @returns An array of Facility entities.
   */
  toEntitiesFromResponse = (response: FacilitiesResponse): Facility[] =>
    response.facilities.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a FacilityResource to a Facility entity.
   * @param resource - The resource to convert.
   * @returns The converted Facility entity.
   */
  toEntityFromResource = (resource: FacilityResource): Facility =>
    new Facility({
      id: resource.id,
      organizationId: resource.organizationId,
      name: resource.name,
      type: resource.type,
      timezone: resource.timezone,
      ownerName: resource.ownerName,
      status: resource.status
    });

  /**
   * Converts a Facility entity to a FacilityResource.
   * @param entity - The entity to convert.
   * @returns The converted FacilityResource.
   */
  toResourceFromEntity = (entity: Facility): FacilityResource =>
    ({
      id: entity.id,
      organizationId: entity.organizationId,
      name: entity.name,
      type: entity.type,
      timezone: entity.timezone,
      ownerName: entity.ownerName,
      status: entity.status
    } as FacilityResource);
}
