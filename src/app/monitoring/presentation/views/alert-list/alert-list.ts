import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {MonitoringStore} from '../../../application/monitoring.store';

/**
 * Incidents: every IoT alert with its severity, status and linked record.
 */
@Component({
  selector: 'app-alert-list',
  imports: [DatePipe, RouterLink, TranslatePipe, MatCard, MatIcon, MatTableModule, MatTabNav, MatTabLink, MatTabNavPanel, PageHeader],
  templateUrl: './alert-list.html'
})
export class AlertList {
  protected readonly store = inject(MonitoringStore);

  /**
   * Columns of the incident table.
   */
  protected readonly columns = ['alert', 'what', 'severity', 'status', 'linked'];

  /**
   * Whether closed alerts are shown.
   */
  protected readonly showClosed = signal(false);

  /**
   * Alerts shown in the table.
   */
  protected readonly visible = computed(() => this.showClosed() ? this.store.alerts() : this.store.activeAlerts());
}
