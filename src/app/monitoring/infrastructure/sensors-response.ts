import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a sensor.
 */
export interface SensorResource extends BaseResource {
  /**
   * Unique identifier of the sensor.
   */
  id: number;
  /**
   * Sensor code, such as T-204.
   */
  code: string;
  /**
   * ThingsBoard device identifier.
   */
  deviceId: string;
  /**
   * Measured variable (temperature, humidity or pressure).
   */
  type: string;
  /**
   * Unit of the readings.
   */
  unit: string;
  /**
   * Code of the equipment where the sensor is installed.
   */
  equipmentCode: string;
  /**
   * Lower acceptable limit.
   */
  lowerLimit: number;
  /**
   * Upper acceptable limit.
   */
  upperLimit: number;
  /**
   * Status (active or offline).
   */
  status: string;
  /**
   * Batch in progress that receives the readings, if any.
   */
  assignedBatch: string;
}

/**
 * Response envelope for sensor collection queries.
 */
export interface SensorsResponse extends BaseResponse {
  /**
   * Array of sensor resources included in the response.
   */
  sensors: SensorResource[];
}
