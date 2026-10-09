import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Invoice} from '../domain/model/invoice.entity';
import {InvoiceResource, InvoicesResponse} from './invoices-response';
import {InvoiceAssembler} from './invoice-assembler';

/**
 * Endpoint client for invoice CRUD operations.
 */
export class InvoicesApiEndpoint extends BaseApiEndpoint<Invoice, InvoiceResource, InvoicesResponse, InvoiceAssembler> {
  /**
   * Creates an instance of InvoicesApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderInvoicesEndpointPath}`, new InvoiceAssembler());
  }
}
