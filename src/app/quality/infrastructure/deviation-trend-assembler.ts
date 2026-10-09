import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {DeviationTrend} from '../domain/model/deviation-trend.entity';
import {DeviationTrendResource, DeviationTrendsResponse} from './deviation-trends-response';

/**
 * Maps deviation trend entities to and from API resources.
 */
export class DeviationTrendAssembler implements BaseAssembler<DeviationTrend, DeviationTrendResource, DeviationTrendsResponse> {
  /**
   * Converts a DeviationTrendsResponse to an array of DeviationTrend entities.
   * @param response - The API response containing deviation trend resources.
   * @returns An array of DeviationTrend entities.
   */
  toEntitiesFromResponse = (response: DeviationTrendsResponse): DeviationTrend[] =>
    response.deviationTrends.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a DeviationTrendResource to a DeviationTrend entity.
   * @param resource - The resource to convert.
   * @returns The converted DeviationTrend entity.
   */
  toEntityFromResource = (resource: DeviationTrendResource): DeviationTrend =>
    new DeviationTrend({
      id: resource.id,
      rootCause: resource.rootCause,
      month: resource.month,
      count: resource.count
    });

  /**
   * Converts a DeviationTrend entity to a DeviationTrendResource.
   * @param entity - The entity to convert.
   * @returns The converted DeviationTrendResource.
   */
  toResourceFromEntity = (entity: DeviationTrend): DeviationTrendResource =>
    ({
      id: entity.id,
      rootCause: entity.rootCause,
      month: entity.month,
      count: entity.count
    } as DeviationTrendResource);
}
