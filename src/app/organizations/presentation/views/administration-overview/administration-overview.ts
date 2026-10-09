import {Component, computed, inject, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {OrganizationsStore} from '../../../application/organizations.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {SubscriptionsStore} from '../../../../subscriptions/application/subscriptions.store';

/**
 * Row of the organization and facility table: the organization first, then its facilities.
 */
interface SiteRow {
  name: string;
  detail: string;
  region: string;
  owner: string;
  status: string;
  organization: boolean;
}

/**
 * Administration home: users, organization and facilities, subscription and account health.
 */
@Component({
  selector: 'app-administration-overview',
  imports: [DatePipe, RouterLink, TranslatePipe, MatCard, MatButton, MatIcon, MatTableModule, PageHeader],
  templateUrl: './administration-overview.html',
  styleUrl: './administration-overview.css'
})
export class AdministrationOverview implements OnInit {
  protected readonly store = inject(OrganizationsStore);
  protected readonly iamStore = inject(IamStore);
  protected readonly subscriptionsStore = inject(SubscriptionsStore);

  /**
   * Columns of the tables.
   */
  protected readonly userColumns = ['user', 'profile', 'facility', 'status'];
  protected readonly siteColumns = ['site', 'region', 'owner', 'status'];

  /**
   * Users whose account is active.
   */
  protected readonly activeUsers = computed(() => this.iamStore.users().filter(user => user.status === 'active'));

  /**
   * Users that need attention first: invited accounts, then the rest.
   */
  protected readonly usersRequiringAttention = computed(() =>
    [...this.iamStore.users()].sort((a, b) => Number(b.status === 'invited') - Number(a.status === 'invited')).slice(0, 5));

  /**
   * The organization followed by its facilities.
   */
  protected readonly sites = computed<SiteRow[]>(() => {
    const organization = this.store.organization();
    const rows: SiteRow[] = organization ? [{
      name: organization.legalName, detail: `RUC ${organization.ruc}`, region: organization.region,
      owner: organization.ownerName, status: organization.status, organization: true
    }] : [];
    return rows.concat(this.store.facilities().map(facility => ({
      name: facility.name, detail: `organizations.facility-type.${facility.type}`, region: facility.timezone,
      owner: facility.ownerName, status: facility.status, organization: false
    })));
  });

  /**
   * Loads the data shown in the overview.
   */
  ngOnInit(): void {
    this.store.loadOrganization();
    this.iamStore.loadDirectory();
    const user = this.iamStore.currentUser();
    if (user) this.subscriptionsStore.loadForOrganization(user.organizationId);
  }
}
