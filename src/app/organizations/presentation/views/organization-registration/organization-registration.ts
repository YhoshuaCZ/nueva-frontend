import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {CurrencyPipe} from '@angular/common';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {LanguageSwitcher} from '../../../../shared/presentation/components/language-switcher/language-switcher';
import {OrganizationsStore} from '../../../application/organizations.store';
import {RegisterOrganizationCommand} from '../../../domain/model/register-organization.command';
import {SubscriptionsStore} from '../../../../subscriptions/application/subscriptions.store';
import {environment} from '../../../../../environments/environment';

/**
 * Password rule of the mock-up: at least 12 characters, with a number and a symbol.
 * @param control - Password control.
 * @returns The error, or null when the password is strong enough.
 */
const strongPassword = (control: AbstractControl): ValidationErrors | null => {
  const value = control.value as string;
  return value.length >= 12 && /\d/.test(value) && /[^A-Za-z0-9]/.test(value) ? null : {weakPassword: true};
};

/**
 * Public form to register a laboratory, choose its plan and designate its first administrator.
 */
@Component({
  selector: 'app-organization-registration',
  imports: [
    ReactiveFormsModule, RouterLink, CurrencyPipe, TranslatePipe,
    MatButton, MatIconButton, MatIcon, MatFormField, MatError, MatSuffix, MatInput, MatSelect, MatOption, MatCheckbox,
    LanguageSwitcher
  ],
  templateUrl: './organization-registration.html',
  styleUrl: './organization-registration.css'
})
export class OrganizationRegistration extends BaseForm implements OnInit {
  protected readonly store = inject(OrganizationsStore);
  protected readonly subscriptionsStore = inject(SubscriptionsStore);

  /**
   * URL of the DoofPlus Landing Page.
   */
  protected readonly landingUrl = environment.landingPageUrl;

  /**
   * Items of the introduction panel.
   */
  protected readonly introItems = ['qa', 'production', 'access', 'permissions'];

  /**
   * Plans and billing cycles offered when the plan is changed.
   */
  protected readonly planOptions = computed(() => this.subscriptionsStore.plans().flatMap(plan =>
    ['monthly', 'annual'].map(cycle => ({plan, cycle, price: cycle === 'annual' ? plan.annualPrice : plan.monthlyPrice}))));

  /**
   * Plants offered as primary plant.
   */
  protected readonly plants = ['Ate plant · Lima, Peru', 'Lima QC laboratory · Lima, Peru', 'Arequipa plant · Arequipa, Peru'];

  /**
   * Whether the plan options are open.
   */
  protected readonly choosingPlan = signal(false);

  /**
   * Whether the password is shown as plain text.
   */
  protected readonly showPassword = signal(false);

  /**
   * Registration form.
   */
  protected readonly form = new FormGroup({
    legalName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    ruc: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.pattern(/^(10|20)\d{9}$/)]}),
    facilityName: new FormControl(this.plants[0], {nonNullable: true, validators: [Validators.required]}),
    planKey: new FormControl('standard-lab', {nonNullable: true}),
    billingCycle: new FormControl('monthly', {nonNullable: true}),
    administratorName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    administratorEmail: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required, strongPassword]}),
    accepted: new FormControl(false, {nonNullable: true, validators: [Validators.requiredTrue]})
  });

  private readonly formValue = toSignal(this.form.valueChanges, {initialValue: this.form.getRawValue()});

  /**
   * Plan selected in the form.
   */
  protected readonly selectedPlan = computed(() =>
    this.subscriptionsStore.plans().find(plan => plan.key === this.formValue().planKey));

  /**
   * Price of the selected plan in the selected billing cycle.
   */
  protected readonly selectedPrice = computed(() => {
    const plan = this.selectedPlan();
    if (!plan) return 0;
    return this.formValue().billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;
  });

  /**
   * Strength of the password from 0 to 4.
   */
  protected readonly passwordStrength = computed(() => {
    const value = this.formValue().password ?? '';
    return [value.length >= 8, value.length >= 12, /\d/.test(value), /[^A-Za-z0-9]/.test(value)].filter(Boolean).length;
  });

  /**
   * Email shown in the verification notice.
   */
  protected readonly administratorEmail = computed(() => this.formValue().administratorEmail || 'your email');

  /**
   * Starts the registration at the form.
   */
  ngOnInit(): void {
    this.store.resetRegistration();
  }

  /**
   * Chooses a plan and billing cycle.
   * @param planKey - Key of the plan.
   * @param billingCycle - Billing cycle.
   */
  protected choosePlan(planKey: string, billingCycle: string): void {
    this.form.patchValue({planKey, billingCycle});
    this.choosingPlan.set(false);
  }

  /**
   * Registers the organization when the form is valid.
   */
  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.register(new RegisterOrganizationCommand({
      legalName: value.legalName.trim(), ruc: value.ruc, facilityName: value.facilityName.split(' · ')[0],
      planKey: value.planKey, billingCycle: value.billingCycle, administratorName: value.administratorName.trim(),
      administratorEmail: value.administratorEmail.trim().toLowerCase(), password: value.password
    }));
  }

  /**
   * Clears the RUC error when the RUC changes.
   */
  protected rucChanged(): void {
    if (this.store.registrationStep() === 'ruc-registered') this.store.resetRegistration();
  }

  /**
   * Whether a control is invalid and touched.
   * @param controlName - Name of the control.
   */
  protected isInvalid(controlName: keyof typeof this.form.controls): boolean {
    return this.isInvalidControl(this.form, controlName);
  }
}
