import {HttpClient} from '@angular/common/http';
import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {environment} from '../../../environments/environment';
import {MasterFormula} from '../domain/model/master-formula.entity';
import {MasterFormulaResource, MasterFormulasResponse} from './master-formulas-response';
import {MasterFormulaAssembler} from './master-formula-assembler';

/**
 * Endpoint client for master formula CRUD operations.
 */
export class MasterFormulasApiEndpoint extends BaseApiEndpoint<MasterFormula, MasterFormulaResource, MasterFormulasResponse, MasterFormulaAssembler> {
  /**
   * Creates an instance of MasterFormulasApiEndpoint.
   * @param http - The HttpClient to be used for making API requests.
   */
  constructor(http: HttpClient) {
    super(http, `${environment.platformProviderApiBaseUrl}${environment.platformProviderMasterFormulasEndpointPath}`, new MasterFormulaAssembler());
  }
}
