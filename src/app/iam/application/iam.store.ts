import {computed, inject, Injectable, signal} from '@angular/core';
import {Router} from '@angular/router';
import {map, Observable, of, retry} from 'rxjs';
import {IamApi} from '../infrastructure/iam.api';
import {UserAssembler} from '../infrastructure/user-assembler';
import {UserResource} from '../infrastructure/users-response';
import {User} from '../domain/model/user.entity';
import {RoleProfile} from '../domain/model/role-profile.entity';
import {Invitation} from '../domain/model/invitation.entity';
import {SignInCommand} from '../domain/model/sign-in.command';
import {WorkspaceEnvironment, workspaceEnvironments} from '../../shared/presentation/workspace-environments';

/**
 * Step of the sign-in flow shown by the sign-in form.
 */
export type SignInStep = 'credentials' | 'invalid-credentials' | 'two-factor' | 'invalid-code' | 'not-authorized';

const SESSION_KEY = 'doofplus-session';

/**
 * Holds the IAM state: the signed-in user, the sign-in flow and the users administered by the laboratory.
 */
@Injectable({providedIn: 'root'})
export class IamStore {
  private readonly iamApi = inject(IamApi);
  private readonly userAssembler = new UserAssembler();

  private readonly currentUserSignal = signal<User | null>(this.restoreSession());
  private readonly pendingUserSignal = signal<User | null>(null);
  private readonly requestedEnvironmentSignal = signal<WorkspaceEnvironment | null>(null);
  private readonly signInStepSignal = signal<SignInStep>('credentials');
  private readonly usersSignal = signal<User[]>([]);
  private readonly roleProfilesSignal = signal<RoleProfile[]>([]);
  private readonly invitationsSignal = signal<Invitation[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /**
   * User with an active session, or null.
   */
  readonly currentUser = this.currentUserSignal.asReadonly();

  /**
   * User whose credentials were accepted and who still has to enter the two-factor code.
   */
  readonly pendingUser = this.pendingUserSignal.asReadonly();

  /**
   * Current step of the sign-in flow.
   */
  readonly signInStep = this.signInStepSignal.asReadonly();

  /**
   * Whether a user is signed in.
   */
  readonly isSignedIn = computed(() => this.currentUser() !== null);

  /**
   * Users of the organization.
   */
  readonly users = this.usersSignal.asReadonly();

  /**
   * Least-privilege profiles of the organization.
   */
  readonly roleProfiles = this.roleProfilesSignal.asReadonly();

  /**
   * Invitations sent by the administrator.
   */
  readonly invitations = this.invitationsSignal.asReadonly();

  /**
   * Invitations that have not been accepted yet.
   */
  readonly pendingInvitations = computed(() => this.invitations().filter(invitation => invitation.status === 'pending'));

  /**
   * Whether data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Current error message, if any.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Validates the credentials of the command. A valid user continues to the two-factor step.
   * @param command - Credentials and requested environment.
   */
  signIn = (command: SignInCommand): void => {
    this.loadingSignal.set(true);
    this.iamApi.findUserByCredentials(command).subscribe({
      next: user => {
        this.loadingSignal.set(false);
        if (!user) return this.signInStepSignal.set('invalid-credentials');
        this.pendingUserSignal.set(user);
        this.requestedEnvironmentSignal.set(command.environment);
        this.signInStepSignal.set('two-factor');
      },
      error: err => {
        this.loadingSignal.set(false);
        this.errorSignal.set(this.formatError(err, 'Failed to sign in'));
      }
    });
  };

  /**
   * Checks the two-factor code. Once the identity is verified, the session opens only if the user's role
   * belongs to the requested environment; otherwise the user is not authorized.
   * @param code - Six-digit code from the authenticator app.
   * @param router - Router used to open the workspace.
   */
  verifyTwoFactorCode = (code: string, router: Router): void => {
    const user = this.pendingUser();
    if (!user) return this.signInStepSignal.set('credentials');
    this.iamApi.verifyTwoFactorCode(user.id, code).subscribe({
      next: valid => {
        if (!valid) return this.signInStepSignal.set('invalid-code');
        if (user.environment !== this.requestedEnvironmentSignal()) return this.signInStepSignal.set('not-authorized');
        this.currentUserSignal.set(user);
        localStorage.setItem(SESSION_KEY, JSON.stringify(this.userAssembler.toResourceFromEntity(user)));
        this.resetSignIn();
        router.navigate([workspaceEnvironments[user.environment as WorkspaceEnvironment].navigation[0].link]).then();
      },
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to verify the code'))
    });
  };

  /**
   * Returns the sign-in flow to the credentials step.
   */
  resetSignIn = (): void => {
    this.pendingUserSignal.set(null);
    this.requestedEnvironmentSignal.set(null);
    this.signInStepSignal.set('credentials');
  };

  /**
   * Closes the session and returns to the environment selection.
   * @param router - Router used to leave the workspace.
   */
  signOut = (router: Router): void => {
    localStorage.removeItem(SESSION_KEY);
    this.currentUserSignal.set(null);
    this.resetSignIn();
    router.navigate(['/sign-in']).then();
  };

  /**
   * Loads users, profiles and invitations for the administration pages.
   */
  loadDirectory = (): void => {
    this.loadingSignal.set(true);
    this.iamApi.getUsers().subscribe({
      next: users => { this.usersSignal.set(users); this.loadingSignal.set(false); },
      error: err => { this.errorSignal.set(this.formatError(err, 'Failed to load users')); this.loadingSignal.set(false); }
    });
    this.iamApi.getRoleProfiles().subscribe({
      next: profiles => this.roleProfilesSignal.set(profiles),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load profiles'))
    });
    this.iamApi.getInvitations().subscribe({
      next: invitations => this.invitationsSignal.set(invitations),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load invitations'))
    });
  };

  /**
   * Sends an invitation and adds it to the list.
   * @param invitation - The invitation to send.
   * @param router - Router used to return to the user directory.
   */
  addInvitation = (invitation: Invitation, router: Router): void => {
    this.loadingSignal.set(true);
    this.iamApi.createInvitation(invitation).pipe(retry(2)).subscribe({
      next: created => {
        this.invitationsSignal.update(invitations => [...invitations, created]);
        this.loadingSignal.set(false);
        router.navigate(['/administration/users'], {queryParams: {tab: 'invitations', sent: created.email}}).then();
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to send the invitation'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Re-authenticates the signed-in user, as required before an electronic signature.
   * @param password - Password entered by the user.
   * @returns Stream that emits true when the password is correct.
   */
  verifyPassword = (password: string): Observable<boolean> => {
    const user = this.currentUser();
    if (!user) return of(false);
    return this.iamApi.findUserByCredentials(new SignInCommand({email: user.email, password, environment: user.environment as WorkspaceEnvironment}))
      .pipe(map(found => found?.id === user.id));
  };

  /**
   * Creates the first administrator of a newly registered organization. The account stays invited
   * until the administrator verifies the email and enrolls two-factor authentication.
   * @param administrator - Organization and personal data of the administrator.
   */
  registerAdministrator = (administrator: {
    organizationId: number; organizationName: string; plant: string; fullName: string; email: string; password: string;
  }): void => {
    const initials = administrator.fullName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join('');
    this.iamApi.createUser(new User({
      id: 0, fullName: administrator.fullName, initials, email: administrator.email, role: 'administrator',
      environment: 'administration', facility: 'All facilities', status: 'invited', organizationId: administrator.organizationId,
      organizationName: administrator.organizationName, plant: administrator.plant, privilege: 'administrator'
    }), administrator.password).subscribe({
      next: user => this.usersSignal.update(users => [...users, user]),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to create the administrator'))
    });
  };

  /**
   * Checks whether an email already belongs to a user or an invitation of the organization.
   * @param email - Email to check.
   * @returns True when the email is already used.
   */
  isEmailTaken = (email: string): boolean => {
    const normalized = email.trim().toLowerCase();
    return this.users().some(user => user.email.toLowerCase() === normalized)
      || this.invitations().some(invitation => invitation.email.toLowerCase() === normalized);
  };

  /**
   * Restores the session saved in local storage.
   * @returns The saved user, or null.
   */
  private restoreSession(): User | null {
    const saved = localStorage.getItem(SESSION_KEY);
    if (!saved) return null;
    try {
      return this.userAssembler.toEntityFromResource(JSON.parse(saved) as UserResource);
    } catch {
      return null;
    }
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
