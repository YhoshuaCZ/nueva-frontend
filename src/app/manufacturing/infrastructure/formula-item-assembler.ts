import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {FormulaItem} from '../domain/model/formula-item.entity';
import {FormulaItemResource, FormulaItemsResponse} from './formula-items-response';

/**
 * Maps formula item entities to and from API resources.
 */
export class FormulaItemAssembler implements BaseAssembler<FormulaItem, FormulaItemResource, FormulaItemsResponse> {
  /**
   * Converts a FormulaItemsResponse to an array of FormulaItem entities.
   * @param response - The API response containing formula item resources.
   * @returns An array of FormulaItem entities.
   */
  toEntitiesFromResponse = (response: FormulaItemsResponse): FormulaItem[] =>
    response.formulaItems.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a FormulaItemResource to a FormulaItem entity.
   * @param resource - The resource to convert.
   * @returns The converted FormulaItem entity.
   */
  toEntityFromResource = (resource: FormulaItemResource): FormulaItem =>
    new FormulaItem({
      id: resource.id,
      formulaId: resource.formulaId,
      kind: resource.kind,
      name: resource.name,
      role: resource.role,
      target: resource.target,
      tolerance: resource.tolerance,
      control: resource.control
    });

  /**
   * Converts a FormulaItem entity to a FormulaItemResource.
   * @param entity - The entity to convert.
   * @returns The converted FormulaItemResource.
   */
  toResourceFromEntity = (entity: FormulaItem): FormulaItemResource =>
    ({
      id: entity.id,
      formulaId: entity.formulaId,
      kind: entity.kind,
      name: entity.name,
      role: entity.role,
      target: entity.target,
      tolerance: entity.tolerance,
      control: entity.control
    } as FormulaItemResource);
}
