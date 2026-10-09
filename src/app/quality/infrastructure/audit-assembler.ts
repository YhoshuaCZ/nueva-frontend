import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Audit} from '../domain/model/audit.entity';
import {AuditResource, AuditsResponse} from './audits-response';

/**
 * Maps audit entities to and from API resources.
 */
export class AuditAssembler implements BaseAssembler<Audit, AuditResource, AuditsResponse> {
  /**
   * Converts a AuditsResponse to an array of Audit entities.
   * @param response - The API response containing audit resources.
   * @returns An array of Audit entities.
   */
  toEntitiesFromResponse = (response: AuditsResponse): Audit[] =>
    response.audits.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AuditResource to a Audit entity.
   * @param resource - The resource to convert.
   * @returns The converted Audit entity.
   */
  toEntityFromResource = (resource: AuditResource): Audit =>
    new Audit({
      id: resource.id,
      code: resource.code,
      title: resource.title,
      period: resource.period,
      areasReviewed: resource.areasReviewed,
      areasTotal: resource.areasTotal,
      status: resource.status
    });

  /**
   * Converts a Audit entity to a AuditResource.
   * @param entity - The entity to convert.
   * @returns The converted AuditResource.
   */
  toResourceFromEntity = (entity: Audit): AuditResource =>
    ({
      id: entity.id,
      code: entity.code,
      title: entity.title,
      period: entity.period,
      areasReviewed: entity.areasReviewed,
      areasTotal: entity.areasTotal,
      status: entity.status
    } as AuditResource);
}
