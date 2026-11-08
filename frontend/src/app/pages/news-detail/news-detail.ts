
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NewsService, News } from '../../services/news.service';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './news-detail.html',
  styleUrls: ['./news-detail.css']
})
export class NewsDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private newsService = inject(NewsService);

  article: News | null = null;
  loading = true;
  error = '';

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');

    if (!articleId) {
      this.error = 'Invalid news article.';
      this.loading = false;
      return;
    }

    this.newsService.getNews().subscribe({
      next: (data) => {
        this.article = data.find(news => news._id === articleId) || null;

        if (!this.article) {
          this.error = 'News article not found.';
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load article:', err);
        this.error = 'Unable to load news. Please try again later.';
        this.loading = false;
      }
    });
  }
}
