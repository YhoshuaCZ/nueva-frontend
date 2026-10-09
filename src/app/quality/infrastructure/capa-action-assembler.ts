import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {CapaAction} from '../domain/model/capa-action.entity';
import {CapaActionResource, CapaActionsResponse} from './capa-actions-response';

/**
 * Maps CAPA action entities to and from API resources.
 */
export class CapaActionAssembler implements BaseAssembler<CapaAction, CapaActionResource, CapaActionsResponse> {
  /**
   * Converts a CapaActionsResponse to an array of CapaAction entities.
   * @param response - The API response containing CAPA action resources.
   * @returns An array of CapaAction entities.
   */
  toEntitiesFromResponse = (response: CapaActionsResponse): CapaAction[] =>
    response.capaActions.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a CapaActionResource to a CapaAction entity.
   * @param resource - The resource to convert.
   * @returns The converted CapaAction entity.
   */
  toEntityFromResource = (resource: CapaActionResource): CapaAction =>
    new CapaAction({
      id: resource.id,
      capaCode: resource.capaCode,
      code: resource.code,
      title: resource.title,
      owner: resource.owner,
      dueAt: resource.dueAt,
      status: resource.status,
      evidence: resource.evidence,
      evidenceAttached: resource.evidenceAttached
    });

  /**
   * Converts a CapaAction entity to a CapaActionResource.
   * @param entity - The entity to convert.
   * @returns The converted CapaActionResource.
   */
  toResourceFromEntity = (entity: CapaAction): CapaActionResource =>
    ({
      id: entity.id,
      capaCode: entity.capaCode,
      code: entity.code,
      title: entity.title,
      owner: entity.owner,
      dueAt: entity.dueAt,
      status: entity.status,
      evidence: entity.evidence,
      evidenceAttached: entity.evidenceAttached
    } as CapaActionResource);
}
