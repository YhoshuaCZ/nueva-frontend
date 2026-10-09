import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a master formula.
 */
export interface MasterFormulaResource extends BaseResource {
  /**
   * Unique identifier of the master formula.
   */
  id: number;
  /**
   * Code of the product.
   */
  productCode: string;
  /**
   * Version of the formula, such as v3.2.
   */
  version: string;
  /**
   * Status of the version (approved or draft).
   */
  status: string;
  /**
   * Quality manager who approved the version.
   */
  approvedBy: string;
  /**
   * Approval date (ISO 8601).
   */
  approvedAt: string;
  /**
   * Standard batch size in units.
   */
  batchSize: number;
}

/**
 * Response envelope for master formula collection queries.
 */
export interface MasterFormulasResponse extends BaseResponse {
  /**
   * Array of master formula resources included in the response.
   */
  masterFormulas: MasterFormulaResource[];
}
