import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {RegulatoryReport} from '../domain/model/regulatory-report.entity';
import {RegulatoryReportResource, RegulatoryReportsResponse} from './regulatory-reports-response';

/**
 * Maps regulatory report entities to and from API resources.
 */
export class RegulatoryReportAssembler implements BaseAssembler<RegulatoryReport, RegulatoryReportResource, RegulatoryReportsResponse> {
  /**
   * Converts a RegulatoryReportsResponse to an array of RegulatoryReport entities.
   * @param response - The API response containing regulatory report resources.
   * @returns An array of RegulatoryReport entities.
   */
  toEntitiesFromResponse = (response: RegulatoryReportsResponse): RegulatoryReport[] =>
    response.regulatoryReports.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a RegulatoryReportResource to a RegulatoryReport entity.
   * @param resource - The resource to convert.
   * @returns The converted RegulatoryReport entity.
   */
  toEntityFromResource = (resource: RegulatoryReportResource): RegulatoryReport =>
    new RegulatoryReport({
      id: resource.id,
      code: resource.code,
      type: resource.type,
      scope: resource.scope,
      owner: resource.owner,
      status: resource.status,
      template: resource.template,
      format: resource.format,
      createdAt: resource.createdAt
    });

  /**
   * Converts a RegulatoryReport entity to a RegulatoryReportResource.
   * @param entity - The entity to convert.
   * @returns The converted RegulatoryReportResource.
   */
  toResourceFromEntity = (entity: RegulatoryReport): RegulatoryReportResource =>
    ({
      id: entity.id,
      code: entity.code,
      type: entity.type,
      scope: entity.scope,
      owner: entity.owner,
      status: entity.status,
      template: entity.template,
      format: entity.format,
      createdAt: entity.createdAt
    } as RegulatoryReportResource);
}
