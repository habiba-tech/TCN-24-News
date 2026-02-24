import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FetchVideo, Video } from '../../fetch-video';
import { NewsCard } from '../../components/news-card/news-card';

@Component({
  selector: 'app-home',
  imports:[NewsCard],
  templateUrl: './home.html',
})

export class Home {

  private fetchService = inject(FetchVideo);

  videos = signal<Video[]>([]);
  loading = true;
  error = '';
  
  featuredVideo = computed(() => this.videos()[0]);
  restVideos = computed(() => this.videos().slice(1));

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
