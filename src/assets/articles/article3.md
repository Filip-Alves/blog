<!--
Note: L'erreur précédente était due à l'utilisation de délimiteurs identiques (trois backticks) pour le bloc de code externe et les blocs internes. Lorsque le parseur rencontre les mêmes délimiteurs, il ferme le bloc extérieur trop tôt. Pour éviter cela, j'utilise ici quatre backticks pour le bloc global, ce qui permet d'inclure des blocs de code utilisant trois backticks à l'intérieur sans rompre la structure.
-->

# 📘 Fiche Complète Java

## 1. Introduction

Java est un langage de programmation orienté objet, compilé et fortement typé. Il est largement utilisé pour développer des applications de bureau, web, mobiles ou encore embarquées. Sa philosophie "écrire une fois, exécuter partout" (WORA) permet de compiler le code en bytecode qui est ensuite exécuté sur la JVM (Java Virtual Machine).

---

## 2. Structure de Base

### Programme Minimal

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
```

_Explication :_  
Le point d'entrée d'une application Java se trouve dans la méthode `main`.  
La classe `HelloWorld` est publique, ce qui permet à la JVM de la reconnaître et de l'exécuter.

---

## 3. Variables, Types et Opérateurs

### Types de Données Primitifs et Références

| Type      | Description                   | Exemple                 |
| --------- | ----------------------------- | ----------------------- |
| `int`     | Entier                        | `int age = 25;`         |
| `double`  | Nombre à virgule flottante    | `double pi = 3.14;`     |
| `boolean` | Valeur booléenne (true/false) | `boolean actif = true;` |
| `char`    | Caractère unique              | `char lettre = 'A';`    |
| `String`  | Chaîne de caractères (objet)  | `String nom = "Java";`  |

### Variables et Constantes

```java
int x = 10;              // Variable
final int MAX = 100;     // Constante (la valeur ne peut être modifiée)
```

### Opérateurs Courants

- **Mathématiques** : `+`, `-`, `*`, `/`, `%`
- **Comparaison** : `==`, `!=`, `<`, `>`, `<=`, `>=`
- **Logiques** : `&&` (ET), `||` (OU), `!` (NON)

---

## 4. Structures de Contrôle

### Conditions

```java
if (x > 0) {
    System.out.println("Positif");
} else if (x < 0) {
    System.out.println("Négatif");
} else {
    System.out.println("Zéro");
}
```

_Explication :_  
Utilisation de `if-else` pour contrôler le flux d'exécution en fonction de conditions.

### Boucles

#### Boucle `while`

```java
int i = 0;
while (i < 5) {
    System.out.println("i vaut " + i);
    i++;
}
```

#### Boucle `for`

```java
for (int i = 0; i < 5; i++) {
    System.out.println("i vaut " + i);
}
```

_Explication :_  
Les boucles permettent de répéter des opérations plusieurs fois tant qu'une condition est vraie.

---

## 5. Fonctions (Méthodes)

### Définir et Appeler une Méthode

```java
public static int carre(int x) {
    return x * x;
}

// Appel
int resultat = carre(5); // renvoie 25
```

_Explication :_  
La méthode `carre` prend un entier en paramètre et retourne son carré. Le mot-clé `static` permet d'appeler la méthode sans créer d'instance de la classe.

---

## 6. Programmation Orientée Objet (POO)

### Classes et Objets

```java
public class Personne {
    String nom;
    int age;

    // Constructeur
    public Personne(String nom, int age) {
        this.nom = nom;
        this.age = age;
    }

    public void sePresenter() {
        System.out.println("Je m'appelle " + nom + " et j'ai " + age + " ans.");
    }
}

// Création d'un objet
Personne p = new Personne("Alice", 30);
p.sePresenter();
```

_Explication :_  
Une classe définit un modèle ou un plan, et un objet en est une instance concrète.

### Encapsulation

```java
public class Compte {
    private double solde;

    public double getSolde() {
        return solde;
    }

    public void deposer(double montant) {
        if (montant > 0) {
            solde += montant;
        }
    }
}
```

_Explication :_  
L'encapsulation permet de protéger les données en les déclarant privées et en fournissant des méthodes d'accès (getters/setters).

### Héritage

```java
public class Animal {
    public void parler() {
        System.out.println("L'animal fait un bruit");
    }
}

public class Chien extends Animal {
    @Override
    public void parler() {
        System.out.println("Le chien aboie");
    }
}
```

_Explication :_  
L'héritage permet à une classe (sous-classe) de bénéficier des attributs et méthodes d'une autre (super-classe), tout en pouvant les redéfinir.

### Interfaces

```java
public interface Volant {
    void voler();
}

public class Avion implements Volant {
    public void voler() {
        System.out.println("L'avion vole !");
    }
}
```

_Explication :_  
Les interfaces définissent un contrat que les classes doivent respecter, favorisant la flexibilité et la modularité du code.

---

## 7. Notions Avancées

### 7.1 Packages et Importations

Les packages organisent les classes dans des espaces de noms.

```java
package com.exemple.monapp;

import java.util.List;

public class Main {
    // ...
}
```

_Explication :_  
Les packages aident à éviter les conflits de noms et structurent le code.

### 7.2 Generics (Types Paramétrés)

```java
import java.util.ArrayList;

ArrayList<String> liste = new ArrayList<>();
liste.add("Pomme");
liste.add("Banane");
```

_Explication :_  
Les Generics assurent la sécurité des types à la compilation et éliminent le besoin de conversion de types (casting).

### 7.3 Enumérations

```java
public enum Jour {
    LUNDI, MARDI, MERCREDI, JEUDI, VENDREDI, SAMEDI, DIMANCHE
}

Jour aujourdHui = Jour.MERCREDI;
```

_Explication :_  
Les énumérations définissent un ensemble fixe de constantes.

### 7.4 Annotations

```java
@Override
public String toString() {
    return "Exemple de méthode annotée";
}
```

_Explication :_  
Les annotations fournissent des informations complémentaires pour le compilateur ou des frameworks.

### 7.5 Gestion des Exceptions

```java
try {
    int division = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Erreur : division par zéro");
} finally {
    System.out.println("Bloc finally exécuté");
}
```

_Explication :_  
Les exceptions permettent de gérer les erreurs d'exécution de manière contrôlée.

### 7.6 Recursion

```java
public static int factorielle(int n) {
    if (n <= 1) return 1;
    return n * factorielle(n - 1);
}
```

_Explication :_  
La récursion consiste à ce qu'une fonction s'appelle elle-même pour résoudre un problème par décomposition.

### 7.7 Java I/O (Entrée/Sortie)

#### Lecture et Écriture de Fichiers

```java
import java.io.*;

public class ExempleIO {
    public static void main(String[] args) {
        // Écriture dans un fichier
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("sortie.txt"))) {
            writer.write("Bonjour, fichier !");
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Lecture d'un fichier
        try (BufferedReader reader = new BufferedReader(new FileReader("sortie.txt"))) {
            String ligne;
            while ((ligne = reader.readLine()) != null) {
                System.out.println(ligne);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

_Explication :_  
La gestion des fichiers en Java repose sur des classes d'E/S permettant la lecture et l'écriture dans des fichiers.

### 7.8 Java 8 et Versions Supérieures : Lambda et Streams

#### Expressions Lambda

```java
import java.util.Arrays;

int[] nombres = {1, 2, 3, 4, 5};
Arrays.stream(nombres)
      .forEach(n -> System.out.println(n));
```

_Explication :_  
Les expressions lambda permettent d'écrire des fonctions anonymes de manière concise, améliorant la lisibilité du code.

#### Streams

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

List<String> fruits = Arrays.asList("Pomme", "Banane", "Cerise");
List<String> fruitsMaj = fruits.stream()
    .map(String::toUpperCase)
    .collect(Collectors.toList());

System.out.println(fruitsMaj);
```

_Explication :_  
Les Streams facilitent le traitement des collections via des opérations fonctionnelles (filtrage, transformation, etc.).

### 7.9 Multi-threading et Concurrence

#### Création d’un Thread

```java
public class MonThread extends Thread {
    public void run() {
        System.out.println("Thread en exécution");
    }
}

MonThread t = new MonThread();
t.start();
```

_Explication :_  
Le multi-threading permet d'exécuter plusieurs tâches en parallèle, optimisant ainsi l'utilisation des ressources processeur.

---

## 8. Collections Avancées

### Utilisation d'une Map

```java
import java.util.HashMap;

HashMap<String, Integer> map = new HashMap<>();
map.put("Un", 1);
map.put("Deux", 2);

System.out.println(map.get("Un")); // Affiche 1
```

_Explication :_  
Les Maps stockent des paires clé-valeur pour un accès rapide aux données basées sur la clé.

---

## 9. Bonnes Pratiques

- **Nommage :**
  - Classes en **PascalCase** (ex. `MaClasse`)
  - Variables et méthodes en **camelCase** (ex. `maVariable`, `faireQuelqueChose`)
- **Immutabilité et Constantes :** Utiliser `final` pour déclarer des constantes.
- **Réutilisabilité :** Favoriser la modularité et la réutilisation du code via la POO et les interfaces.
- **Commenter son Code :** Ajouter des commentaires clairs et concis pour faciliter la maintenance.
- **Gestion des Ressources :** Toujours fermer les flux et ressources (ex. _try-with-resources_).

---

mis à jour avril 2025
