// article.component.ts
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../article.service';
import { Article } from './article.model';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, RouterModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  @Input() article!: Article;
  faArrowRight = faArrowRight;
  private destroy$ = new Subject<void>();

  constructor(private articleService: ArticleService, private router: Router) {}

  ngOnInit(): void {
    this.articleService
      .getArticlesWithContent()
      .pipe(takeUntil(this.destroy$))
      .subscribe((articles) => {
        this.articles = articles;
      });
  }

  onClickReadMore() {
    this.router.navigateByUrl(`articles/${this.article.filename}`);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
