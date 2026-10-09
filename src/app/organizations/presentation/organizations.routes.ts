import {Routes} from '@angular/router';

const organizationRegistration = () =>
  import('./views/organization-registration/organization-registration').then(m => m.OrganizationRegistration);
const administrationOverview = () =>
  import('./views/administration-overview/administration-overview').then(m => m.AdministrationOverview);
const profilePreferences = () =>
  import('./views/profile-preferences/profile-preferences').then(m => m.ProfilePreferences);

/**
 * Public route of the organization registration.
 */
export const organizationsPublicRoutes: Routes = [
  { path: '', loadComponent: organizationRegistration, title: 'DoofPlus - Organization registration' }
];

/**
 * Administration routes of the Organizations & Profiles bounded context.
 */
export const organizationsAdministrationRoutes: Routes = [
  { path: 'overview', loadComponent: administrationOverview, title: 'DoofPlus - Administration overview' }
];

/**
 * Profile route available in every environment.
 */
export const profileRoutes: Routes = [
  { path: 'profile', loadComponent: profilePreferences, title: 'DoofPlus - Profile & preferences' }
];
