import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {MatIcon} from '@angular/material/icon';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {ManufacturingStore} from '../../../application/manufacturing.store';
import {Product} from '../../../domain/model/product.entity';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Product catalog, new product form and the master formula of the selected product.
 */
@Component({
  selector: 'app-product-catalog',
  imports: [MatIcon, MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DatePipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog extends BaseForm {
  protected readonly store = inject(ManufacturingStore);

  /**
   * Code of the product whose formula is shown.
   */
  protected readonly selectedCode = signal('AC500');

  /**
   * Effective master formula of the selected product.
   */
  protected readonly formula = computed(() =>
    this.store.formulas().find(item => item.productCode === this.selectedCode() && item.status === 'approved')
    ?? this.store.formulas().find(item => item.productCode === this.selectedCode()));

  /**
   * Components of the selected formula.
   */
  protected readonly components = computed(() =>
    this.store.formulaItems().filter(item => item.formulaId === this.formula()?.id && item.kind === 'component'));

  /**
   * Whether the code entered already exists.
   */
  protected readonly duplicateCode = signal<string | null>(null);

  /**
   * New product form.
   */
  protected readonly form = new FormGroup({
    code: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^[A-Za-z]{2}\d{3}$/)]}),
    name: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    dosageForm: new FormControl('Tablet', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Dosage forms offered in the form.
   */
  protected readonly dosageForms = ['Tablet', 'Capsule', 'Syrup', 'Injectable'];

  /**
   * Color of the formula status chip.
   * @param status - Formula status.
   */
  protected toneOf(status: string): string {
    return status === 'approved' ? 'chip-success' : status === 'pending' ? 'chip-warning' : 'chip-neutral';
  }

  /**
   * Registers the product when the form is valid and the code is unique.
   */
  protected register(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const code = value.code.toUpperCase();
    const added = this.store.addProduct(new Product({
      id: 0, code, name: value.name.trim(), dosageForm: value.dosageForm, formulaVersion: '', formulaStatus: 'none'
    }));
    this.duplicateCode.set(added ? null : code);
    if (added) this.form.reset({code: '', name: '', dosageForm: 'Tablet'});
  }

  /**
   * Whether a control is invalid and touched.
   * @param controlName - Name of the control.
   */
  protected isInvalid(controlName: 'code' | 'name'): boolean {
    return this.isInvalidControl(this.form, controlName);
  }
}
