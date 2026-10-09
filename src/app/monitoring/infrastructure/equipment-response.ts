import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a equipment.
 */
export interface EquipmentResource extends BaseResource {
  /**
   * Unique identifier of the equipment.
   */
  id: number;
  /**
   * Equipment code, such as EQ-COAT-02.
   */
  code: string;
  /**
   * Type of equipment.
   */
  name: string;
  /**
   * Brand, model and serial number.
   */
  model: string;
  /**
   * Plant and line or laboratory.
   */
  location: string;
  /**
   * Calibration status (fit, due or not-fit).
   */
  calibrationStatus: string;
  /**
   * Calibration due date (ISO 8601).
   */
  calibrationDue: string;
  /**
   * Current calibration certificate.
   */
  certificate: string;
  /**
   * Next preventive maintenance (ISO 8601).
   */
  nextMaintenance: string;
  /**
   * Person responsible for maintenance.
   */
  maintenanceOwner: string;
  /**
   * Open maintenance work order, if any.
   */
  workOrder: string;
  /**
   * Short note about the current condition.
   */
  healthNote: string;
}

/**
 * Response envelope for equipment collection queries.
 */
export interface EquipmentResponse extends BaseResponse {
  /**
   * Array of equipment resources included in the response.
   */
  equipment: EquipmentResource[];
}
