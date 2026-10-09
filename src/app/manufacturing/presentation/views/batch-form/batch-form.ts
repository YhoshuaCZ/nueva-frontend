import {Component, inject, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {BatchRejection, ManufacturingStore} from '../../../application/manufacturing.store';
import {Batch} from '../../../domain/model/batch.entity';
import {IamStore} from '../../../../iam/application/iam.store';

@Component({
  selector: 'app-batch-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, TranslatePipe,
    MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButton, MatIcon,
    MatFormField, MatLabel, MatError, MatInput, MatSelect, MatOption
  ],
  templateUrl: './batch-form.html',
  styleUrl: './batch-form.css'
})
/**
 * Dialog that registers a new batch. A batch is rejected when its number already exists or when
 * the master formula of the product is not approved.
 */
export class BatchForm {
  protected readonly store = inject(ManufacturingStore);
  private readonly iamStore = inject(IamStore);
  private readonly dialogRef = inject(MatDialogRef<BatchForm, string>);

  /**
   * Production lines of the plant.
   */
  protected readonly lines = ['Line 01', 'Line 02', 'Line 03'];

  /**
   * Reasons why the last batch could not be registered.
   */
  protected readonly rejection = signal<BatchRejection[]>([]);

  /**
   * Create batch form.
   */
  form = new FormGroup({
    code: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^B-\d{5}$/)]}),
    productCode: new FormControl('AC500', {nonNullable: true, validators: [Validators.required]}),
    quantity: new FormControl(120000, {nonNullable: true, validators: [Validators.required, Validators.min(1)]}),
    line: new FormControl('Line 01', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Registers the batch and closes the dialog with its code, or shows why it cannot be registered.
   */
  saveBatch = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const reasons = this.store.validateBatch(value.code, value.productCode);
    this.rejection.set(reasons);
    if (reasons.length) return;
    this.store.addBatch(new Batch({
      id: 0, code: value.code, productCode: value.productCode, orderCode: value.code.replace('B-', 'PO-'),
      quantity: value.quantity, line: value.line, owner: this.iamStore.currentUser()?.fullName ?? '', status: 'planned',
      progress: 0, incident: '', lastActivity: 'Created', lastActivityAt: new Date().toISOString()
    }));
    this.dialogRef.close(value.code);
  };

  /**
   * Returns to the form to change the batch number.
   */
  protected changeData(): void {
    this.rejection.set([]);
  }
}
