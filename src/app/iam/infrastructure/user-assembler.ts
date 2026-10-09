import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {User} from '../domain/model/user.entity';
import {UserResource, UsersResponse} from './users-response';

/**
 * Maps user entities to and from API resources.
 */
export class UserAssembler implements BaseAssembler<User, UserResource, UsersResponse> {
  /**
   * Converts a UsersResponse to an array of User entities.
   * @param response - The API response containing user resources.
   * @returns An array of User entities.
   */
  toEntitiesFromResponse = (response: UsersResponse): User[] =>
    response.users.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a UserResource to a User entity.
   * @param resource - The resource to convert.
   * @returns The converted User entity.
   */
  toEntityFromResource = (resource: UserResource): User =>
    new User({
      id: resource.id,
      fullName: resource.fullName,
      initials: resource.initials,
      email: resource.email,
      role: resource.role,
      environment: resource.environment,
      facility: resource.facility,
      status: resource.status,
      organizationId: resource.organizationId,
      organizationName: resource.organizationName,
      plant: resource.plant,
      privilege: resource.privilege
    });

  /**
   * Converts a User entity to a UserResource.
   * @param entity - The entity to convert.
   * @returns The converted UserResource.
   */
  toResourceFromEntity = (entity: User): UserResource =>
    ({
      id: entity.id,
      fullName: entity.fullName,
      initials: entity.initials,
      email: entity.email,
      role: entity.role,
      environment: entity.environment,
      facility: entity.facility,
      status: entity.status,
      organizationId: entity.organizationId,
      organizationName: entity.organizationName,
      plant: entity.plant,
      privilege: entity.privilege
    } as UserResource);
}
