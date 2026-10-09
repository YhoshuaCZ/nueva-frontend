import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
/**
 * Root component: sets up the languages and hosts the routed shells (public layout or workspace).
 */
export class App {
  protected readonly title = signal('IngesCompany-Frontend');
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.use(localStorage.getItem('language') ?? 'en');
  }
}
