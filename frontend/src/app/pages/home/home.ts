import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FetchVideo, Video } from '../../services/fetch-video';
import { CommonModule } from '@angular/common';
// import { Card } from "../../components/card/card";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  videosService = inject(FetchVideo);

  videos:Video[] = [];

  trackById(index: number, video: Video) {
  return video.id;
}

cd = inject(ChangeDetectorRef);

ngOnInit() {
  this.videosService.fetchVideos().subscribe({
    next: (response) => {
      console.log('FULL RESPONSE:', response);
      console.log('RESPONSE.DATA:', response?.data);
      console.log('IS ARRAY:', Array.isArray(response?.data));

      this.videos = response?.data || [];
        this.cd.detectChanges(); 

      console.log('VIDEOS AFTER ASSIGN:', this.videos);
      console.log('VIDEOS LENGTH:', this.videos.length);
    },
    error: (err) => {
      console.error('ERROR:', err);
    }
  });
}

}
