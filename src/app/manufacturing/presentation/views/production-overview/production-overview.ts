import {Component, computed, inject} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {MonitoringStore} from '../../../../monitoring/application/monitoring.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

/**
 * Production home: today's orders and batches, incidents, and equipment and material readiness.
 */
@Component({
  selector: 'app-production-overview',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, DecimalPipe, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './production-overview.html',
  styleUrl: './production-overview.css'
})
export class ProductionOverview {
  protected readonly store = inject(ManufacturingStore);
  protected readonly monitoringStore = inject(MonitoringStore);
  protected readonly iamStore = inject(IamStore);

  /**
   * First name of the signed-in user.
   */
  protected readonly firstName = computed(() => this.iamStore.currentUser()?.fullName.split(' ')[0] ?? '');

  /**
   * Orders of the schedule with their batch.
   */
  protected readonly schedule = computed(() => this.store.orders().map(order => ({
    order,
    batch: this.store.batches().find(batch => batch.code === order.batchCode),
    product: this.store.products().find(product => product.code === order.productCode)
  })));

  /**
   * Units of the batches in progress.
   */
  protected readonly output = computed(() => this.store.batches()
    .filter(batch => batch.status === 'in-progress' || batch.status === 'on-hold')
    .reduce((total, batch) => total + Math.round(batch.quantity * batch.progress / 100), 0));

  /**
   * Batch on hold, shown in the top alert.
   */
  protected readonly heldBatch = computed(() => this.store.batches().find(batch => batch.status === 'on-hold'));

  /**
   * Equipment and material that need attention before they can be used.
   */
  protected readonly readiness = computed(() => [
    ...this.monitoringStore.equipment().map(item => ({
      code: item.code, state: item.calibrationStatus, tone: item.calibrationStatus === 'fit' ? 'chip-success' : item.calibrationStatus === 'due' ? 'chip-warning' : 'chip-danger',
      label: 'monitoring.calibration.' + item.calibrationStatus, assignment: this.monitoringStore.sensorsOf(item.code)()[0]?.assignedBatch || '—'
    })),
    ...this.store.materialLots().filter(lot => lot.status !== 'approved').map(lot => ({
      code: `${lot.code} · ${lot.category.toUpperCase()}`, state: lot.status, tone: 'chip-warning',
      label: 'manufacturing.lot-status.' + lot.status, assignment: lot.allocatedBatch || '—'
    }))
  ]);

  /**
   * Color of a batch status chip.
   * @param status - Batch status.
   */
  protected toneOf(status: string | undefined): string {
    return ({'on-hold': 'chip-danger', 'in-progress': 'chip-success', planned: 'chip-neutral'} as Record<string, string>)[status ?? ''] ?? 'chip-teal';
  }
}
