import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField, MatPrefix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Audit trail: attributed record events with before/after values and a controlled CSV export.
 */
@Component({
  selector: 'app-audit-trail',
  imports: [MatFormField, MatPrefix, MatInput, MatIcon, MatCard, MatButton, MatTableModule, MatSelect, MatOption, DatePipe, TranslatePipe, PageHeader],
  templateUrl: './audit-trail.html',
  styleUrl: './audit-trail.css'
})
export class AuditTrail {
  /**
   * Columns of the change table of the selected event.
   */
  protected readonly changeColumns = ['field', 'before', 'after', 'reason'];

  protected readonly store = inject(QualityStore);

  /**
   * Record filter.
   */
  protected readonly recordFilter = signal('');

  /**
   * Actor filter.
   */
  protected readonly actorFilter = signal('');

  /**
   * Events that match the filters.
   */
  protected readonly visible = computed(() => this.store.events().filter(event =>
    event.record.toLowerCase().includes(this.recordFilter().toLowerCase())
    && event.actor.toLowerCase().includes(this.actorFilter().toLowerCase())));

  /**
   * Code of the selected event.
   */
  protected readonly selectedCode = signal<string | null>(null);

  /**
   * Selected event: the chosen one or the first with a field change.
   */
  protected readonly selected = computed(() =>
    this.visible().find(event => event.eventCode === this.selectedCode()) ?? this.visible().find(event => event.field));

  /**
   * Distinct actors, for the actor filter.
   */
  protected readonly actors = computed(() => [...new Set(this.store.events().map(event => event.actor))]);

  /**
   * Downloads the filtered events as CSV and records the export in the audit trail.
   */
  protected exportCsv(): void {
    const header = 'event,utc,actor,role,event_type,record,result';
    const rows = this.visible().map(e => [e.eventCode, e.occurredAt, e.actor, e.actorRole, e.event, e.record, e.result]
      .map(value => `"${String(value).replace(/"/g, '""')}"`).join(','));
    const url = URL.createObjectURL(new Blob([[header, ...rows].join('\n')], {type: 'text/csv'}));
    const link = document.createElement('a');
    link.href = url;
    link.download = `audit-trail-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    this.store.log('Audit trail exported', `${this.visible().length} events`, 'Exported');
  }

  /**
   * Clears the filters.
   */
  protected clearFilters(): void {
    this.recordFilter.set('');
    this.actorFilter.set('');
  }
}
