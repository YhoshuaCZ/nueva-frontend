import {Component, DestroyRef, DOCUMENT, inject, signal} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
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
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    // Screen readers read the page with the pronunciation of the active language (en-US or es-419).
    this.translate.onLangChange.pipe(takeUntilDestroyed(inject(DestroyRef))).subscribe(({lang}) =>
      this.document.documentElement.lang = lang === 'es' ? 'es-419' : 'en-US');
    this.translate.use(localStorage.getItem('language') ?? 'en');
  }
}
