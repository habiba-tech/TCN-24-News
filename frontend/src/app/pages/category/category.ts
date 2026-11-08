import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FetchVideo, Video } from '../../fetch-video';
import { NewsCard } from '../../components/news-card/news-card';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, NewsCard],
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
})
export class Category implements OnInit {
  private route = inject(ActivatedRoute);
  private fetchService = inject(FetchVideo);
  private cdr = inject(ChangeDetectorRef);

  categoryName = '';
  videos: Video[] = [];
  filteredVideos: Video[] = [];

  loading = true;
  error = '';

  private readonly categoryKeywords: Record<string, string[]> = {
    world: [
      'international', 'world news', 'global',
      'अंतरराष्ट्रीय', 'विदेश', 'वैश्विक',
      'संयुक्त राष्ट्र', 'यूक्रेन', 'इजराइल', 'गाजा'
    ],

    politics: [
      'politics', 'political', 'election', 'minister',
      'mla', 'mp', 'parliament', 'government',
      'विधायक', 'सांसद', 'चुनाव', 'राजनीति',
      'मंत्री', 'सरकार', 'विधानसभा', 'लोकसभा',
      'राज्यसभा', 'भाजपा', 'कांग्रेस', 'आरएसएस',
      'मुख्यमंत्री', 'प्रधानमंत्री', 'विपक्ष', 'rss'
    ],

    business: [
      'business', 'economy', 'market', 'company',
      'industry', 'stock market', 'व्यापार',
      'अर्थव्यवस्था', 'बाजार', 'उद्योग', 'कंपनी',
      'शेयर बाजार'
    ],

    technology: [
      'technology', 'tech news', 'artificial intelligence',
      'software', 'smartphone', 'mobile technology',
      'तकनीक', 'टेक्नोलॉजी', 'आर्टिफिशियल इंटेलिजेंस',
      'सॉफ्टवेयर', 'मोबाइल तकनीक'
    ],

    sports: [
      'sports', 'cricket', 'football', 'hockey',
      'tennis', 'match', 'tournament', 'खेल',
      'क्रिकेट', 'फुटबॉल', 'हॉकी', 'टूर्नामेंट'
    ],

    entertainment: [
      'entertainment', 'bollywood', 'film', 'movie',
      'actor', 'actress', 'cinema', 'celebrity',
      'मनोरंजन', 'बॉलीवुड', 'फिल्म', 'अभिनेता',
      'अभिनेत्री', 'सिनेमा'
    ],
  };

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.categoryName = (params.get('name') || '').toLowerCase();
      this.filterVideos();
      this.cdr.markForCheck();
    });

    this.fetchService.fetchVideo().subscribe({
      next: (response) => {
        this.videos = response.data || [];
        this.filterVideos();
        this.loading = false;
        this.cdr.markForCheck();

        console.log('TCN24 videos received:', this.videos.length);
        console.log('Category:', this.categoryName);
        console.log('Matching videos:', this.filteredVideos.length);
      },

      error: (err) => {
        console.error('Failed to load YouTube videos:', err);
        this.error = 'Unable to load TCN24 YouTube videos. Please try again later.';
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private filterVideos(): void {
    const keywords = this.categoryKeywords[this.categoryName] || [];

    this.filteredVideos = this.videos.filter((video) => {
      const content = `${video.title || ''} ${video.description || ''}`
        .toLowerCase();

      return keywords.some((keyword) =>
        content.includes(keyword.toLowerCase())
      );
    });
  }
}
