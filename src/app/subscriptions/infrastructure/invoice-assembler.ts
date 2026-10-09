import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Invoice} from '../domain/model/invoice.entity';
import {InvoiceResource, InvoicesResponse} from './invoices-response';

/**
 * Maps invoice entities to and from API resources.
 */
export class InvoiceAssembler implements BaseAssembler<Invoice, InvoiceResource, InvoicesResponse> {
  /**
   * Converts a InvoicesResponse to an array of Invoice entities.
   * @param response - The API response containing invoice resources.
   * @returns An array of Invoice entities.
   */
  toEntitiesFromResponse = (response: InvoicesResponse): Invoice[] =>
    response.invoices.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a InvoiceResource to a Invoice entity.
   * @param resource - The resource to convert.
   * @returns The converted Invoice entity.
   */
  toEntityFromResource = (resource: InvoiceResource): Invoice =>
    new Invoice({
      id: resource.id,
      subscriptionId: resource.subscriptionId,
      number: resource.number,
      issuedAt: resource.issuedAt,
      amount: resource.amount,
      status: resource.status
    });

  /**
   * Converts a Invoice entity to a InvoiceResource.
   * @param entity - The entity to convert.
   * @returns The converted InvoiceResource.
   */
  toResourceFromEntity = (entity: Invoice): InvoiceResource =>
    ({
      id: entity.id,
      subscriptionId: entity.subscriptionId,
      number: entity.number,
      issuedAt: entity.issuedAt,
      amount: entity.amount,
      status: entity.status
    } as InvoiceResource);
}
