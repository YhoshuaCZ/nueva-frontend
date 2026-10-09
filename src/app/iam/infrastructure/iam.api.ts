import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, map} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {environment} from '../../../environments/environment';
import {User} from '../domain/model/user.entity';
import {RoleProfile} from '../domain/model/role-profile.entity';
import {Invitation} from '../domain/model/invitation.entity';
import {SignInCommand} from '../domain/model/sign-in.command';
import {UsersApiEndpoint} from './users-api-endpoint';
import {RoleProfilesApiEndpoint} from './role-profiles-api-endpoint';
import {InvitationsApiEndpoint} from './invitations-api-endpoint';
import {UserResource} from './users-response';
import {UserAssembler} from './user-assembler';

/**
 * Infrastructure facade for the IAM endpoints: authentication, users, profiles and invitations.
 */
@Injectable({providedIn: 'root'})
export class IamApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly usersEndpoint = new UsersApiEndpoint(this.http);
  private readonly roleProfilesEndpoint = new RoleProfilesApiEndpoint(this.http);
  private readonly invitationsEndpoint = new InvitationsApiEndpoint(this.http);
  private readonly usersUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderUsersEndpointPath}`;
  private readonly userAssembler = new UserAssembler();

  /**
   * Finds the user that matches the credentials of the command.
   * @param command - Email and password entered by the user.
   * @returns Stream with the user, or undefined when the credentials are invalid.
   * @remarks The fake API filters users by query parameters; the DoofPlus Platform will expose a sign-in endpoint.
   */
  findUserByCredentials = (command: SignInCommand): Observable<User | undefined> =>
    this.http.get<UserResource[]>(this.usersUrl, {params: {email: command.email, password: command.password}}).pipe(
      map(resources => resources.length ? this.userAssembler.toEntityFromResource(resources[0]) : undefined)
    );

  /**
   * Checks the two-factor code of a user.
   * @param userId - Identifier of the user that is signing in.
   * @param code - Six-digit code from the authenticator app.
   * @returns Stream that emits true when the code is valid.
   */
  verifyTwoFactorCode = (userId: number, code: string): Observable<boolean> =>
    this.http.get<UserResource[]>(this.usersUrl, {params: {id: userId, twoFactorCode: code}}).pipe(
      map(resources => resources.length > 0)
    );

  /**
   * Creates a user account with its password.
   * @param user - The user to create.
   * @param password - Initial password chosen by the user.
   * @returns Stream with the created user.
   * @remarks The fake API stores the password with the user; the DoofPlus Platform will hash it in a sign-up endpoint.
   */
  createUser = (user: User, password: string): Observable<User> =>
    this.http.post<UserResource>(this.usersUrl, {...this.userAssembler.toResourceFromEntity(user), id: undefined, password}).pipe(
      map(resource => this.userAssembler.toEntityFromResource(resource))
    );

  /**
   * Retrieves all users of the organization.
   * @returns Stream with the user collection.
   */
  getUsers = (): Observable<User[]> => this.usersEndpoint.getAll();

  /**
   * Retrieves the role profiles.
   * @returns Stream with the profile collection.
   */
  getRoleProfiles = (): Observable<RoleProfile[]> => this.roleProfilesEndpoint.getAll();

  /**
   * Retrieves the invitations.
   * @returns Stream with the invitation collection.
   */
  getInvitations = (): Observable<Invitation[]> => this.invitationsEndpoint.getAll();

  /**
   * Creates a new invitation.
   * @param invitation - The invitation to send.
   * @returns Stream with the created invitation.
   */
  createInvitation = (invitation: Invitation): Observable<Invitation> => this.invitationsEndpoint.create(invitation);
}
