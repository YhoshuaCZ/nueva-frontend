import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManufacturingStore } from '../../../application/manufacturing.store';
import { Batch } from '../../../domain/model/batch.entity';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-batch-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './batch-list.html',
  styleUrl: './batch-list.css'
})
export class BatchList implements OnInit {
  batches: Array<Batch> = [];

  private store = inject(ManufacturingStore);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.store.batches$.subscribe(data => {
      this.batches = data;
      this.cdr.detectChanges();
    });

    this.store.loadBatches();
  }
}
