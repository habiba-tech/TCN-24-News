import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NewsItem = {
  category: string;
  title: string;
  desc: string;
  time: string;
  imageUrl: string;
  featured?: boolean; // big card
};

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.html',
  styleUrls: ['./news-card.css'],
})
export class NewsCard {
  @Input() item!: NewsItem;
}