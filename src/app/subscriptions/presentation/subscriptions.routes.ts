import {Routes} from '@angular/router';

const subscriptionManagement = () =>
  import('./views/subscription-management/subscription-management').then(m => m.SubscriptionManagement);

/**
 * Administration routes of the Subscriptions & Payments bounded context.
 */
export const subscriptionsRoutes: Routes = [
  { path: 'subscription', loadComponent: subscriptionManagement, title: 'DoofPlus - Subscriptions & payments' }
];
