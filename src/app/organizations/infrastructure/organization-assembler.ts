import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Organization} from '../domain/model/organization.entity';
import {OrganizationResource, OrganizationsResponse} from './organizations-response';

/**
 * Maps organization entities to and from API resources.
 */
export class OrganizationAssembler implements BaseAssembler<Organization, OrganizationResource, OrganizationsResponse> {
  /**
   * Converts a OrganizationsResponse to an array of Organization entities.
   * @param response - The API response containing organization resources.
   * @returns An array of Organization entities.
   */
  toEntitiesFromResponse = (response: OrganizationsResponse): Organization[] =>
    response.organizations.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a OrganizationResource to a Organization entity.
   * @param resource - The resource to convert.
   * @returns The converted Organization entity.
   */
  toEntityFromResource = (resource: OrganizationResource): Organization =>
    new Organization({
      id: resource.id,
      legalName: resource.legalName,
      ruc: resource.ruc,
      region: resource.region,
      ownerName: resource.ownerName,
      status: resource.status
    });

  /**
   * Converts a Organization entity to a OrganizationResource.
   * @param entity - The entity to convert.
   * @returns The converted OrganizationResource.
   */
  toResourceFromEntity = (entity: Organization): OrganizationResource =>
    ({
      id: entity.id,
      legalName: entity.legalName,
      ruc: entity.ruc,
      region: entity.region,
      ownerName: entity.ownerName,
      status: entity.status
    } as OrganizationResource);
}
