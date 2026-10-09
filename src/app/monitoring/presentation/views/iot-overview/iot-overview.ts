import {Component, computed, inject, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {MonitoringStore} from '../../../application/monitoring.store';
import {TelemetryChart} from '../../components/telemetry-chart/telemetry-chart';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * IoT overview: sensor and equipment health, live telemetry, alert queue and monitoring rules.
 */
@Component({
  selector: 'app-iot-overview',
  imports: [MatFormField, MatCard, MatButton, MatIcon, MatTableModule, MatSelect, MatOption, RouterLink, TranslatePipe, PageHeader, TelemetryChart],
  templateUrl: './iot-overview.html',
  styleUrl: './iot-overview.css'
})
export class IotOverview {
  protected readonly store = inject(MonitoringStore);

  /**
   * Sensor shown in the live chart.
   */
  protected readonly sensorCode = signal('T-204');

  /**
   * Sensor shown in the live chart.
   */
  protected readonly sensor = computed(() => this.store.sensors().find(sensor => sensor.code === this.sensorCode()));

  /**
   * Readings of the sensor shown.
   */
  protected readonly readings = computed(() => this.store.readingsOf(this.sensorCode())());

  /**
   * Last reading of the sensor shown.
   */
  protected readonly lastReading = computed(() => this.readings().at(-1));

  /**
   * Number of active critical alerts.
   */
  protected readonly criticalCount = computed(() => this.store.activeAlerts().filter(alert => alert.severity === 'critical').length);

  /**
   * Color of the alert status chip.
   * @param status - Alert status.
   */
  protected statusTone(status: string): string {
    return ({open: 'chip-info', acknowledged: 'chip-teal', 'under-investigation': 'chip-purple', closed: 'chip-success'} as Record<string, string>)[status] ?? 'chip-neutral';
  }
}
