import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../shared/infrastructure/base-api';
import {Plan} from '../domain/model/plan.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {Invoice} from '../domain/model/invoice.entity';
import {PlansApiEndpoint} from './plans-api-endpoint';
import {SubscriptionsApiEndpoint} from './subscriptions-api-endpoint';
import {InvoicesApiEndpoint} from './invoices-api-endpoint';

/**
 * Infrastructure facade for plans, subscriptions and invoices.
 */
@Injectable({providedIn: 'root'})
export class SubscriptionsApi extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly plansEndpoint = new PlansApiEndpoint(this.http);
  private readonly subscriptionsEndpoint = new SubscriptionsApiEndpoint(this.http);
  private readonly invoicesEndpoint = new InvoicesApiEndpoint(this.http);

  /**
   * Retrieves the plans offered by DoofPlus.
   * @returns Stream with the plan collection.
   */
  getPlans = (): Observable<Plan[]> => this.plansEndpoint.getAll();

  /**
   * Retrieves all subscriptions.
   * @returns Stream with the subscription collection.
   */
  getSubscriptions = (): Observable<Subscription[]> => this.subscriptionsEndpoint.getAll();

  /**
   * Creates a subscription.
   * @param subscription - The subscription to create.
   * @returns Stream with the created subscription.
   */
  createSubscription = (subscription: Subscription): Observable<Subscription> => this.subscriptionsEndpoint.create(subscription);

  /**
   * Updates a subscription.
   * @param subscription - The subscription to update.
   * @returns Stream with the updated subscription.
   */
  updateSubscription = (subscription: Subscription): Observable<Subscription> =>
    this.subscriptionsEndpoint.update(subscription, subscription.id);

  /**
   * Retrieves all invoices.
   * @returns Stream with the invoice collection.
   */
  getInvoices = (): Observable<Invoice[]> => this.invoicesEndpoint.getAll();

  /**
   * Creates an invoice.
   * @param invoice - The invoice to create.
   * @returns Stream with the created invoice.
   */
  createInvoice = (invoice: Invoice): Observable<Invoice> => this.invoicesEndpoint.create(invoice);
}
