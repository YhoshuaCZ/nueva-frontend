import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatCard} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {workspaceEnvironments} from '../../../../shared/presentation/workspace-environments';
import {EnvironmentIcon} from '../../components/environment-icon/environment-icon';
import {environment} from '../../../../../environments/environment';

/**
 * First sign-in page: the user chooses the environment of their role.
 */
@Component({
  selector: 'app-environment-selection',
  imports: [RouterLink, TranslatePipe, MatCard, MatButton, MatIcon, EnvironmentIcon],
  templateUrl: './environment-selection.html',
  styleUrl: './environment-selection.css'
})
export class EnvironmentSelection {
  /**
   * The three environments, in the order of the mock-up.
   */
  protected readonly environments = Object.values(workspaceEnvironments).map(item => ({
    ...item,
    summary: item.features.slice(0, 4)
  }));

  /**
   * Plans section of the Landing Page.
   */
  protected readonly plansUrl = `${environment.landingPageUrl}#plans`;
}
