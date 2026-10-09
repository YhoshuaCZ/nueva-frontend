import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {FormulaItem} from '../domain/model/formula-item.entity';
import {FormulaItemResource, FormulaItemsResponse} from './formula-items-response';
import {FormulaItemAssembler} from './formula-item-assembler';

/**
 * Endpoint client for formula item CRUD operations.
 */
export class FormulaItemsApiEndpoint extends BaseApiEndpoint<FormulaItem, FormulaItemResource, FormulaItemsResponse, FormulaItemAssembler> {
  /**
   * Creates an instance of FormulaItemsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderFormulaItemsEndpointPath}`, new FormulaItemAssembler());
  }
}
