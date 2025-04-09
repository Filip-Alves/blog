# 📘 Fiche Complète Angular 19

## 1. Introduction

Angular est un framework frontend open-source basé sur TypeScript, développé par Google. Il permet de construire des applications web performantes, modulaires et maintenables.

La version **Angular 19**, sortie en mars 2025, continue d'améliorer la performance, la simplicité, et introduit des fonctionnalités modernes comme les **Signal APIs** et des améliorations à **Standalone Components**.

---

## 2. Création d’un Projet Angular 19

### 2.1 Prérequis

- Node.js ≥ 18.x
- Angular CLI ≥ 19.x

### 2.2 Commande d’installation

```bash
npm install -g @angular/cli
```

### 2.3 Création du projet

```bash
ng new mon-projet --standalone --routing --style=scss
```

- `--standalone` : Utilise les nouveaux composants standalone (sans NgModule).
- `--routing` : Configure le routing dès le départ.
- `--style=scss` : Utilise SCSS pour le style.

---

## 3. Structure Moderne d’un Projet Angular

```plaintext
mon-projet/
├── src/
│   ├── app/
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── app.component.ts
│   │   ├── pages/
│   │   ├── components/
│   │   └── services/
│   ├── assets/
│   └── environments/
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 4. Standalone Components (Nouveauté majeure)

### Exemple de composant standalone

```ts
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule],
  template: `<h1>Bienvenue</h1>`,
})
export class HomeComponent {}
```

_💡 Plus besoin de déclarer ce composant dans un NgModule._

---

## 5. Routage Moderne avec Standalone Components

### app.routes.ts

```ts
import { Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "**",
    loadComponent: () => import("./pages/not-found/not-found.component").then((m) => m.NotFoundComponent),
  },
];
```

### app.config.ts

```ts
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig = [provideRouter(routes)];
```

### main.ts

```ts
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";

bootstrapApplication(AppComponent, {
  providers: appConfig,
});
```

---

## 6. Signal API (Angular 16+)

Permet de mieux gérer la réactivité sans `RxJS`.

```ts
import { signal, computed } from "@angular/core";

const count = signal(0);
const double = computed(() => count() * 2);

count.set(2);
console.log(double()); // 4
```

---

## 7. Services et Injection de Dépendances

### Exemple de service

```ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticated(): boolean {
    return true;
  }
}
```

---

## 8. Formulaires

### Reactive Forms (professionnel)

```ts
import { Component } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <input formControlName="email" />
      <input type="password" formControlName="password" />
    </form>
  `,
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: [""],
    password: [""],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.loginForm.value);
  }
}
```

---

## 9. HTTP Client

```ts
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get("/api/products");
  }
}
```

---

## 10. Best Practices

- ✅ **Utiliser les Standalone Components** : Pour simplifier la structure du projet.
- ✅ **Utiliser les Signaux pour la réactivité** : Moins verbeux et plus performant que RxJS.
- ✅ **Créer des composants réutilisables** dans `components/`.
- ✅ **Gérer la logique métier dans les services**.
- ✅ **Utiliser les environments (`environment.ts`)** pour les URLs et clés API.
- ✅ **Lazy load des pages et modules lourds**.
- ✅ **Utiliser SCSS + CSS encapsulé** pour des composants stylés localement.
- ✅ **Organiser par fonctionnalité (feature-based)** et non par type de fichier.

---

## 11. Outils recommandés

- [Angular CLI](https://angular.io/cli)
- [Angular DevTools](https://angular.io/guide/devtools)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Nx Monorepo](https://nx.dev/) (pour projets à grande échelle)

---

## 12. Ressources utiles

- [Documentation officielle Angular](https://angular.io/docs)
- [Angular Signals](https://angular.io/guide/signals)
- [Angular Standalone APIs](https://angular.io/guide/standalone-components)
- [RxJS (si nécessaire)](https://rxjs.dev)

---

_mis à jour avril 2025_
