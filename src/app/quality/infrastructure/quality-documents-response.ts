import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a quality document.
 */
export interface QualityDocumentResource extends BaseResource {
  /**
   * Unique identifier of the quality document.
   */
  id: number;
  /**
   * Document code, such as SOP-QA-014.
   */
  code: string;
  /**
   * Document title.
   */
  title: string;
  /**
   * Version number.
   */
  version: string;
  /**
   * Status of the version (draft, in-review, approved or obsolete).
   */
  status: string;
  /**
   * Author of the version.
   */
  author: string;
  /**
   * Technical reviewer.
   */
  technicalReviewer: string;
  /**
   * Quality manager who must approve the version.
   */
  approver: string;
  /**
   * Date of the change (ISO 8601).
   */
  changedAt: string;
  /**
   * Purpose section.
   */
  purpose: string;
  /**
   * Scope section.
   */
  scope: string;
  /**
   * Response procedure section.
   */
  procedure: string;
  /**
   * Summary of the revision.
   */
  revisionSummary: string;
  /**
   * Periodic review cycle in months.
   */
  reviewCycleMonths: number;
}

/**
 * Response envelope for quality document collection queries.
 */
export interface QualityDocumentsResponse extends BaseResponse {
  /**
   * Array of quality document resources included in the response.
   */
  qualityDocuments: QualityDocumentResource[];
}
