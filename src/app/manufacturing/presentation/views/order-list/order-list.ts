import {Component, inject} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';

/**
 * List of production orders with their product, batch, line and status.
 */
@Component({
  selector: 'app-order-list',
  imports: [DatePipe, DecimalPipe, RouterLink, TranslatePipe, MatCard, MatButton, MatIcon, MatTableModule, PageHeader],
  templateUrl: './order-list.html'
})
export class OrderList {
  protected readonly store = inject(ManufacturingStore);

  /**
   * Columns of the order table.
   */
  protected readonly columns = ['order', 'product', 'quantity', 'line', 'planned', 'status'];

  /**
   * Color of an order status chip.
   * @param status - Order status.
   */
  protected toneOf(status: string): string {
    return status === 'on-hold' ? 'chip-danger' : status === 'planned' ? 'chip-neutral' : 'chip-success';
  }
}
