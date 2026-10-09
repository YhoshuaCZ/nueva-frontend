import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Evidence} from '../domain/model/evidence.entity';
import {EvidenceResource, EvidenceResponse} from './evidence-response';

/**
 * Maps evidence entities to and from API resources.
 */
export class EvidenceAssembler implements BaseAssembler<Evidence, EvidenceResource, EvidenceResponse> {
  /**
   * Converts a EvidenceResponse to an array of Evidence entities.
   * @param response - The API response containing evidence resources.
   * @returns An array of Evidence entities.
   */
  toEntitiesFromResponse = (response: EvidenceResponse): Evidence[] =>
    response.evidence.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a EvidenceResource to a Evidence entity.
   * @param resource - The resource to convert.
   * @returns The converted Evidence entity.
   */
  toEntityFromResource = (resource: EvidenceResource): Evidence =>
    new Evidence({
      id: resource.id,
      recordCode: resource.recordCode,
      fileName: resource.fileName,
      detail: resource.detail,
      status: resource.status
    });

  /**
   * Converts a Evidence entity to a EvidenceResource.
   * @param entity - The entity to convert.
   * @returns The converted EvidenceResource.
   */
  toResourceFromEntity = (entity: Evidence): EvidenceResource =>
    ({
      id: entity.id,
      recordCode: entity.recordCode,
      fileName: entity.fileName,
      detail: entity.detail,
      status: entity.status
    } as EvidenceResource);
}
