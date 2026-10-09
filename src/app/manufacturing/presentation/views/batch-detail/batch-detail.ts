import {Component, computed, inject, input} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatProgressBar} from '@angular/material/progress-bar';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

/**
 * Batch detail: material-to-finished-goods genealogy and status history.
 */
@Component({
  selector: 'app-batch-detail',
  imports: [MatProgressBar, MatCard, MatButton, DatePipe, DecimalPipe, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './batch-detail.html',
  styleUrl: './batch-detail.css'
})
export class BatchDetail {
  protected readonly store = inject(ManufacturingStore);

  /**
   * Batch code from the route.
   */
  readonly code = input.required<string>();

  /**
   * The batch.
   */
  protected readonly batch = computed(() => this.store.batches().find(batch => batch.code === this.code()));

  /**
   * Product of the batch.
   */
  protected readonly product = computed(() => this.store.products().find(product => product.code === this.batch()?.productCode));

  /**
   * Production order of the batch.
   */
  protected readonly order = computed(() => this.store.orders().find(order => order.code === this.batch()?.orderCode));

  /**
   * Master formula of the order.
   */
  protected readonly formula = computed(() => this.store.formulas().find(formula => formula.id === this.order()?.formulaId));

  /**
   * Input lots allocated to the batch.
   */
  protected readonly lots = computed(() => this.store.materialLots().filter(lot => lot.allocatedBatch === this.code()));

  /**
   * Operations of the order, summarized as a flow.
   */
  protected readonly operations = computed(() => {
    const order = this.order();
    return order ? this.store.operationsOfOrder(order.id)() : [];
  });

  /**
   * Status history of the batch.
   */
  protected readonly events = computed(() => this.store.eventsOfBatch(this.code())());
}
