import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Footer} from '../footer/footer';
import {Toolbar} from '../toolbar/toolbar';

@Component({
  imports: [RouterOutlet, Footer, Toolbar],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
/**
 * Frame of the public pages (sign-in and organization registration): toolbar, routed content and footer.
 */
export class Layout {}
