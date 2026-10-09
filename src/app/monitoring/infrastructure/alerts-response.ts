import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a alert.
 */
export interface AlertResource extends BaseResource {
  /**
   * Unique identifier of the alert.
   */
  id: number;
  /**
   * Alert code, such as ALT-26031.
   */
  code: string;
  /**
   * Code of the sensor.
   */
  sensorCode: string;
  /**
   * Code or name of the equipment.
   */
  equipmentCode: string;
  /**
   * Severity (critical or warning).
   */
  severity: string;
  /**
   * Status (open, acknowledged, under-investigation or closed).
   */
  status: string;
  /**
   * Short description.
   */
  title: string;
  /**
   * What happened, with values and times.
   */
  detail: string;
  /**
   * Affected batch, if any.
   */
  batchCode: string;
  /**
   * Who acknowledged the alert.
   */
  acknowledgedBy: string;
  /**
   * When it was acknowledged (ISO 8601).
   */
  acknowledgedAt: string;
  /**
   * Corrective actions taken.
   */
  responseNote: string;
  /**
   * Linked incident or deviation.
   */
  linkedRecord: string;
}

/**
 * Response envelope for alert collection queries.
 */
export interface AlertsResponse extends BaseResponse {
  /**
   * Array of alert resources included in the response.
   */
  alerts: AlertResource[];
}
