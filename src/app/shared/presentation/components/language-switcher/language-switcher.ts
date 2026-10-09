import {Component, inject, input} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
/**
 * Presentation component that switches the active UI language (EN / ES pill).
 */
export class LanguageSwitcher {
  private readonly translate = inject(TranslateService);

  /** Visual variant: light for public pages, dark for the workspace top bar. */
  readonly variant = input<'light' | 'dark'>('light');

  /** Supported language codes available to users. */
  protected readonly languages = ['en', 'es'];

  /** Currently selected language code, also when another page (such as the profile) changes it. */
  protected readonly currentLang = toSignal(this.translate.onLangChange.pipe(map(event => event.lang)),
    {initialValue: this.translate.getCurrentLang() ?? 'en'});

  /**
   * Changes the active application language and remembers it for the next visit.
   * @param language - Locale code to activate.
   */
  useLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
  }
}
