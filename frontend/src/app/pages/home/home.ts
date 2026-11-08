import { Component, inject, signal } from '@angular/core';

import { FetchVideo, Video } from '../../fetch-video';
import { NewsCard } from '../../components/news-card/news-card';
import { Hero } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NewsCard, Hero],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

  private fetchService = inject(FetchVideo);

  videos = signal<Video[]>([]);
  loading = true;
  error = '';

  ngOnInit(): void {
    this.fetchVideos();
  }

  fetchVideos() {
    this.fetchService.fetchVideo().subscribe({
      next: (res) => {
        this.videos.set(res.data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load videos';
        this.loading = false;
        console.error(err);
      }
    });
  }
}