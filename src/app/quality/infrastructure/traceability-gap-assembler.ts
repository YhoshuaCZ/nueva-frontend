import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {TraceabilityGap} from '../domain/model/traceability-gap.entity';
import {TraceabilityGapResource, TraceabilityGapsResponse} from './traceability-gaps-response';

/**
 * Maps traceability gap entities to and from API resources.
 */
export class TraceabilityGapAssembler implements BaseAssembler<TraceabilityGap, TraceabilityGapResource, TraceabilityGapsResponse> {
  /**
   * Converts a TraceabilityGapsResponse to an array of TraceabilityGap entities.
   * @param response - The API response containing traceability gap resources.
   * @returns An array of TraceabilityGap entities.
   */
  toEntitiesFromResponse = (response: TraceabilityGapsResponse): TraceabilityGap[] =>
    response.traceabilityGaps.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a TraceabilityGapResource to a TraceabilityGap entity.
   * @param resource - The resource to convert.
   * @returns The converted TraceabilityGap entity.
   */
  toEntityFromResource = (resource: TraceabilityGapResource): TraceabilityGap =>
    new TraceabilityGap({
      id: resource.id,
      batchCode: resource.batchCode,
      product: resource.product,
      missingRecord: resource.missingRecord,
      detail: resource.detail
    });

  /**
   * Converts a TraceabilityGap entity to a TraceabilityGapResource.
   * @param entity - The entity to convert.
   * @returns The converted TraceabilityGapResource.
   */
  toResourceFromEntity = (entity: TraceabilityGap): TraceabilityGapResource =>
    ({
      id: entity.id,
      batchCode: entity.batchCode,
      product: entity.product,
      missingRecord: entity.missingRecord,
      detail: entity.detail
    } as TraceabilityGapResource);
}
