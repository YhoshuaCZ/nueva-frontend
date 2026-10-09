import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a formula item.
 */
export interface FormulaItemResource extends BaseResource {
  /**
   * Unique identifier of the formula item.
   */
  id: number;
  /**
   * Identifier of the master formula.
   */
  formulaId: number;
  /**
   * Kind of item (component or parameter).
   */
  kind: string;
  /**
   * Name of the component or parameter.
   */
  name: string;
  /**
   * Function of the component, such as binder.
   */
  role: string;
  /**
   * Quantity per batch or target value, with its unit.
   */
  target: string;
  /**
   * Allowed tolerance.
   */
  tolerance: string;
  /**
   * Supplier, lot or sensor that controls the item.
   */
  control: string;
}

/**
 * Response envelope for formula item collection queries.
 */
export interface FormulaItemsResponse extends BaseResponse {
  /**
   * Array of formula item resources included in the response.
   */
  formulaItems: FormulaItemResource[];
}
