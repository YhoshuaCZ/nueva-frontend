import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionResource, SubscriptionsResponse} from './subscriptions-response';

/**
 * Maps subscription entities to and from API resources.
 */
export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionsResponse> {
  /**
   * Converts a SubscriptionsResponse to an array of Subscription entities.
   * @param response - The API response containing subscription resources.
   * @returns An array of Subscription entities.
   */
  toEntitiesFromResponse = (response: SubscriptionsResponse): Subscription[] =>
    response.subscriptions.map(resource => this.toEntityFromResource(resource));

  /**
   * Converts a SubscriptionResource to a Subscription entity.
   * @param resource - The resource to convert.
   * @returns The converted Subscription entity.
   */
  toEntityFromResource = (resource: SubscriptionResource): Subscription =>
    new Subscription({
      id: resource.id,
      organizationId: resource.organizationId,
      planKey: resource.planKey,
      billingCycle: resource.billingCycle,
      status: resource.status,
      paymentState: resource.paymentState,
      nextInvoiceDate: resource.nextInvoiceDate,
      autoRenew: resource.autoRenew,
      cardBrand: resource.cardBrand,
      cardLast4: resource.cardLast4,
      cardExpiry: resource.cardExpiry,
      billingEmail: resource.billingEmail
    });

  /**
   * Converts a Subscription entity to a SubscriptionResource.
   * @param entity - The entity to convert.
   * @returns The converted SubscriptionResource.
   */
  toResourceFromEntity = (entity: Subscription): SubscriptionResource =>
    ({
      id: entity.id,
      organizationId: entity.organizationId,
      planKey: entity.planKey,
      billingCycle: entity.billingCycle,
      status: entity.status,
      paymentState: entity.paymentState,
      nextInvoiceDate: entity.nextInvoiceDate,
      autoRenew: entity.autoRenew,
      cardBrand: entity.cardBrand,
      cardLast4: entity.cardLast4,
      cardExpiry: entity.cardExpiry,
      billingEmail: entity.billingEmail
    } as SubscriptionResource);
}
