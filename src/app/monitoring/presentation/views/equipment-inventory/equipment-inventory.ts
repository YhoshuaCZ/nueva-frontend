import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {MonitoringStore} from '../../../application/monitoring.store';
import {Sensor} from '../../../domain/model/sensor.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Units and default limits of each sensor type.
 */
const SENSOR_TYPES: Record<string, { unit: string; lower: number; upper: number; prefix: string }> = {
  temperature: {unit: '°C', lower: 18, upper: 25, prefix: 'T'},
  humidity: {unit: '%RH', lower: 0, upper: 55, prefix: 'H'},
  pressure: {unit: 'Pa', lower: 10, upper: 15, prefix: 'P'}
};

/**
 * Equipment inventory, the IoT sensors of the selected equipment, sensor registration,
 * and the calibration and preventive maintenance of equipment that needs attention.
 */
@Component({
  selector: 'app-equipment-inventory',
  imports: [MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DatePipe, ReactiveFormsModule, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './equipment-inventory.html',
  styleUrl: './equipment-inventory.css'
})
export class EquipmentInventory {
  protected readonly store = inject(MonitoringStore);
  protected readonly sensorTypes = Object.keys(SENSOR_TYPES);

  /**
   * Equipment whose sensors are shown.
   */
  protected readonly selectedCode = signal('EQ-COAT-02');

  /**
   * Sensors of the selected equipment.
   */
  protected readonly sensors = computed(() => this.store.sensorsOf(this.selectedCode())());

  /**
   * First piece of equipment that is not fit for use, shown in the calibration and maintenance cards.
   */
  protected readonly attention = computed(() => this.store.equipment().find(item => item.calibrationStatus === 'not-fit')
    ?? this.store.equipment().find(item => item.calibrationStatus === 'due'));

  /**
   * Whether the device ID entered is already registered.
   */
  protected readonly duplicateDevice = signal(false);

  /**
   * Sensor registration form.
   */
  protected readonly form = new FormGroup({
    deviceId: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^tb-[\w-]+$/)]}),
    type: new FormControl('temperature', {nonNullable: true}),
    equipmentCode: new FormControl('EQ-COAT-02', {nonNullable: true})
  });

  /**
   * Color of a calibration status chip.
   * @param status - Calibration status.
   */
  protected calibrationTone(status: string): string {
    return status === 'fit' ? 'chip-success' : status === 'due' ? 'chip-warning' : 'chip-danger';
  }

  /**
   * Registers the sensor when the ThingsBoard device ID is new.
   */
  protected registerSensor(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const type = SENSOR_TYPES[value.type];
    const number = 100 + this.store.sensors().length + 1;
    const added = this.store.addSensor(new Sensor({
      id: 0, code: `${type.prefix}-${number}`, deviceId: value.deviceId.trim(), type: value.type, unit: type.unit,
      equipmentCode: value.equipmentCode, lowerLimit: type.lower, upperLimit: type.upper, status: 'active', assignedBatch: ''
    }));
    this.duplicateDevice.set(!added);
    if (added) {
      this.selectedCode.set(value.equipmentCode);
      this.form.controls.deviceId.reset();
    }
  }
}
