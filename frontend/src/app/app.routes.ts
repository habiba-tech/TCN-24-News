import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Category } from './pages/category/category';
import { NewsDetail } from './pages/news-detail/news-detail';
import { Search } from './pages/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'category/:name',
    component: Category,
  },
  {
    path: 'news/:id',
    component: NewsDetail,
  },
  {
    path: 'search',
    component: Search,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
