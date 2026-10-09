import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Product} from '../domain/model/product.entity';
import {ProductResource, ProductsResponse} from './products-response';

/**
 * Maps product entities to and from API resources.
 */
export class ProductAssembler implements BaseAssembler<Product, ProductResource, ProductsResponse> {
  /**
   * Converts a ProductsResponse to an array of Product entities.
   * @param response - The API response containing product resources.
   * @returns An array of Product entities.
   */
  toEntitiesFromResponse = (response: ProductsResponse): Product[] =>
    response.products.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a ProductResource to a Product entity.
   * @param resource - The resource to convert.
   * @returns The converted Product entity.
   */
  toEntityFromResource = (resource: ProductResource): Product =>
    new Product({
      id: resource.id,
      code: resource.code,
      name: resource.name,
      dosageForm: resource.dosageForm,
      formulaVersion: resource.formulaVersion,
      formulaStatus: resource.formulaStatus
    });

  /**
   * Converts a Product entity to a ProductResource.
   * @param entity - The entity to convert.
   * @returns The converted ProductResource.
   */
  toResourceFromEntity = (entity: Product): ProductResource =>
    ({
      id: entity.id,
      code: entity.code,
      name: entity.name,
      dosageForm: entity.dosageForm,
      formulaVersion: entity.formulaVersion,
      formulaStatus: entity.formulaStatus
    } as ProductResource);
}
