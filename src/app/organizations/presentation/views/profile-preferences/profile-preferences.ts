import {Component, effect, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatError, MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {OrganizationsStore} from '../../../application/organizations.store';
import {UserProfile} from '../../../domain/model/user-profile.entity';
import {IamStore} from '../../../../iam/application/iam.store';

/**
 * Personal data and notification preferences of the signed-in user, available in every environment.
 */
@Component({
  selector: 'app-profile-preferences',
  imports: [
    ReactiveFormsModule, TranslatePipe,
    MatCard, MatButton, MatIcon, MatFormField, MatError, MatInput, MatSlideToggle, MatButtonToggleGroup, MatButtonToggle,
    PageHeader
  ],
  templateUrl: './profile-preferences.html',
  styleUrl: './profile-preferences.css'
})
export class ProfilePreferences implements OnInit {
  protected readonly store = inject(OrganizationsStore);
  protected readonly iamStore = inject(IamStore);
  private readonly translate = inject(TranslateService);

  /**
   * Whether the changes were saved.
   */
  protected readonly saved = signal(false);

  /**
   * Profile form.
   */
  protected readonly form = new FormGroup({
    firstName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    lastName: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    area: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    emailNotifications: new FormControl(true, {nonNullable: true}),
    inAppNotifications: new FormControl(true, {nonNullable: true}),
    language: new FormControl('en', {nonNullable: true})
  });

  /**
   * Fills the form when the profile is loaded.
   */
  constructor() {
    effect(() => {
      const profile = this.store.currentProfile();
      if (profile) this.form.reset({
        firstName: profile.firstName, lastName: profile.lastName, area: profile.area,
        emailNotifications: profile.emailNotifications, inAppNotifications: profile.inAppNotifications, language: profile.language
      });
    });
  }

  /**
   * Loads the profiles.
   */
  ngOnInit(): void {
    this.store.loadProfiles();
  }

  /**
   * Applies the chosen language right away.
   * @param language - Language code.
   */
  protected chooseLanguage(language: string): void {
    this.form.markAsDirty();
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  /**
   * Saves the profile when the form is valid.
   */
  protected save(): void {
    const profile = this.store.currentProfile();
    if (!profile) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.updateProfile(new UserProfile({
      id: profile.id, userId: profile.userId, email: profile.email, site: profile.site,
      firstName: value.firstName.trim(), lastName: value.lastName.trim(), area: value.area.trim(),
      emailNotifications: value.emailNotifications, inAppNotifications: value.inAppNotifications, language: value.language
    }));
    this.form.markAsPristine();
    this.saved.set(true);
  }
}
