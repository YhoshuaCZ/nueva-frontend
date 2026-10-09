import {Component, computed, inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {TranslatePipe} from '@ngx-translate/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatDivider} from '@angular/material/divider';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {LanguageSwitcher} from '../language-switcher/language-switcher';
import {WorkspaceEnvironment, workspaceEnvironments} from '../../workspace-environments';
import {IamStore} from '../../../../iam/application/iam.store';
import {environment} from '../../../../../environments/environment';

/**
 * Frame of the signed-in pages: sidebar with the environment navigation, top bar and footer.
 */
@Component({
  selector: 'app-workspace-shell',
  imports: [
    RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe,
    MatSidenavContainer, MatSidenav, MatSidenavContent, MatToolbar, MatNavList, MatListItem,
    MatIcon, MatIconButton, MatDivider, MatMenu, MatMenuItem, MatMenuTrigger,
    LanguageSwitcher
  ],
  templateUrl: './workspace-shell.html',
  styleUrl: './workspace-shell.css'
})
export class WorkspaceShell {
  protected readonly iamStore = inject(IamStore);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  /**
   * Environment of the workspace, taken from the route data.
   */
  protected readonly environment = this.route.snapshot.data['environment'] as WorkspaceEnvironment;

  /**
   * Sidebar links of the environment.
   */
  protected readonly navigation = workspaceEnvironments[this.environment].navigation;

  /**
   * Whether the screen is narrow: the sidebar then opens over the content.
   */
  protected readonly isHandset = toSignal(
    inject(BreakpointObserver).observe('(max-width: 900px)').pipe(map(state => state.matches)),
    {initialValue: false}
  );

  /**
   * Signed-in user.
   */
  protected readonly user = this.iamStore.currentUser;

  /**
   * Today's date shown in the footer.
   */
  protected readonly today = computed(() => new Date().toISOString().slice(0, 10));

  /**
   * URL of the DoofPlus Landing Page.
   */
  protected readonly landingUrl = environment.landingPageUrl;

  /**
   * Closes the session.
   */
  protected signOut(): void {
    this.iamStore.signOut(this.router);
  }
}
