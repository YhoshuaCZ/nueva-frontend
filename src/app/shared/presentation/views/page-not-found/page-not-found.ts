import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  imports: [TranslatePipe, MatButton, MatCard, MatIcon],
  selector: 'app-page-not-found',
  styleUrl: './page-not-found.css',
  templateUrl: './page-not-found.html',
})
/**
 * Displays fallback content for unknown routes.
 */
export class PageNotFound implements OnInit {
  protected invalidPath = '';
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit(): void {
    this.invalidPath = this.route.snapshot.url.map((url) => url.path).join('/');
  }

  /**
   * Navigates to the sign-in, the entry point of the Web Application.
   */
  protected navigateToHome() {
    this.router.navigate(['/sign-in']).then();
  }
}
