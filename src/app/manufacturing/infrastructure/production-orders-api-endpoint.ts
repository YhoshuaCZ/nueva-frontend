import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {ProductionOrder} from '../domain/model/production-order.entity';
import {ProductionOrderResource, ProductionOrdersResponse} from './production-orders-response';
import {ProductionOrderAssembler} from './production-order-assembler';

/**
 * Endpoint client for production order CRUD operations.
 */
export class ProductionOrdersApiEndpoint extends BaseApiEndpoint<ProductionOrder, ProductionOrderResource, ProductionOrdersResponse, ProductionOrderAssembler> {
  /**
   * Creates an instance of ProductionOrdersApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderProductionOrdersEndpointPath}`, new ProductionOrderAssembler());
  }
}
