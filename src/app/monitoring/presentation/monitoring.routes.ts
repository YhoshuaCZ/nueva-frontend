import {Routes} from '@angular/router';

const iotOverview = () => import('./views/iot-overview/iot-overview').then(m => m.IotOverview);
const equipmentInventory = () => import('./views/equipment-inventory/equipment-inventory').then(m => m.EquipmentInventory);
const sensorDetail = () => import('./views/sensor-detail/sensor-detail').then(m => m.SensorDetail);
const alertList = () => import('./views/alert-list/alert-list').then(m => m.AlertList);
const batchIotEvidence = () => import('./views/batch-iot-evidence/batch-iot-evidence').then(m => m.BatchIotEvidence);

/**
 * Production routes of the IoT Monitoring bounded context.
 */
export const monitoringRoutes: Routes = [
  { path: 'iot',               loadComponent: iotOverview,        title: 'DoofPlus - IoT overview' },
  { path: 'equipment',         loadComponent: equipmentInventory, title: 'DoofPlus - Equipment & sensors' },
  { path: 'sensors/:code',     loadComponent: sensorDetail,       title: 'DoofPlus - Sensor detail' },
  { path: 'incidents',         loadComponent: alertList,          title: 'DoofPlus - Incidents' },
  { path: 'batches/:code/iot', loadComponent: batchIotEvidence,   title: 'DoofPlus - Batch IoT evidence' }
];
