import {Component, input} from '@angular/core';

/**
 * Breadcrumb, title, subtitle and actions shown at the top of every workspace page.
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.html',
  styleUrl: './page-header.css'
})
export class PageHeader {
  /** Breadcrumb items, already translated. */
  readonly breadcrumb = input<string[]>([]);

  /** Page title. */
  readonly title = input.required<string>();

  /** Short description below the title. */
  readonly subtitle = input<string>('');
}
