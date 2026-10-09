import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';
import {MatFormField} from '@angular/material/form-field';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Controlled documents: content of the version in review, approval workflow with separation of duties and version history.
 */
@Component({
  selector: 'app-document-management',
  imports: [MatFormField, MatCard, MatButton, MatIcon, MatTableModule, MatSelect, MatOption, DatePipe, TranslatePipe, PageHeader],
  templateUrl: './document-management.html',
  styleUrl: './document-management.css'
})
export class DocumentManagement {
  protected readonly store = inject(QualityStore);
  protected readonly iamStore = inject(IamStore);

  /**
   * Code of the document shown.
   */
  protected readonly code = signal('SOP-QA-014');

  /**
   * Codes of every controlled document.
   */
  protected readonly codes = computed(() => [...new Set(this.store.documents().map(item => item.code))]);

  /**
   * Versions of the document, newest first.
   */
  protected readonly versions = computed(() => this.store.versionsOf(this.code())());

  /**
   * Newest version of the document.
   */
  protected readonly latest = computed(() => this.versions()[0]);

  /**
   * Effective (approved) version.
   */
  protected readonly effective = computed(() => this.versions().find(item => item.status === 'approved'));

  /**
   * Whether the signed-in user wrote the version in review.
   */
  protected readonly isAuthor = computed(() => this.latest()?.author === this.iamStore.currentUser()?.fullName);

  /**
   * Message after trying to sign.
   */
  protected readonly signResult = signal<'blocked' | 'approved' | null>(null);

  /**
   * Color of a version status chip.
   * @param status - Version status.
   */
  protected toneOf(status: string): string {
    return ({approved: 'chip-success', 'in-review': 'chip-warning', obsolete: 'chip-neutral'} as Record<string, string>)[status] ?? 'chip-info';
  }

  /**
   * Reviews and signs the version in review.
   */
  protected sign(): void {
    const version = this.latest();
    if (!version || version.status !== 'in-review') return;
    this.signResult.set(this.store.approveDocument(version) ? 'approved' : 'blocked');
  }
}
