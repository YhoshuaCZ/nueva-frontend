import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {QualityDocument} from '../domain/model/quality-document.entity';
import {QualityDocumentResource, QualityDocumentsResponse} from './quality-documents-response';
import {QualityDocumentAssembler} from './quality-document-assembler';

/**
 * Endpoint client for quality document CRUD operations.
 */
export class QualityDocumentsApiEndpoint extends BaseApiEndpoint<QualityDocument, QualityDocumentResource, QualityDocumentsResponse, QualityDocumentAssembler> {
  /**
   * Creates an instance of QualityDocumentsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderQualityDocumentsEndpointPath}`, new QualityDocumentAssembler());
  }
}
