import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCard, NewsItem } from '../../components/news-card/news-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NewsCard],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  topRow: NewsItem[] = [
    {
      category: 'Politics',
      title: 'Senate passes landmark infrastructure bill after months of negotiations',
      desc: 'A bipartisan push moves forward with major funding for roads, bridges and broadband.',
      time: '2 hours ago',
      imageUrl: 'news1.png',
      featured: true,
    },
    {
      category: 'Business',
      title: 'Markets rally as central bank signals stable interest rates',
      desc: 'Investors respond positively to steady policy outlook and easing inflation.',
      time: '3 hours ago',
      imageUrl: 'news2.png',
    },
    {
      category: 'Technology',
      title: 'AI revolution: new breakthrough in autonomous systems',
      desc: 'Researchers reveal a leap forward that could transform next-gen automation.',
      time: '4 hours ago',
      imageUrl: 'news3.png',
    },
  ];

  secondRow: NewsItem[] = [
    {
      category: 'Sports',
      title: 'Championship finals set after thrilling semifinal matchups',
      desc: 'Two powerhouse teams advance after dramatic victories and strong performances.',
      time: '5 hours ago',
      imageUrl: 'news4.png',
    },
    {
      category: 'World',
      title: 'Historic climate talks resume with key decisions expected',
      desc: 'Delegates meet again as deadlines approach and negotiations intensify.',
      time: '6 hours ago',
      imageUrl: 'news5.png',
    },
    {
      category: 'Entertainment',
      title: 'Blockbuster season: biggest releases and what to watch next',
      desc: 'Studios line up major titles as audience excitement builds worldwide.',
      time: '7 hours ago',
      imageUrl: 'news6.png',
    },
  ];
}