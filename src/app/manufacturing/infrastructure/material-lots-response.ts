import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource representation of a material lot.
 */
export interface MaterialLotResource extends BaseResource {
  /**
   * Unique identifier of the material lot.
   */
  id: number;
  /**
   * Internal lot code, such as RM-26104.
   */
  code: string;
  /**
   * Receipt code, such as RCV-26104.
   */
  receiptCode: string;
  /**
   * Material name.
   */
  material: string;
  /**
   * Category (api, excipient or packaging).
   */
  category: string;
  /**
   * Supplier name.
   */
  supplier: string;
  /**
   * Lot code of the supplier.
   */
  supplierLot: string;
  /**
   * Quantity received and packaging.
   */
  quantity: string;
  /**
   * Expiry date (ISO 8601).
   */
  expiryDate: string;
  /**
   * Storage location.
   */
  storageLocation: string;
  /**
   * File name of the certificate of analysis.
   */
  certificate: string;
  /**
   * Disposition (quarantine, sampling, inspection, approved or rejected).
   */
  status: string;
  /**
   * Whether the packaging was verified.
   */
  packagingVerified: boolean;
  /**
   * Whether identity and labeling were verified.
   */
  identityVerified: boolean;
  /**
   * QC sampling status (pending, requested or done).
   */
  samplingStatus: string;
  /**
   * Batch the lot is allocated to, if any.
   */
  allocatedBatch: string;
}

/**
 * Response envelope for material lot collection queries.
 */
export interface MaterialLotsResponse extends BaseResponse {
  /**
   * Array of material lot resources included in the response.
   */
  materialLots: MaterialLotResource[];
}
