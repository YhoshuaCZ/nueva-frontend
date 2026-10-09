import {Component, computed, inject, input, OnInit, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {IamStore} from '../../../application/iam.store';
import {RoleProfile} from '../../../domain/model/role-profile.entity';

/**
 * Tabs of the users and profiles page.
 */
type UserTab = 'users' | 'profiles' | 'invitations';

/**
 * Administration page with the user directory, the profile permissions matrix and the invitations.
 */
@Component({
  selector: 'app-user-management',
  imports: [RouterLink, TranslatePipe, MatCard, MatButton, MatIcon, MatTableModule, MatTabNav, MatTabLink, MatTabNavPanel, PageHeader],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagement implements OnInit {
  protected readonly store = inject(IamStore);

  /**
   * Tab requested in the query parameters (`?tab=invitations`).
   */
  readonly tab = input<UserTab | undefined>();

  /**
   * Email of the invitation that was just sent (`?sent=`), to show a confirmation.
   */
  readonly sent = input<string | undefined>();

  /**
   * Selected tab.
   */
  protected readonly selectedTab = signal<UserTab>('users');

  /**
   * Role key of the profile shown in the side panel.
   */
  protected readonly selectedRole = signal('qa-specialist');

  /**
   * Profile shown in the side panel.
   */
  protected readonly selectedProfile = computed<RoleProfile | undefined>(() =>
    this.store.roleProfiles().find(profile => profile.key === this.selectedRole()));

  /**
   * Columns of the user and invitation tables.
   */
  protected readonly userColumns = ['user', 'profile', 'facility', 'status'];

  /**
   * Columns of the profile permissions matrix.
   */
  protected readonly matrixColumns = ['profile', 'createEdit', 'approveSign', 'restriction'];

  /**
   * Loads the directory and opens the tab of the query parameters.
   */
  ngOnInit(): void {
    this.store.loadDirectory();
    const tab = this.tab();
    if (tab) this.selectedTab.set(tab);
  }

  /**
   * Color tone of the chip of a role.
   * @param role - Role key.
   */
  protected toneOf(role: string): string {
    return this.store.roleProfiles().find(profile => profile.key === role)?.tone ?? 'neutral';
  }
}
