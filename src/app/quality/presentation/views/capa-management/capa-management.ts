import {Component, computed, effect, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {CapaRejection, QualityStore} from '../../../application/quality.store';
import {CapaAction} from '../../../domain/model/capa-action.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

/**
 * CAPA plan: actions with owners and due dates, root cause, effectiveness check and the evidence required to route it for approval.
 */
@Component({
  selector: 'app-capa-management',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, DatePipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './capa-management.html',
  styleUrl: './capa-management.css'
})
export class CapaManagement {
  protected readonly store = inject(QualityStore);

  /**
   * Code of the plan shown.
   */
  protected readonly code = signal('CAPA-26009');

  /**
   * The plan.
   */
  protected readonly plan = computed(() => this.store.capaPlans().find(item => item.code === this.code()));

  /**
   * Actions of the plan.
   */
  protected readonly actions = computed(() => this.store.actionsOf(this.code())());

  /**
   * Actions whose evidence is attached.
   */
  protected readonly attached = computed(() => this.actions().filter(action => action.evidenceAttached).length);

  /**
   * Deviation that originated the plan.
   */
  protected readonly deviation = computed(() => this.store.deviations().find(item => item.code === this.plan()?.sourceDeviation));

  /**
   * Reasons why the plan could not be routed.
   */
  protected readonly rejection = signal<CapaRejection[] | null>(null);

  /**
   * Root cause of the plan.
   */
  protected readonly rootCause = new FormControl('', {nonNullable: true});

  /**
   * New action title.
   */
  protected readonly newAction = new FormControl('', {nonNullable: true});

  /**
   * Fills the root cause when the plan changes.
   */
  constructor() {
    effect(() => {
      const plan = this.plan();
      if (plan && !this.rootCause.dirty) this.rootCause.setValue(plan.rootCause);
    });
  }

  /**
   * Color of an action status chip.
   * @param status - Action status.
   */
  protected toneOf(status: string): string {
    return ({open: 'chip-warning', planned: 'chip-neutral', 'in-review': 'chip-teal', complete: 'chip-success'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Saves the root cause.
   */
  protected saveRootCause(): void {
    const plan = this.plan();
    if (!plan) return;
    plan.rootCause = this.rootCause.value.trim();
    this.store.saveCapa(plan);
    this.rootCause.markAsPristine();
  }

  /**
   * Routes the plan for approval, or shows why it cannot be routed.
   */
  protected route(): void {
    const plan = this.plan();
    if (!plan) return;
    plan.rootCause = this.rootCause.value.trim();
    this.rejection.set(this.store.routeCapa(plan));
  }

  /**
   * Adds an action to the plan.
   */
  protected addAction(): void {
    const title = this.newAction.value.trim();
    if (!title) return;
    const number = this.actions().length + 1;
    this.store.addAction(new CapaAction({
      id: 0, capaCode: this.code(), code: `PA-0${number}`, title, owner: this.plan()?.owner ?? '',
      dueAt: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), status: 'open', evidence: 'Evidence of completion', evidenceAttached: false
    }));
    this.newAction.reset();
  }
}
