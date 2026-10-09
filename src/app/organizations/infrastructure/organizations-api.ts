import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {environment} from '../../../environments/environment';
import {Organization} from '../domain/model/organization.entity';
import {Facility} from '../domain/model/facility.entity';
import {UserProfile} from '../domain/model/user-profile.entity';
import {AdministrativeActivity} from '../domain/model/administrative-activity.entity';
import {OrganizationsApiEndpoint} from './organizations-api-endpoint';
import {FacilitiesApiEndpoint} from './facilities-api-endpoint';
import {UserProfilesApiEndpoint} from './user-profiles-api-endpoint';
import {AdministrativeActivitiesApiEndpoint} from './administrative-activities-api-endpoint';
import {OrganizationResource} from './organizations-response';

/**
 * Infrastructure facade for organizations, facilities, user profiles and administrative activity.
 */
@Injectable({providedIn: 'root'})
export class OrganizationsApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly organizationsEndpoint = new OrganizationsApiEndpoint(this.http);
  private readonly facilitiesEndpoint = new FacilitiesApiEndpoint(this.http);
  private readonly userProfilesEndpoint = new UserProfilesApiEndpoint(this.http);
  private readonly activitiesEndpoint = new AdministrativeActivitiesApiEndpoint(this.http);
  private readonly organizationsUrl =
    `${environment.platformProviderApiBaseUrl}${environment.platformProviderOrganizationsEndpointPath}`;

  /**
   * Checks whether a RUC is already registered.
   * @param ruc - RUC to look for.
   * @returns Stream that emits true when an organization already uses the RUC.
   */
  isRucRegistered = (ruc: string): Observable<boolean> =>
    this.http.get<OrganizationResource[]>(this.organizationsUrl, {params: {ruc}}).pipe(map(resources => resources.length > 0));

  /**
   * Retrieves an organization by identifier.
   * @param id - Identifier of the organization.
   * @returns Stream with the organization.
   */
  getOrganization = (id: number): Observable<Organization> => this.organizationsEndpoint.getById(id);

  /**
   * Creates an organization.
   * @param organization - The organization to create.
   * @returns Stream with the created organization.
   */
  createOrganization = (organization: Organization): Observable<Organization> => this.organizationsEndpoint.create(organization);

  /**
   * Retrieves all facilities.
   * @returns Stream with the facility collection.
   */
  getFacilities = (): Observable<Facility[]> => this.facilitiesEndpoint.getAll();

  /**
   * Creates a facility.
   * @param facility - The facility to create.
   * @returns Stream with the created facility.
   */
  createFacility = (facility: Facility): Observable<Facility> => this.facilitiesEndpoint.create(facility);

  /**
   * Retrieves all user profiles.
   * @returns Stream with the profile collection.
   */
  getUserProfiles = (): Observable<UserProfile[]> => this.userProfilesEndpoint.getAll();

  /**
   * Updates a user profile.
   * @param profile - The profile to update.
   * @returns Stream with the updated profile.
   */
  updateUserProfile = (profile: UserProfile): Observable<UserProfile> => this.userProfilesEndpoint.update(profile, profile.id);

  /**
   * Retrieves the administrative activity.
   * @returns Stream with the activity collection.
   */
  getActivities = (): Observable<AdministrativeActivity[]> => this.activitiesEndpoint.getAll();
}
