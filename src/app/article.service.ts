import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { Article } from './article/article.model';
import { marked } from 'marked';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  getArticlesList(): Observable<Article[]> {
    return this.http
      .get<Article[]>('/assets/articles/articles.json')
      .pipe(map((articles) => articles || []));
  }

  getArticleContent(article: Article): Observable<Article> {
    return this.http.get(article.path, { responseType: 'text' }).pipe(
      map((content) => {
        const htmlContent = this.sanitizer.bypassSecurityTrustHtml(
          marked.parse(content) as string
        );
        return { ...article, htmlContent };
      })
    );
  }

  getArticlesWithContent(): Observable<Article[]> {
    return this.getArticlesList().pipe(
      switchMap((articles) => {
        if (articles.length === 0) return [];

        // Utiliser forkJoin pour paralléliser les requêtes
        const contentRequests = articles.map((article) =>
          this.getArticleContent(article)
        );

        return forkJoin(contentRequests);
      })
    );
  }

  getArticleByFilename(filename: string): Observable<Article> {
    return this.getArticlesList().pipe(
      map((articles) => articles.find((a) => a.filename === filename)),
      switchMap((article) => {
        if (!article) throw new Error('Article not found');
        return this.getArticleContent(article);
      })
    );
  }
}
