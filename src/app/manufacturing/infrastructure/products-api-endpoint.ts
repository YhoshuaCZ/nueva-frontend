import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Product} from '../domain/model/product.entity';
import {ProductResource, ProductsResponse} from './products-response';
import {ProductAssembler} from './product-assembler';

/**
 * Endpoint client for product CRUD operations.
 */
export class ProductsApiEndpoint extends BaseApiEndpoint<Product, ProductResource, ProductsResponse, ProductAssembler> {
  /**
   * Creates an instance of ProductsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderProductsEndpointPath}`, new ProductAssembler());
  }
}
