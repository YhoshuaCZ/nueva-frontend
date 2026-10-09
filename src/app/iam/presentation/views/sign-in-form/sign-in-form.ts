import {Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {MatError, MatFormField, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {BaseForm} from '../../../../shared/presentation/components/base-form/base-form';
import {WorkspaceEnvironment, workspaceEnvironments} from '../../../../shared/presentation/workspace-environments';
import {IamStore} from '../../../application/iam.store';
import {SignInCommand} from '../../../domain/model/sign-in.command';
import {EnvironmentIcon} from '../../components/environment-icon/environment-icon';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    MatCard,
    MatFormField,
    MatError,
    MatSuffix,
    MatInput,
    MatButton,
    MatIconButton,
    MatIcon,
    EnvironmentIcon
  ],
  templateUrl: './sign-in-form.html',
  styleUrl: './sign-in-form.css'
})
/**
 * The SignInForm component signs a user in to one environment: credentials, two-factor code
 * and the "not authorized" state when the role belongs to another environment.
 */
export class SignInForm extends BaseForm implements OnInit {
  protected readonly store = inject(IamStore);
  private readonly router = inject(Router);

  /**
   * Environment of the route (`/sign-in/:environment`).
   */
  readonly environment = input<string>('qa');

  /**
   * Environment selected in the route, validated.
   */
  protected readonly selected = computed(() => this.environment() as WorkspaceEnvironment);

  /**
   * Settings of the selected environment.
   */
  protected readonly profile = computed(() => workspaceEnvironments[this.selected()]);

  /**
   * Whether the password is shown as plain text.
   */
  protected readonly showPassword = signal(false);

  /**
   * Digits of the two-factor code.
   */
  protected readonly codeDigits = signal<string[]>(['', '', '', '', '', '']);

  /**
   * Whether the six digits were entered.
   */
  protected readonly codeComplete = computed(() => this.codeDigits().every(digit => /^\d$/.test(digit)));

  /**
   * Credentials form.
   */
  form = new FormGroup({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    password: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Returns to the environment selection when the route has an unknown environment, and starts the flow.
   */
  ngOnInit(): void {
    if (!(this.environment() in workspaceEnvironments)) {
      this.router.navigate(['/sign-in']).then();
      return;
    }
    this.store.resetSignIn();
  }

  /**
   * Handles the sign-in form submission.
   * If the form is valid, it creates a SignInCommand and calls the IamStore's signIn method.
   */
  performSignIn = () => {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const {email, password} = this.form.getRawValue();
    this.store.signIn(new SignInCommand({email: email.trim(), password, environment: this.selected()}));
  };

  /**
   * Stores a typed digit and moves the focus to the next box.
   * @param index - Position of the digit.
   * @param event - Input event of the box.
   */
  protected updateDigit(index: number, event: Event): void {
    const box = event.target as HTMLInputElement;
    const digit = box.value.replace(/\D/g, '').slice(-1);
    box.value = digit;
    this.codeDigits.update(digits => digits.map((value, i) => i === index ? digit : value));
    if (digit) (box.nextElementSibling as HTMLInputElement | null)?.focus();
  }

  /**
   * Checks the two-factor code.
   * @param event - Submit event of the code form, cancelled to stay in the page.
   */
  protected submitCode(event: Event): void {
    event.preventDefault();
    if (this.codeComplete()) this.store.verifyTwoFactorCode(this.codeDigits().join(''), this.router);
  }

  /**
   * Returns to the credentials step.
   */
  protected backToCredentials(): void {
    this.codeDigits.set(['', '', '', '', '', '']);
    this.form.controls.password.reset();
    this.store.resetSignIn();
  }

  /**
   * Whether a control is invalid and touched.
   * @param controlName - Name of the control.
   */
  protected isInvalid(controlName: 'email' | 'password'): boolean {
    return this.isInvalidControl(this.form, controlName) || this.store.signInStep() === 'invalid-credentials';
  }
}
