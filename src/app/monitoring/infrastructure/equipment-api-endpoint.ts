import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {Equipment} from '../domain/model/equipment.entity';
import {EquipmentResource, EquipmentResponse} from './equipment-response';
import {EquipmentAssembler} from './equipment-assembler';

/**
 * Endpoint client for equipment CRUD operations.
 */
export class EquipmentApiEndpoint extends BaseApiEndpoint<Equipment, EquipmentResource, EquipmentResponse, EquipmentAssembler> {
  /**
   * Creates an instance of EquipmentApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderEquipmentEndpointPath}`, new EquipmentAssembler());
  }
}
