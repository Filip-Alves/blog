// article-detail.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from '../article.service';
import { Article } from '../article/article.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss'],
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  article: Article | null = null;
  loading = true;
  error = false;
  faArrowLeft = faArrowLeft;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    // Récupérer le paramètre 'filename' de l'URL
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const filename = params.get('filename');

      if (filename) {
        this.loadArticle(filename);
      } else {
        this.error = true;
        this.loading = false;
      }
    });
  }

  loadArticle(filename: string): void {
    this.articleService
      .getArticleByFilename(filename)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (article) => {
          this.article = article;
          this.loading = false;
        },
        error: () => {
          this.error = true;
          this.loading = false;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
