import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Equipment} from '../domain/model/equipment.entity';
import {Sensor} from '../domain/model/sensor.entity';
import {Reading} from '../domain/model/reading.entity';
import {Alert} from '../domain/model/alert.entity';
import {EquipmentApiEndpoint} from './equipment-api-endpoint';
import {SensorsApiEndpoint} from './sensors-api-endpoint';
import {ReadingsApiEndpoint} from './readings-api-endpoint';
import {AlertsApiEndpoint} from './alerts-api-endpoint';

/**
 * Infrastructure facade for the IoT Monitoring endpoints. Readings come from ThingsBoard through the DoofPlus Platform.
 */
@Injectable({providedIn: 'root'})
export class MonitoringApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly equipmentEndpoint = new EquipmentApiEndpoint(this.http);
  private readonly sensorsEndpoint = new SensorsApiEndpoint(this.http);
  private readonly readingsEndpoint = new ReadingsApiEndpoint(this.http);
  private readonly alertsEndpoint = new AlertsApiEndpoint(this.http);

  /** Retrieves the equipment inventory. */
  getEquipment = (): Observable<Equipment[]> => this.equipmentEndpoint.getAll();

  /** Updates a piece of equipment. */
  updateEquipment = (equipment: Equipment): Observable<Equipment> => this.equipmentEndpoint.update(equipment, equipment.id);

  /** Retrieves the sensors. */
  getSensors = (): Observable<Sensor[]> => this.sensorsEndpoint.getAll();

  /** Registers a sensor. */
  createSensor = (sensor: Sensor): Observable<Sensor> => this.sensorsEndpoint.create(sensor);

  /** Updates a sensor. */
  updateSensor = (sensor: Sensor): Observable<Sensor> => this.sensorsEndpoint.update(sensor, sensor.id);

  /** Retrieves the readings. */
  getReadings = (): Observable<Reading[]> => this.readingsEndpoint.getAll();

  /** Retrieves the alerts. */
  getAlerts = (): Observable<Alert[]> => this.alertsEndpoint.getAll();

  /** Updates an alert. */
  updateAlert = (alert: Alert): Observable<Alert> => this.alertsEndpoint.update(alert, alert.id);
}
