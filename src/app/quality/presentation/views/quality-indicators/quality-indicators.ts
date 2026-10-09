import {Component, computed, inject, signal} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

/**
 * Quality indicators: traceability completeness of closed batches and deviations by root cause and month.
 */
@Component({
  selector: 'app-quality-indicators',
  imports: [MatCard, MatButton, MatTableModule, TranslatePipe, PageHeader],
  templateUrl: './quality-indicators.html',
  styleUrl: './quality-indicators.css'
})
export class QualityIndicators {
  protected readonly store = inject(QualityStore);

  /**
   * Closed batches of the quarter.
   */
  protected readonly closedBatches = 50;

  /**
   * Gap selected in the table.
   */
  protected readonly selectedGap = signal('B-26029');

  /**
   * Months of the trend, oldest first.
   */
  protected readonly months = computed(() => [...new Set(this.store.trends().map(item => item.month))].sort());

  /**
   * Root causes of the trend.
   */
  protected readonly causes = computed(() => [...new Set(this.store.trends().map(item => item.rootCause))]);

  /**
   * Deviations closed in the quarter.
   */
  protected readonly closedDeviations = computed(() => this.store.trends().reduce((total, item) => total + item.count, 0));

  /**
   * Root causes repeated three or more times in the quarter.
   */
  protected readonly recurrent = computed(() => this.causes().filter(cause => this.totalOf(cause) >= 3));

  /**
   * Deviations of a root cause in a month.
   * @param cause - Root cause.
   * @param month - Month.
   */
  protected countOf(cause: string, month: string): number {
    return this.store.trends().find(item => item.rootCause === cause && item.month === month)?.count ?? 0;
  }

  /**
   * Deviations of a root cause in the quarter.
   * @param cause - Root cause.
   */
  protected totalOf(cause: string): number {
    return this.store.trends().filter(item => item.rootCause === cause).reduce((total, item) => total + item.count, 0);
  }

  /**
   * Exports the indicators as CSV.
   */
  protected export(): void {
    const rows = ['root_cause,month,closed_deviations', ...this.store.trends().map(item => `"${item.rootCause}",${item.month},${item.count}`)];
    const url = URL.createObjectURL(new Blob([rows.join('\n')], {type: 'text/csv'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quality-indicators.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}
