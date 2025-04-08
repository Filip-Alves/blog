import { SafeHtml } from '@angular/platform-browser';

export interface Article {
  title: string;
  filename: string;
  path: string;
  description: string;
  date: string;
  tags: string[];
  htmlContent?: SafeHtml;
}
