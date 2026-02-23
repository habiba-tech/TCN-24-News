import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-breaking-ticker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './breaking-ticker.html',
  styleUrls: ['./breaking-ticker.css'],
})
export class BreakingTicker {
  headlines: string[] = [
    'Markets surge as economic indicators show strong recovery',
    'Climate summit reaches historic agreement on emissions reduction',
    'Tech giants announce major AI safety coalition',
    'International sports federation reveals 2026 championship host',
  ];
}