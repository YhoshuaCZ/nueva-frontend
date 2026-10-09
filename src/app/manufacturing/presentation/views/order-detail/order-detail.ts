import {Component, computed, inject, input} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

/**
 * Production order: manufacturing execution, effective master formula and order context.
 */
@Component({
  selector: 'app-order-detail',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, DatePipe, DecimalPipe, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css'
})
export class OrderDetail {
  protected readonly store = inject(ManufacturingStore);

  /**
   * Order code from the route.
   */
  readonly code = input.required<string>();

  /**
   * The production order.
   */
  protected readonly order = computed(() => this.store.orders().find(order => order.code === this.code()));

  /**
   * Product of the order.
   */
  protected readonly product = computed(() => this.store.products().find(product => product.code === this.order()?.productCode));

  /**
   * Master formula of the order.
   */
  protected readonly formula = computed(() => this.store.formulas().find(formula => formula.id === this.order()?.formulaId));

  /**
   * Components and parameters of the formula.
   */
  protected readonly items = computed(() => this.store.formulaItems().filter(item => item.formulaId === this.formula()?.id));

  /**
   * Operations of the order.
   */
  protected readonly operations = computed(() => {
    const order = this.order();
    return order ? this.store.operationsOfOrder(order.id)() : [];
  });

  /**
   * Operation on hold, if any.
   */
  protected readonly heldOperation = computed(() => this.operations().find(operation => operation.status === 'on-hold'));

  /**
   * Color of an operation status chip.
   * @param status - Operation status.
   */
  protected toneOf(status: string): string {
    return ({complete: 'chip-success', 'on-hold': 'chip-danger', 'in-progress': 'chip-teal'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Records progress on the next operation.
   */
  protected recordOperation(): void {
    const order = this.order();
    if (order) this.store.recordOperation(order.id);
  }
}
