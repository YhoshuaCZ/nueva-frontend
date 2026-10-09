import {Component, input} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {WorkspaceEnvironment} from '../../../../shared/presentation/workspace-environments';

/**
 * Material icon of each environment: flask (QA/QC), robotic arm (Production) and shield (Administration).
 */
const icons: Record<WorkspaceEnvironment, string> = {
  qa: 'science',
  production: 'precision_manufacturing',
  administration: 'admin_panel_settings'
};

/**
 * Round icon of an environment, as shown in the environment cards and the sign-in panel.
 */
@Component({
  selector: 'app-environment-icon',
  imports: [MatIcon],
  template: `
    <span class="icon" [class]="environment()" [class.small]="size() === 'small'" [class.inverse]="inverse()">
      <mat-icon aria-hidden="true">{{ icons[environment()] }}</mat-icon>
    </span>`,
  styles: `
    .icon { display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; border-radius: 50%; }
    .icon .mat-icon { width: 30px; height: 30px; font-size: 30px; }
    .icon.small { width: 18px; height: 18px; background: none !important; }
    .icon.small .mat-icon { width: 18px; height: 18px; font-size: 18px; }
    .qa { background: var(--mint); color: var(--teal); }
    .production { background: var(--blue-pale); color: var(--blue); }
    .administration { background: #f1f5f9; color: var(--slate); }
    .inverse { background: rgba(255, 255, 255, 0.18); color: #fff; }
  `
})
export class EnvironmentIcon {
  /**
   * Material icon names by environment.
   */
  protected readonly icons = icons;

  /**
   * Environment whose icon is shown.
   */
  readonly environment = input.required<WorkspaceEnvironment>();

  /**
   * Size of the icon: large circle or small inline icon.
   */
  readonly size = input<'large' | 'small'>('large');

  /**
   * White icon over a translucent circle, for colored panels.
   */
  readonly inverse = input<boolean>(false);
}
