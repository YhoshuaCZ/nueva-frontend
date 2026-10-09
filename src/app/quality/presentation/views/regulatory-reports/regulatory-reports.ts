import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {RegulatoryReport} from '../../../domain/model/regulatory-report.entity';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

/**
 * Regulatory reports: report library, configuration and the evidence completeness of a batch dossier.
 */
@Component({
  selector: 'app-regulatory-reports',
  imports: [MatCard, MatButton, MatTableModule, DatePipe, TranslatePipe, PageHeader],
  templateUrl: './regulatory-reports.html',
  styleUrl: './regulatory-reports.css'
})
export class RegulatoryReports {
  protected readonly store = inject(QualityStore);
  private readonly iamStore = inject(IamStore);

  /**
   * Code of the selected report.
   */
  protected readonly selectedCode = signal('RPT-26012');

  /**
   * Selected report.
   */
  protected readonly selected = computed(() => this.store.reports().find(report => report.code === this.selectedCode()));

  /**
   * Evidence of the batch dossier, derived from the quality records of the batch.
   */
  protected readonly dossier = computed(() => {
    const batch = this.selected()?.scope ?? '';
    const results = this.store.resultsOf(batch)();
    const deviations = this.store.deviations().filter(item => item.batchCode === batch);
    return [
      {key: 'genealogy', state: 'linked', tone: 'chip-success'},
      {key: 'analytical', state: results.every(r => r.approval === 'approved') && results.length ? 'approved' : 'approval-pending', tone: 'chip-warning'},
      {key: 'deviation', state: deviations.every(d => d.status === 'dispositioned' || d.status === 'closed') ? 'approved' : 'missing-approval', tone: 'chip-danger'},
      {key: 'certificate', state: 'not-available', tone: 'chip-neutral'}
    ];
  });

  /**
   * Color of a report status chip.
   * @param status - Report status.
   */
  protected toneOf(status: string): string {
    return ({blocked: 'chip-danger', approved: 'chip-success', draft: 'chip-neutral'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Creates a batch dossier draft for the batch on hold.
   */
  protected createReport(): void {
    const code = this.store.nextCode('RPT', this.store.reports().map(report => report.code));
    this.store.addReport(new RegulatoryReport({
      id: 0, code, type: 'Batch dossier', scope: 'B-26042', owner: this.iamStore.currentUser()?.fullName ?? '', status: 'draft',
      template: 'Batch release dossier v1.2', format: 'PDF package + CSV appendix', createdAt: new Date().toISOString().slice(0, 10)
    }));
    this.selectedCode.set(code);
  }
}
