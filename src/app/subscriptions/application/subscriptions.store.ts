import {computed, inject, Injectable, signal} from '@angular/core';
import {retry} from 'rxjs';
import {SubscriptionsApi} from '../infrastructure/subscriptions-api';
import {Plan} from '../domain/model/plan.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {Invoice} from '../domain/model/invoice.entity';

/**
 * Holds the plans, the subscription of the current organization and its invoices.
 */
@Injectable({providedIn: 'root'})
export class SubscriptionsStore {
  private readonly subscriptionsApi = inject(SubscriptionsApi);

  private readonly plansSignal = signal<Plan[]>([]);
  private readonly subscriptionSignal = signal<Subscription | null>(null);
  private readonly invoicesSignal = signal<Invoice[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  /**
   * Plans offered by DoofPlus.
   */
  readonly plans = this.plansSignal.asReadonly();

  /**
   * Subscription of the current organization.
   */
  readonly subscription = this.subscriptionSignal.asReadonly();

  /**
   * Invoices of the subscription, newest first.
   */
  readonly invoices = computed(() => [...this.invoicesSignal()].sort((a, b) => b.issuedAt.localeCompare(a.issuedAt)));

  /**
   * Plan of the subscription.
   */
  readonly currentPlan = computed(() => this.plans().find(plan => plan.key === this.subscription()?.planKey));

  /**
   * Amount charged per billing cycle.
   */
  readonly currentAmount = computed(() => {
    const plan = this.currentPlan();
    if (!plan) return 0;
    return this.subscription()?.billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  });

  /**
   * Whether data is loading.
   */
  readonly loading = this.loadingSignal.asReadonly();

  /**
   * Current error message, if any.
   */
  readonly error = this.errorSignal.asReadonly();

  /**
   * Creates the store and loads the plans, which are public.
   */
  constructor() {
    this.subscriptionsApi.getPlans().subscribe({
      next: plans => this.plansSignal.set(plans),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to load plans'))
    });
  }

  /**
   * Loads the subscription of an organization and its invoices.
   * @param organizationId - Identifier of the organization.
   */
  loadForOrganization = (organizationId: number): void => {
    this.loadingSignal.set(true);
    this.subscriptionsApi.getSubscriptions().subscribe({
      next: subscriptions => {
        const subscription = subscriptions.find(item => item.organizationId === organizationId) ?? null;
        this.subscriptionSignal.set(subscription);
        this.loadingSignal.set(false);
        if (!subscription) return;
        this.subscriptionsApi.getInvoices().subscribe({
          next: invoices => this.invoicesSignal.set(invoices.filter(invoice => invoice.subscriptionId === subscription.id)),
          error: err => this.errorSignal.set(this.formatError(err, 'Failed to load invoices'))
        });
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load the subscription'));
        this.loadingSignal.set(false);
      }
    });
  };

  /**
   * Creates the pending subscription of a newly registered organization.
   * @param organizationId - Identifier of the new organization.
   * @param planKey - Key of the selected plan.
   * @param billingCycle - Selected billing cycle.
   * @param billingEmail - Email of the administrator.
   */
  subscribe = (organizationId: number, planKey: string, billingCycle: string, billingEmail: string): void => {
    const nextInvoice = new Date();
    nextInvoice.setMonth(nextInvoice.getMonth() + (billingCycle === 'annual' ? 12 : 1));
    this.subscriptionsApi.createSubscription(new Subscription({
      id: 0, organizationId, planKey, billingCycle, status: 'pending', paymentState: 'approved',
      nextInvoiceDate: nextInvoice.toISOString().slice(0, 10), autoRenew: true,
      cardBrand: '', cardLast4: '', cardExpiry: '', billingEmail
    })).pipe(retry(2)).subscribe({
      next: subscription => this.subscriptionSignal.set(subscription),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to create the subscription'))
    });
  };

  /**
   * Changes the plan or billing cycle of the subscription. Only administrators reach this action.
   * @param planKey - Key of the new plan.
   * @param billingCycle - New billing cycle.
   */
  changePlan = (planKey: string, billingCycle: string): void => {
    const subscription = this.subscription();
    if (!subscription) return;
    subscription.planKey = planKey;
    subscription.billingCycle = billingCycle;
    this.saveSubscription(subscription, 'Failed to change the plan');
  };

  /**
   * Retries a declined charge: Niubiz approves it, an invoice is issued and the subscription becomes active.
   */
  retryPayment = (): void => {
    const subscription = this.subscription();
    if (!subscription) return;
    const issuedAt = new Date().toISOString().slice(0, 10);
    this.subscriptionsApi.createInvoice(new Invoice({
      id: 0, subscriptionId: subscription.id, number: `INV-${issuedAt.slice(0, 4)}-${issuedAt.slice(5, 7)}01`,
      issuedAt, amount: this.currentAmount(), status: 'approved'
    })).subscribe({
      next: invoice => this.invoicesSignal.update(invoices => [...invoices, invoice]),
      error: err => this.errorSignal.set(this.formatError(err, 'Failed to register the payment'))
    });
    subscription.paymentState = 'approved';
    subscription.status = 'active';
    this.saveSubscription(subscription, 'Failed to update the subscription');
  };

  /**
   * Persists the subscription and refreshes the signal.
   * @param subscription - Subscription to save.
   * @param errorMessage - Message shown if the request fails.
   */
  private saveSubscription(subscription: Subscription, errorMessage: string): void {
    this.loadingSignal.set(true);
    this.subscriptionsApi.updateSubscription(subscription).pipe(retry(2)).subscribe({
      next: updated => {
        this.subscriptionSignal.set(updated);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, errorMessage));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Normalizes unknown errors into a display-friendly message.
   * @param error - Source error.
   * @param fallback - Default message when details are unavailable.
   * @returns Normalized message.
   */
  private formatError = (error: unknown, fallback: string): string =>
    error instanceof Error ? error.message : fallback;
}
