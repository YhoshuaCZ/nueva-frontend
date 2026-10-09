import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Observable, retry} from 'rxjs';
import {MonitoringApi} from '../infrastructure/monitoring-api';
import {Equipment} from '../domain/model/equipment.entity';
import {Sensor} from '../domain/model/sensor.entity';
import {Reading} from '../domain/model/reading.entity';
import {Alert} from '../domain/model/alert.entity';

/**
 * Reason why equipment cannot be associated with a batch.
 */
export type AssociationRejection = 'not-fit' | 'sensor-in-use';

/**
 * Holds the equipment, the sensors, their readings and the alerts.
 */
@Injectable({providedIn: 'root'})
export class MonitoringStore {
  private readonly monitoringApi = inject(MonitoringApi);

  private readonly equipmentSignal = signal<Equipment[]>([]);
  private readonly sensorsSignal = signal<Sensor[]>([]);
  private readonly readingsSignal = signal<Reading[]>([]);
  private readonly alertsSignal = signal<Alert[]>([]);
  private readonly errorSignal = signal<string | null>(null);

  readonly equipment = this.equipmentSignal.asReadonly();
  readonly sensors = this.sensorsSignal.asReadonly();
  readonly readings = this.readingsSignal.asReadonly();
  readonly alerts = this.alertsSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  /** Alerts that are not closed, critical first. */
  readonly activeAlerts = computed(() => this.alerts()
    .filter(alert => alert.status !== 'closed')
    .sort((a, b) => Number(b.severity === 'critical') - Number(a.severity === 'critical')));

  /** Sensors that are reporting. */
  readonly onlineSensors = computed(() => this.sensors().filter(sensor => sensor.status === 'active'));

  /**
   * Creates the store and loads the monitoring data.
   */
  constructor() {
    this.load(this.monitoringApi.getEquipment(), this.equipmentSignal, 'equipment');
    this.load(this.monitoringApi.getSensors(), this.sensorsSignal, 'sensors');
    this.load(this.monitoringApi.getReadings(), this.readingsSignal, 'readings');
    this.load(this.monitoringApi.getAlerts(), this.alertsSignal, 'alerts');
  }

  /** Equipment with the given code. */
  equipmentByCode = (code: string): Signal<Equipment | undefined> => computed(() => this.equipment().find(item => item.code === code));

  /** Sensors installed on a piece of equipment. */
  sensorsOf = (equipmentCode: string): Signal<Sensor[]> => computed(() => this.sensors().filter(item => item.equipmentCode === equipmentCode));

  /** Sensor with the given code. */
  sensorByCode = (code: string): Signal<Sensor | undefined> => computed(() => this.sensors().find(item => item.code === code));

  /** Readings of a sensor, oldest first. */
  readingsOf = (sensorCode: string): Signal<Reading[]> => computed(() =>
    this.readings().filter(item => item.sensorCode === sensorCode).sort((a, b) => a.recordedAt.localeCompare(b.recordedAt)));

  /** Readings linked to a batch, newest first. */
  readingsOfBatch = (batchCode: string): Signal<Reading[]> => computed(() =>
    this.readings().filter(item => item.batchCode === batchCode).sort((a, b) => b.recordedAt.localeCompare(a.recordedAt)));

  /** Alert with the given code. */
  alertByCode = (code: string): Signal<Alert | undefined> => computed(() => this.alerts().find(item => item.code === code));

  /** Latest open alert of a sensor. */
  alertOfSensor = (sensorCode: string): Signal<Alert | undefined> => computed(() =>
    this.alerts().find(item => item.sensorCode === sensorCode && item.status !== 'closed'));

  /**
   * Whether a reading is outside the limits of its sensor.
   * @param reading - Reading to check.
   */
  isOutOfRange = (reading: Reading): boolean => {
    const sensor = this.sensors().find(item => item.code === reading.sensorCode);
    return !!sensor && (reading.value < sensor.lowerLimit || reading.value > sensor.upperLimit);
  };

  /**
   * Checks whether a piece of equipment can be associated with a batch: it must be fit for use
   * and its sensors cannot be feeding another batch in progress.
   * @param equipmentCode - Code of the equipment.
   * @param batchCode - Code of the batch.
   * @returns The reasons why it cannot be associated (empty when it can).
   */
  validateAssociation = (equipmentCode: string, batchCode: string): AssociationRejection[] => {
    const reasons: AssociationRejection[] = [];
    if (this.equipmentByCode(equipmentCode)()?.calibrationStatus === 'not-fit') reasons.push('not-fit');
    if (this.sensorsOf(equipmentCode)().some(sensor => sensor.assignedBatch && sensor.assignedBatch !== batchCode)) reasons.push('sensor-in-use');
    return reasons;
  };

  /**
   * Links the sensors of a piece of equipment to a batch, when allowed.
   * @param equipmentCode - Code of the equipment.
   * @param batchCode - Code of the batch.
   */
  associateEquipment = (equipmentCode: string, batchCode: string): void => {
    if (this.validateAssociation(equipmentCode, batchCode).length) return;
    this.sensorsOf(equipmentCode)().forEach(sensor => {
      sensor.assignedBatch = batchCode;
      this.monitoringApi.updateSensor(sensor).pipe(retry(2)).subscribe({
        next: updated => this.sensorsSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
        error: err => this.errorSignal.set(this.formatError(err, 'Failed to associate the equipment'))
      });
    });
  };

  /**
   * Registers a sensor when its ThingsBoard device ID is new.
   * @param sensor - Sensor to register.
   * @returns False when the device ID is already registered.
   */
  addSensor = (sensor: Sensor): boolean => {
    if (this.sensors().some(item => item.deviceId === sensor.deviceId)) return false;
    this.monitoringApi.createSensor(sensor).pipe(retry(2)).subscribe({
      next: created => this.sensorsSignal.update(items => [...items, created]),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to register the sensor'))
    });
    return true;
  };

  /**
   * Records a new calibration: the equipment becomes fit for use for one more year.
   * @param equipment - Calibrated equipment.
   */
  recordCalibration = (equipment: Equipment): void => {
    const due = new Date();
    due.setFullYear(due.getFullYear() + 1);
    equipment.calibrationStatus = 'fit';
    equipment.calibrationDue = due.toISOString().slice(0, 10);
    equipment.certificate = `CAL-${equipment.code.split('-').pop()}-${due.toISOString().slice(2, 4)}${due.toISOString().slice(5, 7)}`;
    this.saveEquipment(equipment);
  };

  /**
   * Records preventive maintenance: the next one is scheduled 90 days later.
   * @param equipment - Maintained equipment.
   */
  recordMaintenance = (equipment: Equipment): void => {
    const next = new Date();
    next.setDate(next.getDate() + 90);
    equipment.nextMaintenance = next.toISOString().slice(0, 10);
    equipment.workOrder = '';
    this.saveEquipment(equipment);
  };

  /**
   * Acknowledges an alert with the response note. Acknowledging does not close it.
   * @param alert - Alert to acknowledge.
   * @param note - Corrective actions taken.
   * @param userName - Who acknowledges it.
   */
  acknowledgeAlert = (alert: Alert, note: string, userName: string): void => {
    if (alert.status === 'open') {
      alert.status = 'acknowledged';
      alert.acknowledgedBy = userName;
      alert.acknowledgedAt = new Date().toISOString();
    }
    alert.responseNote = note;
    this.monitoringApi.updateAlert(alert).pipe(retry(2)).subscribe({
      next: updated => this.alertsSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to acknowledge the alert'))
    });
  };

  /**
   * Links an alert to a deviation opened by Quality.
   * @param alertCode - Code of the alert.
   * @param deviationCode - Code of the deviation.
   */
  linkDeviation = (alertCode: string, deviationCode: string): void => {
    const alert = this.alertByCode(alertCode)();
    if (!alert) return;
    alert.linkedRecord = deviationCode;
    alert.status = 'under-investigation';
    this.monitoringApi.updateAlert(alert).subscribe({
      next: updated => this.alertsSignal.update(items => items.map(item => item.id === updated.id ? updated : item))
    });
  };

  /**
   * Persists a piece of equipment and refreshes the signal.
   * @param equipment - Equipment to save.
   */
  private saveEquipment(equipment: Equipment): void {
    this.monitoringApi.updateEquipment(equipment).pipe(retry(2)).subscribe({
      next: updated => this.equipmentSignal.update(items => items.map(item => item.id === updated.id ? updated : item)),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to update the equipment'))
    });
  }

  /**
   * Loads a collection into a signal.
   * @param source - Request that returns the collection.
   * @param target - Signal that stores it.
   * @param name - Name used in the error message.
   */
  private load<T>(source: Observable<T[]>, target: WritableSignal<T[]>, name: string): void {
    source.subscribe({
      next: items => target.set(items),
      error: err => this.errorSignal.set(this.formatError(err, `Failed to load ${name}`))
    });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
