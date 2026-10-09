export const environment = {
  production: false,
  /*
  // API URL Version when the DoofPlus Platform (Web Services) is implemented
  platformProviderApiBaseUrl: 'http://localhost:8080/api/v1',
  platformProviderUsersEndpointPath: '/users',
  platformProviderRoleProfilesEndpointPath: '/role-profiles',
  platformProviderInvitationsEndpointPath: '/invitations',
  */
  // API URL Version to be used until the DoofPlus Platform is implemented (fake API with json-server)
  platformProviderApiBaseUrl: 'http://localhost:3000/api/v1',
  platformProviderUsersEndpointPath: '/users',
  platformProviderRoleProfilesEndpointPath: '/role-profiles',
  platformProviderInvitationsEndpointPath: '/invitations',
  platformProviderPlansEndpointPath: '/plans',
  platformProviderSubscriptionsEndpointPath: '/subscriptions',
  platformProviderInvoicesEndpointPath: '/invoices',
  platformProviderOrganizationsEndpointPath: '/organizations',
  platformProviderFacilitiesEndpointPath: '/facilities',
  platformProviderUserProfilesEndpointPath: '/user-profiles',
  platformProviderAdministrativeActivitiesEndpointPath: '/administrative-activities',
  platformProviderProductsEndpointPath: '/products',
  platformProviderMasterFormulasEndpointPath: '/master-formulas',
  platformProviderFormulaItemsEndpointPath: '/formula-items',
  platformProviderProductionOrdersEndpointPath: '/production-orders',
  platformProviderOperationsEndpointPath: '/operations',
  platformProviderBatchesEndpointPath: '/batches',
  platformProviderBatchEventsEndpointPath: '/batch-events',
  platformProviderMaterialLotsEndpointPath: '/material-lots',
  platformProviderEquipmentEndpointPath: '/equipment',
  platformProviderSensorsEndpointPath: '/sensors',
  platformProviderReadingsEndpointPath: '/readings',
  platformProviderAlertsEndpointPath: '/alerts',
  landingPageUrl: 'https://ingescompany-7742.github.io/IngesCompany-LandingPage/'
};
