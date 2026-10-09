import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {MaterialLot} from '../../../domain/model/material-lot.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

/**
 * Raw-material receipt: lots in quarantine, receipt form, inspection checklist and disposition.
 */
@Component({
  selector: 'app-material-receipt',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, DatePipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './material-receipt.html',
  styleUrl: './material-receipt.css'
})
export class MaterialReceipt extends BaseForm {
  protected readonly store = inject(ManufacturingStore);

  /**
   * Steps of the receipt flow.
   */
  protected readonly steps = ['receipt', 'sampling', 'inspection', 'disposition'];

  /**
   * Code of the lot shown in the checklist.
   */
  protected readonly selectedCode = signal<string | null>(null);

  /**
   * Lot shown in the checklist: the selected one or the newest.
   */
  protected readonly selected = computed(() =>
    this.store.materialLots().find(lot => lot.code === this.selectedCode()) ?? this.newestLot());

  /**
   * Newest lot that is not approved yet.
   */
  private readonly newestLot = computed(() =>
    [...this.store.materialLots()].sort((a, b) => b.code.localeCompare(a.code)).find(lot => lot.status !== 'approved'));

  /**
   * Index of the current step of the selected lot.
   */
  protected readonly stepIndex = computed(() => {
    const status = this.selected()?.status;
    return status === 'quarantine' ? 0 : status === 'sampling' ? 1 : status === 'inspection' ? 2 : 3;
  });

  /**
   * Receipt form.
   */
  protected readonly form = new FormGroup({
    material: new FormControl('Paracetamol (API)', {nonNullable: true, validators: [Validators.required]}),
    supplier: new FormControl('Meridian Ingredients', {nonNullable: true, validators: [Validators.required]}),
    supplierLot: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    code: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^RM-\d{5}$/)]}),
    quantity: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    expiryDate: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    storageLocation: new FormControl('Q-A12 · Quarantine zone', {nonNullable: true, validators: [Validators.required]}),
    certificate: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Whether the internal lot code already exists.
   */
  protected readonly duplicateLot = signal(false);

  /**
   * Stores the name of the attached certificate of analysis.
   * @param event - Change event of the file input.
   */
  protected attachCertificate(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.controls.certificate.setValue(file?.name ?? '');
  }

  /**
   * Records the receipt: the lot enters quarantine and moves to sampling.
   */
  protected record(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.duplicateLot.set(this.store.materialLots().some(lot => lot.code === value.code));
    if (this.duplicateLot()) return;
    this.store.addMaterialLot(new MaterialLot({
      id: 0, code: value.code, receiptCode: value.code.replace('RM-', 'RCV-'), material: value.material,
      category: value.material.includes('API') ? 'api' : 'excipient', supplier: value.supplier, supplierLot: value.supplierLot,
      quantity: value.quantity, expiryDate: value.expiryDate, storageLocation: value.storageLocation, certificate: value.certificate,
      status: 'sampling', packagingVerified: true, identityVerified: true, samplingStatus: 'pending', allocatedBatch: ''
    }));
    this.selectedCode.set(value.code);
    this.form.reset();
  }

  /**
   * Whether a control is invalid and touched.
   * @param controlName - Name of the control.
   */
  protected isInvalid(controlName: keyof typeof this.form.controls): boolean {
    return this.isInvalidControl(this.form, controlName);
  }
}
