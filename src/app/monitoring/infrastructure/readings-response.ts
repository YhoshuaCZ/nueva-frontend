import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a reading.
 */
export interface ReadingResource extends BaseResource {
  /**
   * Unique identifier of the reading.
   */
  id: number;
  /**
   * Code of the sensor.
   */
  sensorCode: string;
  /**
   * Batch the reading is linked to, if any.
   */
  batchCode: string;
  /**
   * Measured value.
   */
  value: number;
  /**
   * Time of the reading (ISO 8601).
   */
  recordedAt: string;
  /**
   * Source of the reading.
   */
  source: string;
}

/**
 * Response envelope for reading collection queries.
 */
export interface ReadingsResponse extends BaseResponse {
  /**
   * Array of reading resources included in the response.
   */
  readings: ReadingResource[];
}
