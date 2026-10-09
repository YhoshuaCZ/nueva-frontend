import {Routes} from '@angular/router';

const environmentSelection = () => import('./views/environment-selection/environment-selection').then(m => m.EnvironmentSelection);
const signInForm = () => import('./views/sign-in-form/sign-in-form').then(m => m.SignInForm);
const userManagement = () => import('./views/user-management/user-management').then(m => m.UserManagement);
const invitationForm = () => import('./views/invitation-form/invitation-form').then(m => m.InvitationForm);

/**
 * Public IAM routes: environment selection and sign-in.
 */
export const iamRoutes: Routes = [
  { path: '',             loadComponent: environmentSelection, title: 'DoofPlus - Sign in' },
  { path: ':environment', loadComponent: signInForm,           title: 'DoofPlus - Sign in' }
];

/**
 * Administration IAM routes: users, profiles and invitations.
 */
export const iamAdministrationRoutes: Routes = [
  { path: 'users',        loadComponent: userManagement, title: 'DoofPlus - Users & profiles' },
  { path: 'users/invite', loadComponent: invitationForm, title: 'DoofPlus - Invite user' }
];
