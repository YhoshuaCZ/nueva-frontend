import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a product.
 */
export interface ProductResource extends BaseResource {
  /**
   * Unique identifier of the product.
   */
  id: number;
  /**
   * Unique product code, such as AC500.
   */
  code: string;
  /**
   * Product name and strength.
   */
  name: string;
  /**
   * Dosage form (tablet, capsule...).
   */
  dosageForm: string;
  /**
   * Version of the current master formula, or empty.
   */
  formulaVersion: string;
  /**
   * Status of the current master formula (approved, pending or none).
   */
  formulaStatus: string;
}

/**
 * Response envelope for product collection queries.
 */
export interface ProductsResponse extends BaseResponse {
  /**
   * Array of product resources included in the response.
   */
  products: ProductResource[];
}
