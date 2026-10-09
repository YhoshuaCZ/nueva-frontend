import {Routes} from '@angular/router';

const qualityOverview = () => import('./views/quality-overview/quality-overview').then(m => m.QualityOverview);
const qualityIndicators = () => import('./views/quality-indicators/quality-indicators').then(m => m.QualityIndicators);
const documentManagement = () => import('./views/document-management/document-management').then(m => m.DocumentManagement);
const deviationDetail = () => import('./views/deviation-detail/deviation-detail').then(m => m.DeviationDetail);
const capaManagement = () => import('./views/capa-management/capa-management').then(m => m.CapaManagement);
const batchRelease = () => import('./views/batch-release/batch-release').then(m => m.BatchRelease);
const analyticalResults = () => import('./views/analytical-results/analytical-results').then(m => m.AnalyticalResults);
const auditManagement = () => import('./views/audit-management/audit-management').then(m => m.AuditManagement);
const auditTrail = () => import('./views/audit-trail/audit-trail').then(m => m.AuditTrail);
const regulatoryReports = () => import('./views/regulatory-reports/regulatory-reports').then(m => m.RegulatoryReports);
const taskCollaboration = () => import('./views/task-collaboration/task-collaboration').then(m => m.TaskCollaboration);

/**
 * Routes shared by every environment: audit trail and tasks.
 */
export const qualitySharedRoutes: Routes = [
  { path: 'audit-trail', loadComponent: auditTrail,        title: 'DoofPlus - Audit trail' },
  { path: 'tasks',       loadComponent: taskCollaboration, title: 'DoofPlus - Tasks & collaboration' }
];

/**
 * QA/QC routes of the Quality & Compliance bounded context.
 */
export const qualityRoutes: Routes = [
  { path: 'overview',           loadComponent: qualityOverview,    title: 'DoofPlus - Quality overview' },
  { path: 'indicators',         loadComponent: qualityIndicators,  title: 'DoofPlus - Quality indicators' },
  { path: 'documents',          loadComponent: documentManagement, title: 'DoofPlus - Quality documents' },
  { path: 'deviations',         loadComponent: deviationDetail,    title: 'DoofPlus - Deviations' },
  { path: 'capa',               loadComponent: capaManagement,     title: 'DoofPlus - CAPA plans' },
  { path: 'batch-release',      loadComponent: batchRelease,       title: 'DoofPlus - Batch release' },
  { path: 'analytical-results', loadComponent: analyticalResults,  title: 'DoofPlus - Analytical results' },
  { path: 'audits',             loadComponent: auditManagement,    title: 'DoofPlus - Audits' },
  { path: 'regulatory-reports', loadComponent: regulatoryReports,  title: 'DoofPlus - Regulatory reports' },
  ...qualitySharedRoutes
];
