import {Component, computed, effect, inject, input, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {MonitoringStore} from '../../../application/monitoring.store';
import {TelemetryChart} from '../../components/telemetry-chart/telemetry-chart';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

/**
 * Sensor detail: telemetry, open alert and its acknowledgment, equipment calibration and response workflow.
 */
@Component({
  selector: 'app-sensor-detail',
  imports: [MatCard, MatButton, MatFormField, MatLabel, MatInput, DatePipe, ReactiveFormsModule, RouterLink, TranslatePipe, PageHeader, TelemetryChart],
  templateUrl: './sensor-detail.html',
  styleUrl: './sensor-detail.css'
})
export class SensorDetail {
  protected readonly store = inject(MonitoringStore);
  private readonly iamStore = inject(IamStore);

  /**
   * Sensor code from the route.
   */
  readonly code = input.required<string>();

  /**
   * The sensor.
   */
  protected readonly sensor = computed(() => this.store.sensors().find(sensor => sensor.code === this.code()));

  /**
   * Equipment where the sensor is installed.
   */
  protected readonly equipment = computed(() => this.store.equipment().find(item => item.code === this.sensor()?.equipmentCode));

  /**
   * Readings of the sensor.
   */
  protected readonly readings = computed(() => this.store.readingsOf(this.code())());

  /**
   * Open alert of the sensor.
   */
  protected readonly alert = computed(() => this.store.alertOfSensor(this.code())());

  /**
   * Last reading.
   */
  protected readonly lastReading = computed(() => this.readings().at(-1));

  /**
   * Whether the note was saved.
   */
  protected readonly saved = signal(false);

  /**
   * Response note of the acknowledgment.
   */
  protected readonly note = new FormControl('', {nonNullable: true, validators: [Validators.required]});

  /**
   * Fills the note with the saved response.
   */
  constructor() {
    effect(() => {
      const alert = this.alert();
      if (alert && !this.note.dirty) this.note.setValue(alert.responseNote);
    });
  }

  /**
   * Saves the response note and acknowledges the alert.
   */
  protected saveNote(): void {
    const alert = this.alert();
    if (!alert) return;
    if (this.note.invalid) {
      this.note.markAsTouched();
      return;
    }
    this.store.acknowledgeAlert(alert, this.note.value.trim(), this.iamStore.currentUser()?.fullName ?? '');
    this.note.markAsPristine();
    this.saved.set(true);
  }
}
