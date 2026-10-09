import {Component, computed, inject, input, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {AssociationRejection, MonitoringStore} from '../../../application/monitoring.store';
import {TelemetryChart} from '../../components/telemetry-chart/telemetry-chart';
import {ManufacturingStore} from '../../../../manufacturing/application/manufacturing.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

/**
 * IoT evidence of a batch: equipment association, critical variables and the readings captured automatically.
 */
@Component({
  selector: 'app-batch-iot-evidence',
  imports: [MatTableModule, MatCard, MatButton, MatIcon, DatePipe, RouterLink, TranslatePipe, PageHeader, TelemetryChart],
  templateUrl: './batch-iot-evidence.html',
  styleUrl: './batch-iot-evidence.css'
})
export class BatchIotEvidence {
  protected readonly store = inject(MonitoringStore);
  protected readonly manufacturingStore = inject(ManufacturingStore);

  /**
   * Batch code from the route.
   */
  readonly code = input.required<string>();

  /**
   * The batch.
   */
  protected readonly batch = computed(() => this.manufacturingStore.batches().find(batch => batch.code === this.code()));

  /**
   * Reasons why the last association was rejected, by equipment code.
   */
  protected readonly rejections = signal<Record<string, AssociationRejection[]>>({});

  /**
   * Readings linked to the batch.
   */
  protected readonly readings = computed(() => this.store.readingsOfBatch(this.code())());

  /**
   * Whether every reading is listed, or only the latest ones.
   */
  protected readonly showAll = signal(false);

  /**
   * Readings listed in the table.
   */
  protected readonly listedReadings = computed(() => this.showAll() ? this.readings() : this.readings().slice(0, 8));

  /**
   * Listed readings with their sensor and whether they are out of range.
   */
  protected readonly evidenceRows = computed(() => this.listedReadings()
    .map(reading => ({reading, sensor: this.store.sensorByCode(reading.sensorCode)(), outOfRange: this.store.isOutOfRange(reading)}))
    .filter(row => row.sensor));

  /**
   * Columns of the readings table.
   */
  protected readonly evidenceColumns = ['timestamp', 'sensor', 'variable', 'value', 'limits', 'source', 'result'];

  /**
   * Main sensor of the batch: the first one with readings.
   */
  protected readonly mainSensor = computed(() => {
    const code = [...this.readings()].reverse()[0]?.sensorCode;
    return this.store.sensors().find(sensor => sensor.code === code);
  });

  /**
   * Readings of the main sensor, oldest first.
   */
  protected readonly mainReadings = computed(() =>
    this.readings().filter(reading => reading.sensorCode === this.mainSensor()?.code).reverse());

  /**
   * Open alert raised during the batch.
   */
  protected readonly alert = computed(() =>
    this.store.alerts().find(alert => alert.batchCode === this.code() && alert.status !== 'closed'));

  /**
   * Whether a piece of equipment feeds this batch.
   * @param equipmentCode - Code of the equipment.
   */
  protected isAssociated(equipmentCode: string): boolean {
    return this.store.sensorsOf(equipmentCode)().some(sensor => sensor.assignedBatch === this.code());
  }

  /**
   * Batch that is using the sensors of a piece of equipment, if it is another one.
   * @param equipmentCode - Code of the equipment.
   */
  protected busyWith(equipmentCode: string): string | undefined {
    return this.store.sensorsOf(equipmentCode)().find(sensor => sensor.assignedBatch && sensor.assignedBatch !== this.code())?.assignedBatch;
  }

  /**
   * Associates a piece of equipment, or shows why it cannot be associated.
   * @param equipmentCode - Code of the equipment.
   */
  protected associate(equipmentCode: string): void {
    const reasons = this.store.validateAssociation(equipmentCode, this.code());
    this.rejections.update(all => ({...all, [equipmentCode]: reasons}));
    if (!reasons.length) this.store.associateEquipment(equipmentCode, this.code());
  }

  /**
   * Codes of the sensors of a piece of equipment.
   * @param equipmentCode - Code of the equipment.
   */
  protected sensorCodes(equipmentCode: string): string {
    return this.store.sensorsOf(equipmentCode)().map(sensor => sensor.code).join(' · ') || '—';
  }
}
