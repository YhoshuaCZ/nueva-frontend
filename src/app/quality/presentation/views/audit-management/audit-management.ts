import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {AuditFinding} from '../../../domain/model/audit-finding.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Audits and findings: finding register, selected finding, audit plan and evidence package.
 */
@Component({
  selector: 'app-audit-management',
  imports: [MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DatePipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './audit-management.html',
  styleUrl: './audit-management.css'
})
export class AuditManagement {
  protected readonly store = inject(QualityStore);

  /**
   * Audit shown.
   */
  protected readonly audit = computed(() => this.store.audits()[0]);

  /**
   * Findings of the audit.
   */
  protected readonly findings = computed(() => this.store.findingsOf(this.audit()?.code ?? '')());

  /**
   * Findings already closed.
   */
  protected readonly closedCount = computed(() => this.findings().filter(item => item.status === 'closed').length);

  /**
   * Code of the selected finding.
   */
  protected readonly selectedCode = signal('F-01');

  /**
   * Selected finding.
   */
  protected readonly selected = computed(() => this.findings().find(item => item.code === this.selectedCode()));

  /**
   * Evidence of the audit.
   */
  protected readonly evidence = computed(() => this.store.evidenceOf(this.audit()?.code ?? '')());

  /**
   * Whether the new finding form is open.
   */
  protected readonly adding = signal(false);

  /**
   * New finding form.
   */
  protected readonly form = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    classification: new FormControl('minor', {nonNullable: true}),
    owner: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    observation: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Color of a finding status chip.
   * @param status - Finding status.
   */
  protected toneOf(status: string): string {
    return ({'evidence-pending': 'chip-warning', 'in-review': 'chip-info', closed: 'chip-success'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Adds the finding to the audit.
   */
  protected addFinding(): void {
    const audit = this.audit();
    if (!audit) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const code = `F-0${this.findings().length + 1}`;
    this.store.addFinding(new AuditFinding({
      id: 0, auditCode: audit.code, code, title: value.title.trim(), classification: value.classification, owner: value.owner.trim(),
      dueAt: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10), status: 'evidence-pending', observation: value.observation.trim(),
      response: '', closureRequirement: 'Independent reviewer verifies the corrective evidence.'
    }));
    this.selectedCode.set(code);
    this.form.reset({title: '', classification: 'minor', owner: '', observation: ''});
    this.adding.set(false);
  }
}
