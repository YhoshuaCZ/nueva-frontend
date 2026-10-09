import {Component, computed, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {AnalyticalResult} from '../../../domain/model/analytical-result.entity';
import {Deviation} from '../../../domain/model/deviation.entity';
import {ManufacturingStore} from '../../../../manufacturing/application/manufacturing.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Analytical results of a batch, the assay calculation with the protocol formula and the out-of-specification handling.
 */
@Component({
  selector: 'app-analytical-results',
  imports: [MatInput, MatFormField, MatCard, MatButton, MatTableModule, MatSelect, MatOption, ReactiveFormsModule, RouterLink, TranslatePipe, PageHeader],
  templateUrl: './analytical-results.html',
  styleUrl: './analytical-results.css'
})
export class AnalyticalResults {
  protected readonly store = inject(QualityStore);
  protected readonly manufacturingStore = inject(ManufacturingStore);
  private readonly iamStore = inject(IamStore);

  /**
   * Batches with results.
   */
  protected readonly batches = computed(() => [...new Set(this.store.results().map(result => result.batchCode))]);

  /**
   * Batch shown.
   */
  protected readonly batchCode = signal('B-26041');

  /**
   * Results of the batch.
   */
  protected readonly results = computed(() => this.store.resultsOf(this.batchCode())());

  /**
   * First out-of-specification result.
   */
  protected readonly oos = computed(() => this.results().find(result => result.status === 'oos'));

  /**
   * Deviation already registered for the batch.
   */
  protected readonly linkedDeviation = computed(() =>
    this.store.deviations().find(deviation => deviation.batchCode === this.batchCode() && deviation.title.includes('OOS')));

  /**
   * Inputs of the assay formula of PRT-QC-012: Assay % = (As / Ast) × (Cst / Cs) × P.
   */
  protected readonly form = new FormGroup({
    sampleArea: new FormControl(1482350, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
    standardArea: new FormControl(1500120, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
    standardConcentration: new FormControl(0.1, {nonNullable: true, validators: [Validators.required, Validators.min(0.001)]}),
    sampleConcentration: new FormControl(0.1, {nonNullable: true, validators: [Validators.required, Validators.min(0.001)]}),
    purity: new FormControl(99.9, {nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(100)]})
  });

  /**
   * Calculated assay, or null before calculating.
   */
  protected readonly assay = signal<number | null>(null);

  /**
   * Calculates the assay with the protocol formula.
   */
  protected calculate(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.assay.set(Math.round((v.sampleArea / v.standardArea) * (v.standardConcentration / v.sampleConcentration) * v.purity * 10) / 10);
  }

  /**
   * Saves the calculated assay in the result of the batch.
   */
  protected save(): void {
    const value = this.assay();
    const assay = this.results().find(result => result.test.startsWith('Assay'));
    if (value === null || !assay) return;
    this.store.saveResult(new AnalyticalResult({
      id: assay.id, batchCode: assay.batchCode, sampleCode: assay.sampleCode, reportCode: assay.reportCode, test: assay.test,
      protocol: assay.protocol, result: `${value} %`, specification: assay.specification, analyst: this.iamStore.currentUser()?.fullName ?? assay.analyst,
      status: value >= 95 && value <= 105 ? 'within' : 'oos', approval: assay.approval
    }));
  }

  /**
   * Registers the deviation required by an out-of-specification result.
   */
  protected registerDeviation(): void {
    const oos = this.oos();
    const batch = this.manufacturingStore.batches().find(item => item.code === this.batchCode());
    const user = this.iamStore.currentUser();
    if (!oos || !batch || !user) return;
    const now = new Date();
    this.store.registerDeviation(new Deviation({
      id: 0, code: this.store.nextCode('DEV', this.store.deviations().map(item => item.code)),
      title: `OOS · ${oos.test}`, batchCode: batch.code, orderCode: batch.orderCode,
      summary: `${oos.test}: ${oos.result} outside ${oos.specification} (${oos.protocol}).`, classification: 'major',
      containment: 'Batch kept in quarantine; release blocked.', severity: 3, likelihood: 2, detectability: 2, status: 'open',
      rootCause: '', capaCode: '', reportedBy: user.fullName, reportedAt: now.toISOString(), owner: user.fullName,
      dueAt: new Date(now.getTime() + 2 * 86400000).toISOString()
    }));
  }
}
