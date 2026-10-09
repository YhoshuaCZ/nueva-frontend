/**
 * Environments of the Web Application. Each role signs in to one of them and sees its own navigation.
 */
export type WorkspaceEnvironment = 'qa' | 'production' | 'administration';

/**
 * Link of the workspace sidebar.
 */
export interface NavigationOption {
  /**
   * Route of the page.
   */
  link: string;
  /**
   * Translation key of the label.
   */
  label: string;
}

/**
 * Presentation settings of an environment: accent color, features shown at sign-in and sidebar navigation.
 */
export interface EnvironmentProfile {
  /**
   * Environment key used in routes and translations.
   */
  key: WorkspaceEnvironment;
  /**
   * Accent color of the environment.
   */
  accent: 'teal' | 'blue' | 'slate';
  /**
   * Translation keys of the features listed at sign-in.
   */
  features: string[];
  /**
   * Sidebar links of the workspace.
   */
  navigation: NavigationOption[];
}

/**
 * Settings of the three environments: QA/QC, Production and Administration.
 */
export const workspaceEnvironments: Record<WorkspaceEnvironment, EnvironmentProfile> = {
  qa: {
    key: 'qa',
    accent: 'teal',
    features: ['documents', 'analytical-results', 'deviations-capa', 'batch-release', 'audits'],
    navigation: [
      { link: '/qa/overview', label: 'nav.quality-overview' },
      { link: '/qa/indicators', label: 'nav.quality-indicators' },
      { link: '/qa/documents', label: 'nav.quality-documents' },
      { link: '/qa/deviations', label: 'nav.deviations' },
      { link: '/qa/capa', label: 'nav.capa-plans' },
      { link: '/qa/batch-release', label: 'nav.batch-release' },
      { link: '/qa/analytical-results', label: 'nav.analytical-results' },
      { link: '/qa/audits', label: 'nav.audits' },
      { link: '/qa/audit-trail', label: 'nav.audit-trail' },
      { link: '/qa/regulatory-reports', label: 'nav.regulatory-reports' },
      { link: '/qa/tasks', label: 'nav.tasks' }
    ]
  },
  production: {
    key: 'production',
    accent: 'blue',
    features: ['products-formulas', 'production-orders', 'batch-execution', 'raw-material-receipt'],
    navigation: [
      { link: '/production/overview', label: 'nav.production-overview' },
      { link: '/production/orders', label: 'nav.production-orders' },
      { link: '/production/products', label: 'nav.products-formulas' },
      { link: '/production/batches', label: 'nav.batches' },
      { link: '/production/raw-materials', label: 'nav.raw-materials' },
      { link: '/production/equipment', label: 'nav.equipment-sensors' },
      { link: '/production/iot', label: 'nav.iot-overview' },
      { link: '/production/incidents', label: 'nav.incidents' },
      { link: '/production/tasks', label: 'nav.tasks' }
    ]
  },
  administration: {
    key: 'administration',
    accent: 'slate',
    features: ['organization-plants', 'users-roles', 'subscription-payments', 'profile-preferences'],
    navigation: [
      { link: '/administration/overview', label: 'nav.administration-overview' },
      { link: '/administration/users', label: 'nav.users-profiles' },
      { link: '/administration/subscription', label: 'nav.subscription-payments' },
      { link: '/administration/audit-trail', label: 'nav.audit-trail' },
      { link: '/administration/tasks', label: 'nav.tasks' }
    ]
  }
};
