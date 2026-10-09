import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a production order.
 */
export interface ProductionOrderResource extends BaseResource {
  /**
   * Unique identifier of the production order.
   */
  id: number;
  /**
   * Order code, such as PO-26041.
   */
  code: string;
  /**
   * Code of the product.
   */
  productCode: string;
  /**
   * Identifier of the master formula used.
   */
  formulaId: number;
  /**
   * Code of the batch produced by the order.
   */
  batchCode: string;
  /**
   * Planned quantity in units.
   */
  plannedQuantity: number;
  /**
   * Manufacturing line.
   */
  line: string;
  /**
   * Status of the order (planned, approved, in-progress, on-hold or completed).
   */
  status: string;
  /**
   * Planned start (ISO 8601).
   */
  plannedStart: string;
  /**
   * Planned end (ISO 8601).
   */
  plannedEnd: string;
}

/**
 * Response envelope for production order collection queries.
 */
export interface ProductionOrdersResponse extends BaseResponse {
  /**
   * Array of production order resources included in the response.
   */
  productionOrders: ProductionOrderResource[];
}
