import {Routes} from '@angular/router';
import {Layout} from './shared/presentation/components/layout/layout';
import {WorkspaceShell} from './shared/presentation/components/workspace-shell/workspace-shell';
import {iamGuard} from './iam/infrastructure/iam.guard';
import {routes as manufacturingRoutes} from './manufacturing/presentation/manufacturing.routes';

const baseTitle = 'DoofPlus';

const pageNotFound = () =>
  import('./shared/presentation/views/page-not-found/page-not-found').then(m => m.PageNotFound);

const iamRoutes = () => import('./iam/presentation/iam.routes').then(m => m.iamRoutes);
const iamAdministrationRoutes = () => import('./iam/presentation/iam.routes').then(m => m.iamAdministrationRoutes);
const organizationsPublicRoutes = () => import('./organizations/presentation/organizations.routes').then(m => m.organizationsPublicRoutes);
const organizationsAdministrationRoutes = () => import('./organizations/presentation/organizations.routes').then(m => m.organizationsAdministrationRoutes);
const profileRoutes = () => import('./organizations/presentation/organizations.routes').then(m => m.profileRoutes);
const subscriptionsRoutes = () => import('./subscriptions/presentation/subscriptions.routes').then(m => m.subscriptionsRoutes);

/**
 * Route shown inside a frame when a path does not exist.
 */
const notFound = { path: '**', loadComponent: pageNotFound, title: `${baseTitle} - Page Not Found` };

/**
 * Root routes. Public pages use the layout (toolbar and footer); each environment uses the
 * workspace shell and is protected by the IAM guard.
 */
export const routes: Routes = [
  { path: '',               redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in',        component: Layout, loadChildren: iamRoutes },
  { path: 'register',       loadChildren: organizationsPublicRoutes },
  { path: 'qa',             component: WorkspaceShell, canActivate: [iamGuard], data: { environment: 'qa' }, children: [
    { path: '', loadChildren: profileRoutes },
    notFound
  ]},
  { path: 'production',     component: WorkspaceShell, canActivate: [iamGuard], data: { environment: 'production' }, children: [
    { path: '', loadChildren: profileRoutes },
    notFound
  ]},
  { path: 'administration', component: WorkspaceShell, canActivate: [iamGuard], data: { environment: 'administration' }, children: [
    { path: '', loadChildren: iamAdministrationRoutes },
    { path: '', loadChildren: subscriptionsRoutes },
    { path: '', loadChildren: organizationsAdministrationRoutes },
    { path: '', loadChildren: profileRoutes },
    notFound
  ]},
  { path: '',               component: Layout, children: [
    ...manufacturingRoutes,
    notFound
  ]}
];
