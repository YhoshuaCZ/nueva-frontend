import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {IamStore} from '../../../application/iam.store';
import {Invitation} from '../../../domain/model/invitation.entity';

/**
 * Administration form to invite a user with a least-privilege profile.
 */
@Component({
  selector: 'app-invitation-form',
  imports: [
    ReactiveFormsModule, RouterLink, TranslatePipe,
    MatCard, MatButton, MatIcon, MatFormField, MatError, MatInput, MatSelect, MatOption,
    PageHeader
  ],
  templateUrl: './invitation-form.html',
  styleUrl: './invitation-form.css'
})
export class InvitationForm extends BaseForm implements OnInit {
  protected readonly store = inject(IamStore);
  private readonly router = inject(Router);

  /**
   * Whether the email already belongs to the organization.
   */
  protected readonly duplicateEmail = signal(false);

  /**
   * Invitation form.
   */
  protected readonly form = new FormGroup({
    fullName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    role: new FormControl('internal-auditor', {nonNullable: true, validators: [Validators.required]}),
    facility: new FormControl('Ate manufacturing', {nonNullable: true, validators: [Validators.required]}),
    note: new FormControl('', {nonNullable: true})
  });

  /**
   * Role selected in the form.
   */
  private readonly selectedRole = toSignal(this.form.controls.role.valueChanges, {initialValue: this.form.controls.role.value});

  /**
   * Profile of the selected role, shown in the permission preview.
   */
  protected readonly selectedProfile = computed(() =>
    this.store.roleProfiles().find(profile => profile.key === this.selectedRole()));

  /**
   * Facilities a user can be given access to.
   */
  protected readonly facilities = ['Ate manufacturing', 'Lima', 'All facilities'];

  /**
   * Loads users, profiles and invitations to validate the email and preview permissions.
   */
  ngOnInit(): void {
    if (!this.store.roleProfiles().length) this.store.loadDirectory();
  }

  /**
   * Sends the invitation when the form is valid and the email is new.
   */
  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.duplicateEmail.set(this.store.isEmailTaken(value.email));
    if (this.duplicateEmail()) return;
    this.store.addInvitation(new Invitation({
      id: 0,
      fullName: value.fullName.trim(),
      email: value.email.trim().toLowerCase(),
      role: value.role,
      facility: value.facility,
      note: value.note.trim(),
      status: 'pending',
      sentAt: new Date().toISOString()
    }), this.router);
  }
}
