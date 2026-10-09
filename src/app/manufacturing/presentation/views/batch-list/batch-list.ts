import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe, DecimalPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatDialog} from '@angular/material/dialog';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {BatchForm} from '../batch-form/batch-form';

/**
 * Filters of the batch list.
 */
type BatchFilter = 'all' | 'in-progress' | 'on-hold' | 'released';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [
    DatePipe, DecimalPipe, ReactiveFormsModule, RouterLink, TranslatePipe,
    MatCard, MatButton, MatIcon, MatTableModule, MatTabNav, MatTabLink, MatTabNavPanel, MatFormField, MatInput,
    PageHeader
  ],
  templateUrl: './batch-list.html',
  styleUrl: './batch-list.css'
})
/**
 * Batch list with status counts, a summary of the selected batch, a lookup and the "create batch" dialog.
 */
export class BatchList {
  protected readonly store = inject(ManufacturingStore);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);

  /**
   * Filter tabs.
   */
  protected readonly filters: BatchFilter[] = ['all', 'in-progress', 'on-hold', 'released'];

  /**
   * Columns of the batch table.
   */
  protected readonly columns = ['batch', 'order', 'owner', 'status'];

  /**
   * Selected filter tab.
   */
  protected readonly filter = signal<BatchFilter>('all');

  /**
   * Code of the batch shown in the side panel.
   */
  protected readonly selectedCode = signal('B-26041');

  /**
   * Batches that match the filter, newest code first.
   */
  protected readonly visibleBatches = computed(() => {
    const filter = this.filter();
    return [...this.store.batches()]
      .filter(batch => filter === 'all' || batch.status === filter)
      .sort((a, b) => b.code.localeCompare(a.code));
  });

  /**
   * Batch shown in the side panel.
   */
  protected readonly selected = computed(() => this.store.batches().find(batch => batch.code === this.selectedCode()));

  /**
   * Batch lookup code.
   */
  protected readonly lookup = new FormControl('B-26041', {nonNullable: true});

  /**
   * Whether the lookup found nothing.
   */
  protected readonly notFound = signal(false);

  /**
   * Color of a batch status chip.
   * @param status - Batch status.
   */
  protected toneOf(status: string): string {
    return ({'on-hold': 'chip-warning', 'in-progress': 'chip-teal', 'release-requested': 'chip-success', released: 'chip-success'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Opens the batch typed in the lookup.
   */
  protected search(): void {
    const code = this.lookup.value.trim().toUpperCase();
    const found = this.store.batches().some(batch => batch.code === code);
    this.notFound.set(!found);
    if (found) this.router.navigate(['/production/batches', code]).then();
  }

  /**
   * Opens the create batch dialog and selects the new batch.
   */
  protected openCreate(): void {
    this.dialog.open(BatchForm, {width: '560px', maxWidth: 'calc(100vw - 32px)'})
      .afterClosed().subscribe(code => {
        if (code) this.selectedCode.set(code);
      });
  }
}
