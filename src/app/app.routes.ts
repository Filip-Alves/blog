import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'articles/:filename', component: ArticleDetailComponent },
  { path: '**', redirectTo: '' },
];
