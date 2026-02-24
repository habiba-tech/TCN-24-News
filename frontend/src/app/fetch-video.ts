import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Video = {
  id:string,
  etag:string,
  title:string,
  description:string,
  publishedAt:string,
  thumbnail:string
  videoUrl:string
}

type ApiResponse = {
  success:boolean,
  message:string,
  data:Video[]
}

@Injectable({
  providedIn: 'root',
})
export class FetchVideo {
  
  http = inject(HttpClient)

  url = "http://localhost:5000/api/youtube/fetch"

  fetchVideo():Observable<ApiResponse>{
    return this.http.get<ApiResponse>(this.url)
  }
}
