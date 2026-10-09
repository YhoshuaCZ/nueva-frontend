import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {AnalyticalResult} from '../domain/model/analytical-result.entity';
import {AnalyticalResultResource, AnalyticalResultsResponse} from './analytical-results-response';

/**
 * Maps analytical result entities to and from API resources.
 */
export class AnalyticalResultAssembler implements BaseAssembler<AnalyticalResult, AnalyticalResultResource, AnalyticalResultsResponse> {
  /**
   * Converts a AnalyticalResultsResponse to an array of AnalyticalResult entities.
   * @param response - The API response containing analytical result resources.
   * @returns An array of AnalyticalResult entities.
   */
  toEntitiesFromResponse = (response: AnalyticalResultsResponse): AnalyticalResult[] =>
    response.analyticalResults.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a AnalyticalResultResource to a AnalyticalResult entity.
   * @param resource - The resource to convert.
   * @returns The converted AnalyticalResult entity.
   */
  toEntityFromResource = (resource: AnalyticalResultResource): AnalyticalResult =>
    new AnalyticalResult({
      id: resource.id,
      batchCode: resource.batchCode,
      sampleCode: resource.sampleCode,
      reportCode: resource.reportCode,
      test: resource.test,
      protocol: resource.protocol,
      result: resource.result,
      specification: resource.specification,
      analyst: resource.analyst,
      status: resource.status,
      approval: resource.approval
    });

  /**
   * Converts a AnalyticalResult entity to a AnalyticalResultResource.
   * @param entity - The entity to convert.
   * @returns The converted AnalyticalResultResource.
   */
  toResourceFromEntity = (entity: AnalyticalResult): AnalyticalResultResource =>
    ({
      id: entity.id,
      batchCode: entity.batchCode,
      sampleCode: entity.sampleCode,
      reportCode: entity.reportCode,
      test: entity.test,
      protocol: entity.protocol,
      result: entity.result,
      specification: entity.specification,
      analyst: entity.analyst,
      status: entity.status,
      approval: entity.approval
    } as AnalyticalResultResource);
}
