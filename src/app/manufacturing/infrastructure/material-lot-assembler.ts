import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {MaterialLot} from '../domain/model/material-lot.entity';
import {MaterialLotResource, MaterialLotsResponse} from './material-lots-response';

/**
 * Maps material lot entities to and from API resources.
 */
export class MaterialLotAssembler implements BaseAssembler<MaterialLot, MaterialLotResource, MaterialLotsResponse> {
  /**
   * Converts a MaterialLotsResponse to an array of MaterialLot entities.
   * @param response - The API response containing material lot resources.
   * @returns An array of MaterialLot entities.
   */
  toEntitiesFromResponse = (response: MaterialLotsResponse): MaterialLot[] =>
    response.materialLots.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a MaterialLotResource to a MaterialLot entity.
   * @param resource - The resource to convert.
   * @returns The converted MaterialLot entity.
   */
  toEntityFromResource = (resource: MaterialLotResource): MaterialLot =>
    new MaterialLot({
      id: resource.id,
      code: resource.code,
      receiptCode: resource.receiptCode,
      material: resource.material,
      category: resource.category,
      supplier: resource.supplier,
      supplierLot: resource.supplierLot,
      quantity: resource.quantity,
      expiryDate: resource.expiryDate,
      storageLocation: resource.storageLocation,
      certificate: resource.certificate,
      status: resource.status,
      packagingVerified: resource.packagingVerified,
      identityVerified: resource.identityVerified,
      samplingStatus: resource.samplingStatus,
      allocatedBatch: resource.allocatedBatch
    });

  /**
   * Converts a MaterialLot entity to a MaterialLotResource.
   * @param entity - The entity to convert.
   * @returns The converted MaterialLotResource.
   */
  toResourceFromEntity = (entity: MaterialLot): MaterialLotResource =>
    ({
      id: entity.id,
      code: entity.code,
      receiptCode: entity.receiptCode,
      material: entity.material,
      category: entity.category,
      supplier: entity.supplier,
      supplierLot: entity.supplierLot,
      quantity: entity.quantity,
      expiryDate: entity.expiryDate,
      storageLocation: entity.storageLocation,
      certificate: entity.certificate,
      status: entity.status,
      packagingVerified: entity.packagingVerified,
      identityVerified: entity.identityVerified,
      samplingStatus: entity.samplingStatus,
      allocatedBatch: entity.allocatedBatch
    } as MaterialLotResource);
}
