import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Video } from '../../fetch-video';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.html',
  styleUrls: ['./news-card.css'],
})
export class NewsCard {
  video = input.required<Video>();
}
