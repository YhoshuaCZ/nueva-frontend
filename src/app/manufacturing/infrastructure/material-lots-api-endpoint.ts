import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {MaterialLot} from '../domain/model/material-lot.entity';
import {MaterialLotResource, MaterialLotsResponse} from './material-lots-response';
import {MaterialLotAssembler} from './material-lot-assembler';

/**
 * Endpoint client for material lot CRUD operations.
 */
export class MaterialLotsApiEndpoint extends BaseApiEndpoint<MaterialLot, MaterialLotResource, MaterialLotsResponse, MaterialLotAssembler> {
  /**
   * Creates an instance of MaterialLotsApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderMaterialLotsEndpointPath}`, new MaterialLotAssembler());
  }
}
