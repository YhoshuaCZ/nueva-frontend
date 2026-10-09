import {computed, inject, Injectable, signal} from '@angular/core';
import {retry} from 'rxjs';
import {OrganizationsApi} from '../infrastructure/organizations-api';
import {Organization} from '../domain/model/organization.entity';
import {Facility} from '../domain/model/facility.entity';
import {UserProfile} from '../domain/model/user-profile.entity';
import {AdministrativeActivity} from '../domain/model/administrative-activity.entity';
import {RegisterOrganizationCommand} from '../domain/model/register-organization.command';
import {IamStore} from '../../iam/application/iam.store';
import {SubscriptionsStore} from '../../subscriptions/application/subscriptions.store';

/**
 * Step of the organization registration shown by the registration form.
 */
export type RegistrationStep = 'form' | 'ruc-registered' | 'verification';

/**
 * Holds the organization of the signed-in user, its facilities, the user profiles and the registration flow.
 */
@Injectable({providedIn: 'root'})
export class OrganizationsStore {
  private readonly organizationsApi = inject(OrganizationsApi);
  private readonly iamStore = inject(IamStore);
  private readonly subscriptionsStore = inject(SubscriptionsStore);

  private readonly organizationSignal = signal<Organization | null>(null);
  private readonly facilitiesSignal = signal<Facility[]>([]);
  private readonly profilesSignal = signal<UserProfile[]>([]);
  private readonly activitiesSignal = signal<AdministrativeActivity[]>([]);
  private readonly registrationStepSignal = signal<RegistrationStep>('form');
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /**
   * Organization of the signed-in user.
   */
  readonly organization = this.organizationSignal.asReadonly();

  /**
   * Facilities of the organization.
   */
  readonly facilities = this.facilitiesSignal.asReadonly();

  /**
   * Administrative activity, newest first.
   */
  readonly activities = computed(() => [...this.activitiesSignal()].sort((a, b) => b.occurredAt.localeCompare(a.occurredAt)));

  /**
   * Profile of the signed-in user.
   */
  readonly currentProfile = computed(() =>
    this.profilesSignal().find(profile => profile.userId === this.iamStore.currentUser()?.id));

  /**
   * Current step of the registration.
   */
  readonly registrationStep = this.registrationStepSignal.asReadonly();

  /**
   * Whether data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Current error message, if any.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Loads the organization of the signed-in user, its facilities and its activity.
   */
  loadOrganization = (): void => {
    const user = this.iamStore.currentUser();
    if (!user) return;
    this.organizationsApi.getOrganization(user.organizationId).subscribe({
      next: organization => this.organizationSignal.set(organization),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load the organization'))
    });
    this.organizationsApi.getFacilities().subscribe({
      next: facilities => this.facilitiesSignal.set(facilities.filter(facility => facility.organizationId === user.organizationId)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load facilities'))
    });
    this.organizationsApi.getActivities().subscribe({
      next: activities => this.activitiesSignal.set(activities),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load the activity'))
    });
  };

  /**
   * Loads the user profiles.
   */
  loadProfiles = (): void => {
    this.organizationsApi.getUserProfiles().subscribe({
      next: profiles => this.profilesSignal.set(profiles),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load the profile'))
    });
  };

  /**
   * Saves the personal data and preferences of a profile.
   * @param profile - Profile with the new values.
   */
  updateProfile = (profile: UserProfile): void => {
    this.loadingSignal.set(true);
    this.organizationsApi.updateUserProfile(profile).pipe(retry(2)).subscribe({
      next: updated => {
        this.profilesSignal.update(profiles => profiles.map(item => item.id === updated.id ? updated : item));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to save the profile'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Registers a new organization: checks the RUC, creates the organization and its primary plant,
   * the pending subscription and the first administrator, who must verify the email.
   * @param command - Data entered in the registration form.
   */
  register = (command: RegisterOrganizationCommand): void => {
    this.loadingSignal.set(true);
    this.organizationsApi.isRucRegistered(command.ruc).subscribe({
      next: registered => {
        if (registered) {
          this.loadingSignal.set(false);
          return this.registrationStepSignal.set('ruc-registered');
        }
        this.createOrganization(command);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to check the RUC'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Returns the registration to the form.
   */
  resetRegistration = (): void => this.registrationStepSignal.set('form');

  /**
   * Creates the organization and the records that depend on it.
   * @param command - Data entered in the registration form.
   */
  private createOrganization(command: RegisterOrganizationCommand): void {
    this.organizationsApi.createOrganization(new Organization({
      id: 0, legalName: command.legalName, ruc: command.ruc, region: 'Peru',
      ownerName: command.administratorName, status: 'pending-verification'
    })).subscribe({
      next: organization => {
        this.organizationsApi.createFacility(new Facility({
          id: 0, organizationId: organization.id, name: command.facilityName, type: 'manufacturing',
          timezone: 'America/Lima', ownerName: command.administratorName, status: 'active'
        })).subscribe();
        this.subscriptionsStore.subscribe(organization.id, command.planKey, command.billingCycle, command.administratorEmail);
        this.iamStore.registerAdministrator({
          organizationId: organization.id, organizationName: organization.legalName, plant: command.facilityName,
          fullName: command.administratorName, email: command.administratorEmail, password: command.password
        });
        this.loadingSignal.set(false);
        this.registrationStepSignal.set('verification');
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create the organization'));
        this.loadingSignal.set(false);
      }
    });
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
