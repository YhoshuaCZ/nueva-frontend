import {Component, computed, inject, signal} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {ManufacturingStore} from '../../../../manufacturing/application/manufacturing.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Batch release: readiness checklist and the electronic signature of the release decision.
 */
@Component({
  selector: 'app-batch-release',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DecimalPipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './batch-release.html',
  styleUrl: './batch-release.css'
})
export class BatchRelease {
  protected readonly store = inject(QualityStore);
  protected readonly manufacturingStore = inject(ManufacturingStore);
  protected readonly iamStore = inject(IamStore);

  /**
   * Batches waiting for a QA decision or blocked.
   */
  protected readonly queue = computed(() => this.manufacturingStore.batches()
    .filter(batch => batch.status === 'release-requested' || batch.status === 'on-hold' || batch.status === 'released'));

  /**
   * Code of the batch shown.
   */
  protected readonly code = signal('B-26038');

  /**
   * The batch.
   */
  protected readonly batch = computed(() => this.manufacturingStore.batches().find(batch => batch.code === this.code()));

  /**
   * Readiness checks of the batch.
   */
  protected readonly checks = computed(() => {
    this.store.results();
    this.store.deviations();
    return this.store.releaseChecks(this.code());
  });

  /**
   * Number of checks passed.
   */
  protected readonly passed = computed(() => this.checks().filter(check => check.passed).length);

  /**
   * Whether every check passed.
   */
  protected readonly ready = computed(() => this.passed() === this.checks().length);

  /**
   * Whether the signed-in user has the QA release privilege.
   */
  protected readonly canSign = computed(() => this.iamStore.currentUser()?.privilege === 'qa-release');

  /**
   * Result of the last signature attempt.
   */
  protected readonly result = signal<'released' | 'invalid-password' | 'not-ready' | null>(null);

  /**
   * Password re-entered to sign.
   */
  protected readonly password = new FormControl('', {nonNullable: true, validators: [Validators.required]});

  /**
   * Shows another batch.
   * @param code - Batch code.
   */
  protected select(code: string): void {
    this.code.set(code);
    this.result.set(null);
    this.password.reset();
  }

  /**
   * Signs the release with the re-entered password.
   */
  protected sign(): void {
    if (this.password.invalid) {
      this.password.markAsTouched();
      return;
    }
    this.store.signRelease(this.code(), this.password.value, result => {
      this.result.set(result);
      if (result === 'released') this.password.reset();
    });
  }
}
