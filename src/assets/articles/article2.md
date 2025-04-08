# Angular

Angular est un framework front-end complet.

Angular est un framework **basé sur TypeScript** open-source développé par Google qui permet de **créer des applications web dynamiques**. Il utilise une architecture basée sur des **composants**, intègre un **système de templating**, et offre des fonctionnalités comme la **liaison de données bidirectionnelle**, **l'injection de dépendances**, et le **routage**. Angular facilite le développement d'applications web complexes en proposant une structure robuste et des outils intégrés pour les tests et la gestion d'état.

## Commande à retenir

`ng new appName`

Génère une app Angular, installe les dépendances et initialise un dépôt Git

`ng serve`

**Compile l’application**, **lance un serveur** de dev en local et **recharge automatiquement** la page en cas de modification

`ng generate component componentName`

**Génère un composant** `componentName`, créer un sous-dossier et plusieurs fichiers (ts, html, css)

## Fonctionnement d’Angular

Fichier principal (comme pour tous les sites) est le index.html

qui contient uniquement une balise app-root dans la balise body

La balise app-root correspond à la racine de l’application ou plus précisément à l'AppComponent (qui est le composant principal de l’application) et on peut voir dans le app.component.ts qu’il affiche le fichier app.component.html

## Notions Angular

### **Component**

C’est un **élément réutilisable** qui gère une partie de l'interface utilisateur.

Exemple de composant généré avec `ng generate component face-snap`

```tsx
import { Component } from "@angular/core";

@Component({
  selector: "app-face-snap",
  standalone: true,
  imports: [],
  templateUrl: "./face-snap.component.html",
  styleUrl: "./face-snap.component.scss",
})
export class FaceSnapComponent {}
```

- `FaceSnapComponent` est une classe Typescript
- `@Component` est un décorateur qui permet de préciser que la classe est un composant Angular
- `selector` définit le nom de la balise html pour utiliser le composant (<app-face-snap>)
- `standalone: true` rend le composant indépendant (sans module), simplifie l’architecture.
- `imports` permet d’importer des composants si nécessaire
- `templateUrl` contient le fichier HTML du composant

### **Afficher les données**

Il faut d’abord déclaré et initialiser (avec la méthode `ngOnInit`) des propriété dans la classe

`ngOnInit` est un hook de cycle de vie, il est appelé automatiquement après la création du composant.

```tsx
import { Component, OnInit } from "@angular/core";

export class FaceSnapComponent implements OnInit {
  // Déclaration des propriétés avec le non-null assertion operator (!)
  title!: string;
  description!: string;
  createdAt!: Date;
  snaps!: number;
  imageUrl!: string;

  constructor() {
    // Le constructeur reste généralement vide ou contient des injections de dépendances
  }

  ngOnInit() {
    // Initialisation des propriétés après la création du composant
    this.title = "Paul";
    this.description = "Mon meilleur ami depuis toujours !";
    this.createdAt = new Date();
    this.snaps = 5;
    this.imageUrl = "https://example.com/image.jpg";
  }
}
```

Affichage avec **string interpolation**

Utilise les doubles accolades `{{ }}` pour insérer des valeurs TypeScript dans le HTML.

```html
<h2>{{ title }}</h2>
<p>{{ description }}</p>
<p>FaceSnap créée le {{ createdAt }}</p>
<p>👍 {{ snaps }}</p>
```

Affichage avec **property binding (affichage dynamique)**

Utilise les crochets `[ ]` pour lier une propriété TypeScript à un attribut HTML.

```html
<img [src]="imageUrl" [alt]="title" />
```

Cette approche est nécessaire pour les attributs qui nécessitent des valeurs dynamiques plutôt que des chaînes de caractères statiques.

### Communication entre composants avec @Input()

Pour qu'une propriété puisse être injectée **depuis l'extérieur** d'un component, il faut lui ajouter le décorateur  `@Input()` (dans le composant enfant)

```tsx
@Input() faceSnap!: FaceSnap;
```

```html
<app-face-snap [faceSnap]="mySnap"></app-face-snap>
<app-face-snap [faceSnap]="myOtherSnap"></app-face-snap>
<app-face-snap [faceSnap]="myLastSnap"></app-face-snap>
```

- `[faceSnap]` : C'est une **liaison de propriété** (_property binding_).
- `faceSnap` : C'est une **propriété d'entrée** (_Input property_) du composant `<app-face-snap>`.
- `"mySnap"` : C'est une variable provenant du composant parent, qui est transmise au composant `<app-face-snap>`

```tsx
export class AppComponent {
  mySnap!: FaceSnap;

  ngOnInit(): void {
    this.mySnap = new FaceSnap("Paul", "Mon meilleur ami depuis toujours!", "https://cdn.pixabay.com/photo/2015/05/31/16/03/teddy-bear-792273_1280.jpg", new Date(), 10);
  }
}
```

### **Réagir aux événements**

Pour exécuter une méthode lorsqu'un événement se produit sur un élément HTML, on place l’événement entre parenthèses `()` et on indique le nom de la méthode à appeler.

```html
<button (click)="onLike()">{{ likedButtonText }}</button>
```

```tsx
onLike(): void {
    if (!this.userLiked) {
      this.like();
    } else {
      this.unlike();
    }
  }
```

### **Control flow blocks**

`@if` : **Permet d’ajouter ou non** (en fonction d’une condition TypeScript) **du contenu** (html, composant, texte). Il existe également `@else` si besoin.

```html
@if (faceSnap.location) {
<p>Localisation: {{ faceSnap.location }}</p>
} @else {
<p>Localisation non spécifiée</p>
}
```

`@for` : Permet d’insérer des éléments dans le DOM (la page web) en itérant sur un tableau.

Le paramètre `track` (obligatoire) demande une propriété qui sera unique pour chaque élément du tableau (comme l’ID de l’élément, s’il en a un)
Avec `track`, Angular compare les identifiants et ne met à jour que les éléments modifiés, évitant ainsi de recréer toute la liste à chaque changement. Cela améliore les performances et réduit les manipulations inutiles du DOM. ✅

```html
@for (faceSnap of faceSnaps; track faceSnap.title) {
<app-face-snap [faceSnap]="faceSnap" />
}
```

### **Ajoutez du style dynamique avec des directives**

Une directive est une classe TypeScript qui ajoute du comportement supplémentaire à un élément HTML (ou à un composant). Il existe différents types de directives, telles que les directives **d'attributs** (comme `ngStyle` ou `ngClass`) qui modifient les propriétés des éléments HTML.

`ngStyle` : **Fonctionne comme la liaison par attribut** sauf qu’elle **permet d'appliquer des styles CSS dynamiquement** à un élément HTML en fonction d'une expression ou d'une variable. Il lie un objet JavaScript aux propriétés CSS de l'élément.

```html
<span [ngStyle]="{ color: 'rgb(0, ' + faceSnap.likes + ', 0)' }">👍 {{ faceSnap.likes }}</span>
```

Ici, la couleur de l'élément `<span>` changera dynamiquement en fonction du nombre de likes.

`ngClass` : **Permet d’ajouter dynamiquement des classes** à des éléments HTML **en fonction d’une condition**.

```html
<div class="face-snap-card" [ngClass]="{ 'snapped':  userLiked}"></div>
```

Dans cet exemple, la classe `snapped` sera ajoutée à l'élément `<div>` si `userLiked` est vrai, permettant ainsi de modifier le style de l'élément.

### **Formatage de données**

On peut formater les données sans les modifier grâce aux pipes.

**Pour le formatage texte simple** (la casse), il y a 3 types de pipes.

`UpperCasePipe` , `LowerCasePipe` et `TitleCasePipe`

Il faut d’abord les importer dans notre composant, puis les utiliser dans notre HTML.

```html
imports: [ UpperCasePipe, LowerCasePipe, TitleCasePipe ],
```

```html
<h2>{{ "mon titre" | titlecase }}</h2>
<!-- Mon Titre -->
```

**Pour le formatage de dates**, il y a DatePipe, qui permet de formater les dates avec ou sans configuration.

```html
<p>FaceSnap créée le {{ faceSnap.createdAt | date }}</p>
```

Avec la valeur par défaut, le résultat sera `FaceSnap créée le 14 mars 2025`

```html
<p>FaceSnap créée le {{ faceSnap.createdAt | date: 'shortDate' }}</p>
```

On peut ajouter une configuration prédéfinie comme `shortDate` , qui donne ce résultat
`FaceSnap créée le 14/03/2025` .

```html
<p>FaceSnap créée le {{ faceSnap.createdAt | date: 'd MMMM yyyy, à HH:mm' }}</p>
```

On peut aussi passer une chaîne de caractères définissant un format personnalisé, qui donne ce résultat `FaceSnap créé le 14 mars 2025, à 15:30` .

**Pour le formatage des nombres**, il y a 3 types de pipes qui sont `DecimalPipe` , `PercentPipe` et `CurrencyPipe` qui nécessitent d’être importés dans le component.

`DecimalPipe` : Permet de formater l’affichage des nombres à virgules et de notamment arrondir ceux-ci.

`PercentPipe` : Permet de formaté l’affichage des nombres entre 0 et 1, pour qu’il correspondent à des valeurs en pourcentages (permet également d’arrondir si on le souhaite).

`CurrencyPipe` : Permet de formaté l’affichage des montants d’argents et de préciser la devise.

```html
<p>{{ 4346234.3678 | number: '1.0-2' }}</p>
<!-- 4 346 234,37 -->
<p>{{ 0.48741 | percent: '1.0-5' }}</p>
<!-- 48,741 % -->
<p>{{ 499.9 | currency: 'EUR' : 'code' }}</p>
<!-- 499,90 EUR -->
```

### Changer la locale par défaut

Par défaut, Angular utilise la locale **`en-US`**. Pour modifier cette configuration et adopter une autre locale, comme le **français (`fr-FR`)**, il faut suivre **deux étapes**.

Changer la locale affecte notamment **les pipes de formatage** (`DatePipe`, `CurrencyPipe`, `DecimalPipe`, etc.), qui utiliseront alors les conventions du pays choisi.

1. Dans le `main.ts` , enregistrez les données de locale  `fr`

```tsx
import { registerLocaleData } from "@angular/common";
import * as fr from "@angular/common/locales/fr"; // Importer la locale française

registerLocaleData(fr.default); // Enregistrer la locale 'fr'

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err)); //...
```

1. Puis choisissez la locale `fr` dans  `app.config.ts`

```tsx
import { ApplicationConfig, LOCALE_ID } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: "fr-FR" }, // Définir la locale globale
  ],
};
```

### Partager les données avec les Services

Les services permettent de **centraliser la gestion des données et la logique métier** dans votre application Angular. Ils sont souvent utilisés pour **partager des informations** entre plusieurs composants et pour **communiquer avec une API**.

Un service Angular est une simple classe **décorée avec** `@Injectable()`, ce qui permet son injection dans d'autres parties de l'application.

```tsx
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root", // Rend ce service accessible partout dans l'application
})
export class myService {}
```

Pour injecter un service dans un component, ajoutez un argument au constructeur du component qui a le type du service, par exemple `constructor(private userService: UserService) {}`

### **Centralisez votre logique avec les Services**

Centraliser les interactions dans un service sous forme de méthodes crée une structure plus modulaire, qui facilite la maintenance et les évolutions de votre application.

Comme dans toute base de code, refactorisez pour éviter de répéter des blocs de code (le principe DRY : *Don't Repeat Yourself*).

Les literal types permettent de créer rapidement des types personnalisés, souvent utilisés pour limiter les choix pour un argument de méthode, par exemple : `fileType: 'image' | 'video'`

### Utiliser des routes

Dans le projet Angular il y a un fichier app.routes.ts, qui permet d’associer une route (path) à un composant. Routes est un tableau d’objets où chaque objet représente une route.

```tsx
import { Routes } from "@angular/router";
import { FaceSnapListComponent } from "./face-snap-list/face-snap-list.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

export const routes: Routes = [
  { path: "", component: LandingPageComponent },
  { path: "facesnaps", component: FaceSnapListComponent },
];
```

Dans le fichier `app.config.ts` on appelle `provideRouter` en passant le tableau de routes pour enregistrer les routes dans le routeur Angular (fait par défaut lorsqu’on génère une app Angular).

```tsx
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // ici
  ],
};
```

Pour utiliser les routes il faut d’abord les importé dans notre `*app.component.ts*`
`imports: [HeaderComponent, RouterOutlet]` puis l’ajouter dans notre template html `app.component.html`

```tsx
<app-header />
<router-outlet />
```

### **Passer d’une route à une autre**

On peut créer des liens qui permettent de passer d’une route à l’autre avec `routerLink` (il faut l’importé dans le module)

On peut ajouter des classes CSS aux liens correspondants à la route activée avec `RouterLinkActive`

Ignorez l'activation des routes enfants avec  `[routerLinkActiveOptions]="{ exact: true }"`.

```html
<nav>
  <a routerLink="" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
  <a routerLink="facesnaps" routerLinkActive="active">FaceSnaps</a>
</nav>
```

Autre méthode injectez le Router dans vos components et utilisez sa méthode  `navigateByUrl()`  pour de la navigation programmatique.

```tsx
 constructor(private router: Router){}

  onContinue(): void {
    this.router.navigateByUrl("facesnaps");
  }
```

```html
<button (click)="onContinue()">Continuer vers Snapface</button>
```

### Activer les routes avec ActivatedRoute (utilisation de paramètre dans l’url)

On récupère les paramètres de la route activée en injectant ActivatedRoute, et via son objet  `snapshot.params`.

```tsx
private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id']; // ici
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
}
```

```tsx
getFaceSnapById(faceSnapId: string): FaceSnap {
    const foundFaceSnap = this.facesnaps.find(faceSnap => faceSnap.id === faceSnapId);
    if (!foundFaceSnap) {
      throw new Error('FaceSnap not found!');
    }
    return foundFaceSnap;
}
```

### Hors contexte notions TypeScript

Dans Angular (et TypeScript en général), lorsqu'on **déclare des paramètres du constructeur avec `public`**, TypeScript **crée automatiquement les propriétés de la classe et les assigne** sans avoir besoin de les déclarer séparément.

```tsx
export class FaceSnap {
  constructor(public title: string, public description: string, public imageUrl: string, public createdAt: Date, public snaps: number) {}
}
```

qui est équivalent à ce code

```tsx
export class FaceSnap {
  title: string;
  description: string;
  createdDate: Date;
  snaps: number;
  imageUrl: string;

  constructor(title: string, description: string, imageUrl: string, createdDate: Date, snaps: number) {
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.createdDate = createdDate;
    this.snaps = snaps;
  }
}
```

Le `!` en TypeScript est une **assertion de non-nullité** qui indique à TypeScript que la variable sera **forcément initialisée avant d’être utilisée**, même s’il ne peut pas le vérifier lui-même (à la compilation).

```tsx
mySnap!: FaceSnap;
likedButtonText!: string;
```

Il est possible d’ajouter des propriétés optionnel (peux ne rien contenir) en ajoutant un `?`

```tsx
location?: string;
```
