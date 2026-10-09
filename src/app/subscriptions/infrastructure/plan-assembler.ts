import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Plan} from '../domain/model/plan.entity';
import {PlanResource, PlansResponse} from './plans-response';

/**
 * Maps plan entities to and from API resources.
 */
export class PlanAssembler implements BaseAssembler<Plan, PlanResource, PlansResponse> {
  /**
   * Converts a PlansResponse to an array of Plan entities.
   * @param response - The API response containing plan resources.
   * @returns An array of Plan entities.
   */
  toEntitiesFromResponse = (response: PlansResponse): Plan[] =>
    response.plans.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a PlanResource to a Plan entity.
   * @param resource - The resource to convert.
   * @returns The converted Plan entity.
   */
  toEntityFromResource = (resource: PlanResource): Plan =>
    new Plan({
      id: resource.id,
      key: resource.key,
      name: resource.name,
      monthlyPrice: resource.monthlyPrice,
      annualPrice: resource.annualPrice,
      userLimit: resource.userLimit,
      iotDeviceLimit: resource.iotDeviceLimit
    });

  /**
   * Converts a Plan entity to a PlanResource.
   * @param entity - The entity to convert.
   * @returns The converted PlanResource.
   */
  toResourceFromEntity = (entity: Plan): PlanResource =>
    ({
      id: entity.id,
      key: entity.key,
      name: entity.name,
      monthlyPrice: entity.monthlyPrice,
      annualPrice: entity.annualPrice,
      userLimit: entity.userLimit,
      iotDeviceLimit: entity.iotDeviceLimit
    } as PlanResource);
}
