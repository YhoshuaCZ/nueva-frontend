import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {MasterFormula} from '../domain/model/master-formula.entity';
import {MasterFormulaResource, MasterFormulasResponse} from './master-formulas-response';

/**
 * Maps master formula entities to and from API resources.
 */
export class MasterFormulaAssembler implements BaseAssembler<MasterFormula, MasterFormulaResource, MasterFormulasResponse> {
  /**
   * Converts a MasterFormulasResponse to an array of MasterFormula entities.
   * @param response - The API response containing master formula resources.
   * @returns An array of MasterFormula entities.
   */
  toEntitiesFromResponse = (response: MasterFormulasResponse): MasterFormula[] =>
    response.masterFormulas.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a MasterFormulaResource to a MasterFormula entity.
   * @param resource - The resource to convert.
   * @returns The converted MasterFormula entity.
   */
  toEntityFromResource = (resource: MasterFormulaResource): MasterFormula =>
    new MasterFormula({
      id: resource.id,
      productCode: resource.productCode,
      version: resource.version,
      status: resource.status,
      approvedBy: resource.approvedBy,
      approvedAt: resource.approvedAt,
      batchSize: resource.batchSize
    });

  /**
   * Converts a MasterFormula entity to a MasterFormulaResource.
   * @param entity - The entity to convert.
   * @returns The converted MasterFormulaResource.
   */
  toResourceFromEntity = (entity: MasterFormula): MasterFormulaResource =>
    ({
      id: entity.id,
      productCode: entity.productCode,
      version: entity.version,
      status: entity.status,
      approvedBy: entity.approvedBy,
      approvedAt: entity.approvedAt,
      batchSize: entity.batchSize
    } as MasterFormulaResource);
}
