import {Component, computed, inject, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {PageHeader} from '../../../../shared/presentation/components/page-header/page-header';
import {QualityStore} from '../../../application/quality.store';
import {CollaborationTask} from '../../../domain/model/collaboration-task.entity';
import {IamStore} from '../../../../iam/application/iam.store';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

/**
 * Tasks and collaboration: task inbox, task assignment and the discussion of a record. Comments are not approvals.
 */
@Component({
  selector: 'app-task-collaboration',
  imports: [MatCard, MatButton, MatTableModule, MatFormField, MatLabel, MatInput, MatSelect, MatOption, DatePipe, ReactiveFormsModule, TranslatePipe, PageHeader],
  templateUrl: './task-collaboration.html',
  styleUrl: './task-collaboration.css'
})
export class TaskCollaboration {
  protected readonly store = inject(QualityStore);
  protected readonly iamStore = inject(IamStore);

  /**
   * Record whose discussion is shown.
   */
  protected readonly recordCode = signal('DEV-26017');

  /**
   * Tasks of the signed-in user.
   */
  protected readonly myTasks = computed(() =>
    this.store.tasks().filter(task => task.owner === this.iamStore.currentUser()?.fullName && task.status !== 'done'));

  /**
   * Tasks waiting for an approval.
   */
  protected readonly approvals = computed(() => this.store.tasks().filter(task => task.title.startsWith('Approve')).length);

  /**
   * Comments of the record.
   */
  protected readonly comments = computed(() => this.store.commentsOf(this.recordCode())());

  /**
   * Comment being written.
   */
  protected readonly comment = new FormControl('', {nonNullable: true});

  /**
   * Task assignment form.
   */
  protected readonly form = new FormGroup({
    title: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    recordCode: new FormControl('DEV-26017', {nonNullable: true, validators: [Validators.required]}),
    owner: new FormControl('', {nonNullable: true, validators: [Validators.required]}),
    dueAt: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  });

  /**
   * Color of a task status chip.
   * @param status - Task status.
   */
  protected toneOf(status: string): string {
    return ({'in-review': 'chip-teal', ready: 'chip-success', pending: 'chip-warning', done: 'chip-success'} as Record<string, string>)[status] ?? 'chip-neutral';
  }

  /**
   * Assigns the task.
   */
  protected assign(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    this.store.addTask(new CollaborationTask({
      id: 0, title: value.title.trim(), recordCode: value.recordCode.trim(), detail: `Assigned by ${this.iamStore.currentUser()?.fullName ?? ''}`,
      owner: value.owner, dueAt: new Date(value.dueAt).toISOString(), status: 'to-do'
    }));
    this.form.reset({title: '', recordCode: value.recordCode, owner: '', dueAt: ''});
  }

  /**
   * Posts the comment in the discussion.
   */
  protected send(): void {
    const text = this.comment.value.trim();
    if (!text) return;
    this.store.addComment(this.recordCode(), text);
    this.comment.reset();
  }
}
