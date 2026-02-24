import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  sections = [
    'World',
    'Politics',
    'Business',
    'Technology',
    'Sports',
    'Entertainment',
  ];

  year = new Date().getFullYear();
}