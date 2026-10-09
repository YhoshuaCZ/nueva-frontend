import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Deviation} from '../domain/model/deviation.entity';
import {DeviationResource, DeviationsResponse} from './deviations-response';

/**
 * Maps deviation entities to and from API resources.
 */
export class DeviationAssembler implements BaseAssembler<Deviation, DeviationResource, DeviationsResponse> {
  /**
   * Converts a DeviationsResponse to an array of Deviation entities.
   * @param response - The API response containing deviation resources.
   * @returns An array of Deviation entities.
   */
  toEntitiesFromResponse = (response: DeviationsResponse): Deviation[] =>
    response.deviations.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DeviationResource to a Deviation entity.
   * @param resource - The resource to convert.
   * @returns The converted Deviation entity.
   */
  toEntityFromResource = (resource: DeviationResource): Deviation =>
    new Deviation({
      id: resource.id,
      code: resource.code,
      title: resource.title,
      batchCode: resource.batchCode,
      orderCode: resource.orderCode,
      summary: resource.summary,
      classification: resource.classification,
      containment: resource.containment,
      severity: resource.severity,
      likelihood: resource.likelihood,
      detectability: resource.detectability,
      status: resource.status,
      rootCause: resource.rootCause,
      capaCode: resource.capaCode,
      reportedBy: resource.reportedBy,
      reportedAt: resource.reportedAt,
      owner: resource.owner,
      dueAt: resource.dueAt
    });

  /**
   * Converts a Deviation entity to a DeviationResource.
   * @param entity - The entity to convert.
   * @returns The converted DeviationResource.
   */
  toResourceFromEntity = (entity: Deviation): DeviationResource =>
    ({
      id: entity.id,
      code: entity.code,
      title: entity.title,
      batchCode: entity.batchCode,
      orderCode: entity.orderCode,
      summary: entity.summary,
      classification: entity.classification,
      containment: entity.containment,
      severity: entity.severity,
      likelihood: entity.likelihood,
      detectability: entity.detectability,
      status: entity.status,
      rootCause: entity.rootCause,
      capaCode: entity.capaCode,
      reportedBy: entity.reportedBy,
      reportedAt: entity.reportedAt,
      owner: entity.owner,
      dueAt: entity.dueAt
    } as DeviationResource);
}
