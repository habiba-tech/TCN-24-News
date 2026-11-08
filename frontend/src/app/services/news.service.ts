
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface News {
  _id: string;
  title: string;
  description: string;
  image?: string;
  videoUrl?: string;
  source?: string;
  sourceUrl?: string;
  category?: {
    _id: string;
    name: string;
  };
  publishedAt?: string;
  createdAt?: string;
  isBreaking?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private http = inject(HttpClient);

  private apiUrl = '/api/news';

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.apiUrl);
  }

  searchNews(keyword: string): Observable<News[]> {
    return this.http.get<News[]>(
      `${this.apiUrl}/search?keyword=${encodeURIComponent(keyword)}`
    );
  }
}
