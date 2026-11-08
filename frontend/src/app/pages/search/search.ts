
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsService, News } from '../../services/news.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search {
  private newsService = inject(NewsService);

  keyword = '';
  results: News[] = [];
  loading = false;
  searched = false;
  error = '';

  search(): void {
    const searchTerm = this.keyword.trim();

    if (!searchTerm) {
      return;
    }

    this.loading = true;
    this.searched = true;
    this.error = '';
    this.results = [];

    this.newsService.searchNews(searchTerm).subscribe({
      next: (data) => {
        this.results = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.error = 'Unable to search news. Please try again.';
        this.loading = false;
      }
    });
  }
}
