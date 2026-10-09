import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {QualityDocument} from '../domain/model/quality-document.entity';
import {QualityDocumentResource, QualityDocumentsResponse} from './quality-documents-response';

/**
 * Maps quality document entities to and from API resources.
 */
export class QualityDocumentAssembler implements BaseAssembler<QualityDocument, QualityDocumentResource, QualityDocumentsResponse> {
  /**
   * Converts a QualityDocumentsResponse to an array of QualityDocument entities.
   * @param response - The API response containing quality document resources.
   * @returns An array of QualityDocument entities.
   */
  toEntitiesFromResponse = (response: QualityDocumentsResponse): QualityDocument[] =>
    response.qualityDocuments.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a QualityDocumentResource to a QualityDocument entity.
   * @param resource - The resource to convert.
   * @returns The converted QualityDocument entity.
   */
  toEntityFromResource = (resource: QualityDocumentResource): QualityDocument =>
    new QualityDocument({
      id: resource.id,
      code: resource.code,
      title: resource.title,
      version: resource.version,
      status: resource.status,
      author: resource.author,
      technicalReviewer: resource.technicalReviewer,
      approver: resource.approver,
      changedAt: resource.changedAt,
      purpose: resource.purpose,
      scope: resource.scope,
      procedure: resource.procedure,
      revisionSummary: resource.revisionSummary,
      reviewCycleMonths: resource.reviewCycleMonths
    });

  /**
   * Converts a QualityDocument entity to a QualityDocumentResource.
   * @param entity - The entity to convert.
   * @returns The converted QualityDocumentResource.
   */
  toResourceFromEntity = (entity: QualityDocument): QualityDocumentResource =>
    ({
      id: entity.id,
      code: entity.code,
      title: entity.title,
      version: entity.version,
      status: entity.status,
      author: entity.author,
      technicalReviewer: entity.technicalReviewer,
      approver: entity.approver,
      changedAt: entity.changedAt,
      purpose: entity.purpose,
      scope: entity.scope,
      procedure: entity.procedure,
      revisionSummary: entity.revisionSummary,
      reviewCycleMonths: entity.reviewCycleMonths
    } as QualityDocumentResource);
}
