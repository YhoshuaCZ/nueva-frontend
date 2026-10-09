import {Component} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  imports: [TranslatePipe],
  styleUrl: './footer.css'
})
/**
 * Shared presentation component rendering the footer of the public pages, with the legal links.
 */
export class Footer {
  /** URL of the DoofPlus Landing Page, which hosts the legal pages. */
  protected readonly landingUrl = environment.landingPageUrl;
}
