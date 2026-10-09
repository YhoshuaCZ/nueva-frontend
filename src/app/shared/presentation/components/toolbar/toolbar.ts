import {Component} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {TranslatePipe} from '@ngx-translate/core';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {environment} from '../../../../../environments/environment';

/**
 * @summary Toolbar for Doofplus frontend.
 * @remarks Presentational component that has the logo of the brand, a link back to the Landing Page
 * and the language switcher. It is used in public views where the workspace sidebar is not required.
 * @author Doofplus
 */
@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatIcon, TranslatePipe, LanguageSwitcher],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css',
})
export class Toolbar {
  /** URL of the DoofPlus Landing Page. */
  protected readonly landingUrl = environment.landingPageUrl;
}
