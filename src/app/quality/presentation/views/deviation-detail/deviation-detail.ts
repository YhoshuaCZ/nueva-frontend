import {Component, computed, effect, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {Deviation} from '../../../domain/model/deviation.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Deviation report: investigation and risk assessment (RPN), evidence register, disposition and timeline.
 */
@Component({
  selector: 'app-deviation-detail',
  imports: [MatCard, MatButton, MatIcon, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DatePipe, ReactiveFormsModule, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './deviation-detail.html',
  styleUrl: './deviation-detail.css'
})
export class DeviationDetail {
  protected readonly store = inject(QualityStore);
  private readonly route = inject(ActivatedRoute);

  /**
   * Code of the deviation shown.
   */
  protected readonly code = signal(this.route.snapshot.queryParamMap.get('code') ?? 'DEV-26017');

  /**
   * The deviation.
   */
  protected readonly deviation = computed(() => this.store.deviations().find(item => item.code === this.code()));

  /**
   * Evidence of the deviation.
   */
  protected readonly evidence = computed(() => this.store.evidenceOf(this.code())());

  /**
   * Message after submitting.
   */
  protected readonly submitResult = signal<'blocked' | 'submitted' | null>(null);

  /**
   * Scores offered for severity, likelihood and detectability.
   */
  protected readonly scores = [1, 2, 3, 4, 5];

  /**
   * Investigation form.
   */
  protected readonly form = new FormGroup({
    summary: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    classification: new FormControl('major', {nonNullable: true}),
    containment: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    severity: new FormControl(1, {nonNullable: true}),
    likelihood: new FormControl(1, {nonNullable: true}),
    detectability: new FormControl(1, {nonNullable: true})
  });

  private readonly values = toSignal(this.form.valueChanges, {initialValue: this.form.getRawValue()});

  /**
   * Risk priority number: severity × likelihood × detectability.
   */
  protected readonly rpn = computed(() => {
    const value = this.values();
    return Number(value.severity) * Number(value.likelihood) * Number(value.detectability);
  });

  /**
   * Fills the form with the deviation.
   */
  constructor() {
    effect(() => {
      const deviation = this.deviation();
      if (deviation) this.form.reset({
        summary: deviation.summary, classification: deviation.classification, containment: deviation.containment,
        severity: deviation.severity, likelihood: deviation.likelihood, detectability: deviation.detectability
      });
    });
  }

  /**
   * Submits the risk assessment when the form is valid and the evidence is reviewed.
   */
  protected submit(): void {
    const deviation = this.deviation();
    if (!deviation) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const updated = new Deviation({
      id: deviation.id, code: deviation.code, title: deviation.title, batchCode: deviation.batchCode, orderCode: deviation.orderCode,
      summary: value.summary, classification: value.classification, containment: value.containment,
      severity: Number(value.severity), likelihood: Number(value.likelihood), detectability: Number(value.detectability),
      status: deviation.status, rootCause: deviation.rootCause, capaCode: deviation.capaCode, reportedBy: deviation.reportedBy,
      reportedAt: deviation.reportedAt, owner: deviation.owner, dueAt: deviation.dueAt
    });
    this.submitResult.set(this.store.submitAssessment(updated) ? 'submitted' : 'blocked');
  }

  /**
   * Attaches a file as evidence.
   * @param event - Change event of the file input.
   */
  protected attach(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) this.store.attachEvidence(this.code(), file.name);
  }
}
