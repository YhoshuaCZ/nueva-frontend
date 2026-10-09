import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {IamStore} from '../application/iam.store';
import {WorkspaceEnvironment, workspaceEnvironments} from '../../shared/presentation/workspace-environments';

/**
 * Blocks a workspace when there is no session or when the user's role belongs to another environment.
 * @remarks The environment of the workspace comes from the route data (`environment`).
 */
export const iamGuard: CanActivateFn = route => {
  const store = inject(IamStore);
  const router = inject(Router);
  const environment = route.data['environment'] as WorkspaceEnvironment;
  const user = store.currentUser();
  if (!user) return router.createUrlTree(['/sign-in', environment]);
  if (user.environment !== environment) {
    return router.createUrlTree([workspaceEnvironments[user.environment as WorkspaceEnvironment].navigation[0].link]);
  }
  return true;
};
