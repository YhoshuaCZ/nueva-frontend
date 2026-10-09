import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {RoleProfile} from '../domain/model/role-profile.entity';
import {RoleProfileResource, RoleProfilesResponse} from './role-profiles-response';

/**
 * Maps role profile entities to and from API resources.
 */
export class RoleProfileAssembler implements BaseAssembler<RoleProfile, RoleProfileResource, RoleProfilesResponse> {
  /**
   * Converts a RoleProfilesResponse to an array of RoleProfile entities.
   * @param response - The API response containing role profile resources.
   * @returns An array of RoleProfile entities.
   */
  toEntitiesFromResponse = (response: RoleProfilesResponse): RoleProfile[] =>
    response.roleProfiles.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a RoleProfileResource to a RoleProfile entity.
   * @param resource - The resource to convert.
   * @returns The converted RoleProfile entity.
   */
  toEntityFromResource = (resource: RoleProfileResource): RoleProfile =>
    new RoleProfile({
      id: resource.id,
      key: resource.key,
      name: resource.name,
      createEdit: resource.createEdit,
      approveSign: resource.approveSign,
      restriction: resource.restriction,
      tone: resource.tone
    });

  /**
   * Converts a RoleProfile entity to a RoleProfileResource.
   * @param entity - The entity to convert.
   * @returns The converted RoleProfileResource.
   */
  toResourceFromEntity = (entity: RoleProfile): RoleProfileResource =>
    ({
      id: entity.id,
      key: entity.key,
      name: entity.name,
      createEdit: entity.createEdit,
      approveSign: entity.approveSign,
      restriction: entity.restriction,
      tone: entity.tone
    } as RoleProfileResource);
}
