import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Video = {
  etag: string;
  id: string
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrls:{
    high:{
      url: string;
    },
    medium:{
      url: string;
    },
    default:{
      url: string;
    }
  };
  videoUrl: string;
}
export type ApiResponse = {
  success: boolean;
  message: string;
  data: Video[];
};
@Injectable({
  providedIn: 'root',
})

export class FetchVideo {

  private http = inject(HttpClient);
  url = 'http://localhost:5000/api/youtube/fetch';

  fetchVideos(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.url);
  }

}
