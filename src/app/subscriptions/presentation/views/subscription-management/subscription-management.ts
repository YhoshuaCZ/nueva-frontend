import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatProgressBar} from '@angular/material/progress-bar';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {SubscriptionsStore} from '../../../application/subscriptions.store';
import {IamStore} from '../../../../iam/application/iam.store';

/**
 * Administration page with the plan, the payment method, the billing history and the plan change review.
 */
@Component({
  selector: 'app-subscription-management',
  imports: [
    CurrencyPipe, DatePipe, TranslatePipe,
    MatCard, MatButton, MatIcon, MatTableModule, MatFormField, MatLabel, MatSelect, MatOption, MatProgressBar,
    PageHeader
  ],
  templateUrl: './subscription-management.html',
  styleUrl: './subscription-management.css'
})
export class SubscriptionManagement implements OnInit {
  protected readonly store = inject(SubscriptionsStore);
  protected readonly iamStore = inject(IamStore);

  /**
   * Columns of the billing history.
   */
  protected readonly invoiceColumns = ['number', 'issuedAt', 'amount', 'status'];

  /**
   * Plan proposed in the plan change review.
   */
  protected readonly proposedPlanKey = signal<string | null>(null);

  /**
   * Billing cycle proposed in the plan change review.
   */
  protected readonly proposedCycle = signal<string | null>(null);

  /**
   * Plan proposed in the review, or the current plan.
   */
  protected readonly proposedPlan = computed(() =>
    this.store.plans().find(plan => plan.key === (this.proposedPlanKey() ?? this.store.subscription()?.planKey)));

  /**
   * Billing cycle proposed in the review, or the current one.
   */
  protected readonly cycle = computed(() => this.proposedCycle() ?? this.store.subscription()?.billingCycle ?? 'monthly');

  /**
   * Amount of the next invoice with the proposed plan and cycle.
   */
  protected readonly proposedAmount = computed(() => {
    const plan = this.proposedPlan();
    if (!plan) return 0;
    return this.cycle() === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  });

  /**
   * Whether the review proposes a change.
   */
  protected readonly hasChange = computed(() => {
    const subscription = this.store.subscription();
    return !!subscription && (this.proposedPlan()?.key !== subscription.planKey || this.cycle() !== subscription.billingCycle);
  });

  /**
   * Share of the user limit in use; a plan without limit shows the users against the pending invitations.
   */
  protected readonly usersProgress = computed(() => {
    const limit = this.store.currentPlan()?.userLimit;
    const users = this.iamStore.users().length;
    if (limit) return Math.min(100, users / limit * 100);
    const total = users + this.iamStore.pendingInvitations().length;
    return total ? users / total * 100 : 0;
  });

  /**
   * Loads the subscription of the organization and the users count.
   */
  ngOnInit(): void {
    const user = this.iamStore.currentUser();
    if (user) this.store.loadForOrganization(user.organizationId);
    if (!this.iamStore.users().length) this.iamStore.loadDirectory();
  }

  /**
   * Confirms the plan change.
   */
  protected confirmChange(): void {
    const plan = this.proposedPlan();
    if (!plan || !this.hasChange()) return;
    this.store.changePlan(plan.key, this.cycle());
    this.cancelChange();
  }

  /**
   * Discards the proposed change.
   */
  protected cancelChange(): void {
    this.proposedPlanKey.set(null);
    this.proposedCycle.set(null);
  }
}
