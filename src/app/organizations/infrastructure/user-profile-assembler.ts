import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {UserProfile} from '../domain/model/user-profile.entity';
import {UserProfileResource, UserProfilesResponse} from './user-profiles-response';

/**
 * Maps user profile entities to and from API resources.
 */
export class UserProfileAssembler implements BaseAssembler<UserProfile, UserProfileResource, UserProfilesResponse> {
  /**
   * Converts a UserProfilesResponse to an array of UserProfile entities.
   * @param response - The API response containing user profile resources.
   * @returns An array of UserProfile entities.
   */
  toEntitiesFromResponse = (response: UserProfilesResponse): UserProfile[] =>
    response.userProfiles.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a UserProfileResource to a UserProfile entity.
   * @param resource - The resource to convert.
   * @returns The converted UserProfile entity.
   */
  toEntityFromResource = (resource: UserProfileResource): UserProfile =>
    new UserProfile({
      id: resource.id,
      userId: resource.userId,
      firstName: resource.firstName,
      lastName: resource.lastName,
      email: resource.email,
      area: resource.area,
      site: resource.site,
      emailNotifications: resource.emailNotifications,
      inAppNotifications: resource.inAppNotifications,
      language: resource.language
    });

  /**
   * Converts a UserProfile entity to a UserProfileResource.
   * @param entity - The entity to convert.
   * @returns The converted UserProfileResource.
   */
  toResourceFromEntity = (entity: UserProfile): UserProfileResource =>
    ({
      id: entity.id,
      userId: entity.userId,
      firstName: entity.firstName,
      lastName: entity.lastName,
      email: entity.email,
      area: entity.area,
      site: entity.site,
      emailNotifications: entity.emailNotifications,
      inAppNotifications: entity.inAppNotifications,
      language: entity.language
    } as UserProfileResource);
}
