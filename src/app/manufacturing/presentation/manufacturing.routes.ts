import {Routes} from '@angular/router';

const orderList = () => import('./views/order-list/order-list').then(m => m.OrderList);
const orderDetail = () => import('./views/order-detail/order-detail').then(m => m.OrderDetail);
const productCatalog = () => import('./views/product-catalog/product-catalog').then(m => m.ProductCatalog);
const batchList = () => import('./views/batch-list/batch-list').then(m => m.BatchList);
const batchDetail = () => import('./views/batch-detail/batch-detail').then(m => m.BatchDetail);
const materialReceipt = () => import('./views/material-receipt/material-receipt').then(m => m.MaterialReceipt);

/**
 * Production routes of the Manufacturing & Batch Management bounded context.
 */
export const manufacturingRoutes: Routes = [
  { path: 'orders',         loadComponent: orderList,       title: 'DoofPlus - Production orders' },
  { path: 'orders/:code',   loadComponent: orderDetail,     title: 'DoofPlus - Production order' },
  { path: 'products',       loadComponent: productCatalog,  title: 'DoofPlus - Products & formulas' },
  { path: 'batches',        loadComponent: batchList,       title: 'DoofPlus - Batches' },
  { path: 'batches/:code',  loadComponent: batchDetail,     title: 'DoofPlus - Batch detail' },
  { path: 'raw-materials',  loadComponent: materialReceipt, title: 'DoofPlus - Raw-material receipt' }
];
