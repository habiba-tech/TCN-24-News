import { Component } from '@angular/core';

import { Navbar } from './components/navbar/navbar';
import { BreakingTicker } from './components/breaking-ticker/breaking-ticker';
import { Hero } from './components/hero/hero';
import { Home } from './pages/home/home';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Navbar, BreakingTicker, Hero, Home,Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {}