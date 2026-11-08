import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { BreakingTicker } from './components/breaking-ticker/breaking-ticker';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    BreakingTicker,
    Footer,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}