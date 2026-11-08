import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  categories: string[] = [
    'World',
    'Politics',
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
  ];
}