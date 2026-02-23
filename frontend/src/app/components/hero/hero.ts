import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
  hero = {
    tag: 'BREAKING NEWS',
    title: 'GLOBAL LEADERS CONVENE FOR HISTORIC CLIMATE SUMMIT',
    desc:
      'Representatives from 195 nations gather to negotiate ambitious environmental commitments expected by week’s end.',
    time: 'Updated 12 minutes ago',
    // For now using a placeholder image from public/ (you can replace later)
    imageUrl: 'hero.png',
  };
}