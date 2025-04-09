# 📘 Fiche Complète Spring Boot

## 1. Introduction

Spring Boot est un framework basé sur Spring qui facilite la création d'applications autonomes, prêtes pour la production. Il offre une configuration automatique, des dépendances simplifiées et un démarrage rapide, permettant ainsi de réduire la configuration manuelle nécessaire pour développer une application Java. Spring Boot est idéal pour créer des microservices et des applications web robustes et évolutives.

---

## 2. Avantages et Concepts Clés

- **Démarrage Rapide :** Configuration automatique et lancement simplifié d’applications.
- **Standalone :** Intègre un serveur web embarqué (Tomcat, Jetty, etc.) pour une exécution autonome.
- **Configuration Simplifiée :** Utilisation de fichiers `application.properties` ou `application.yml` pour régler divers paramètres.
- **Production Ready :** Intègre des fonctionnalités avancées pour la surveillance, la sécurité et la gestion des applications.

---

## 3. Structure de Base d'un Projet Spring Boot

### 3.1 Arborescence Typique

```plaintext
mon-application-spring-boot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── exemple/
│   │   │           └── Application.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       └── java/
│           └── com/
│               └── exemple/
│                   └── ApplicationTests.java
└── pom.xml
```

_Explication :_  
La structure d'un projet Spring Boot suit la convention Maven, facilitant l'organisation du code et la gestion des dépendances.

### 3.2 Dépendances et Build Tool

Spring Boot utilise généralement Maven ou Gradle. Voici un extrait typique du fichier **pom.xml** :

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.0.0</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>

<dependencies>
    <!-- Dépendance principale pour les applications web -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- Autres dépendances peuvent être ajoutées ici -->
</dependencies>
```

_Explication :_  
Le fichier **pom.xml** définit les dépendances nécessaires et configure le parent Spring Boot pour l'auto-configuration.

---

## 4. Création d'une Application de Base

### 4.1 Classe Principale

La classe principale doit contenir l'annotation `@SpringBootApplication` qui déclenche la configuration automatique et le scan des composants.

```java
package com.exemple;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

_Explication :_  
L'annotation `@SpringBootApplication` est une combinaison de `@Configuration`, `@EnableAutoConfiguration` et `@ComponentScan`.

### 4.2 Création d'un Contrôleur REST

Un exemple de contrôleur pour gérer une requête GET :

```java
package com.exemple.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/hello")
    public String hello() {
        return "Hello, Spring Boot!";
    }
}
```

_Explication :_  
Le `@RestController` indique que la classe gère des requêtes REST. L'annotation `@GetMapping` mappe la méthode à l'URL `/hello`.

---

## 5. Configuration et Propriétés

### 5.1 Fichier application.properties

Configuration de base de l'application via le fichier `application.properties` :

```properties
# Configuration du port du serveur
server.port=8080

# Niveau de log pour Spring
logging.level.org.springframework=INFO
```

_Explication :_  
Ce fichier permet de définir des paramètres comme le port du serveur ou le niveau de log.

### 5.2 Utilisation de application.yml (alternative)

Une alternative hiérarchisée à `application.properties` :

```yaml
server:
  port: 8080

logging:
  level:
    org.springframework: INFO
```

---

## 6. Notions Avancées

### 6.1 Gestion des Bases de Données avec Spring Data JPA

Spring Boot simplifie l'intégration avec les bases de données grâce à Spring Data JPA.

```java
package com.exemple.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Produit {
    @Id
    @GeneratedValue
    private Long id;
    private String nom;
    private double prix;

    // Getters et Setters
}
```

_Explication :_  
L'annotation `@Entity` permet de définir une classe comme entité persistante. Un Repository peut être utilisé pour les opérations CRUD.

### 6.2 Sécurité avec Spring Security

Un exemple de configuration de base avec Spring Security :

```java
package com.exemple.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .httpBasic();
        return http.build();
    }
}
```

_Explication :_  
Spring Security permet de sécuriser les endpoints et d’implémenter différents mécanismes d'authentification.

### 6.3 Déploiement et Packaging

Spring Boot permet de créer un JAR exécutable. Pour cela, utilisez Maven :

```bash
mvn clean package
```

_Explication :_  
Après la compilation et le packaging, l'application peut être lancée avec `java -jar nom-de-lapplication.jar`.

---

## 7. Tests et Maintenance

### 7.1 Tests Unitaires

Utilisation de JUnit pour vérifier que le contexte de l'application se charge correctement :

```java
package com.exemple;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ApplicationTests {
    @Test
    void contextLoads() {
    }
}
```

_Explication :_  
Les tests unitaires permettent de valider le bon fonctionnement des composants de l'application.

### 7.2 Actuator pour le Monitoring

Spring Boot Actuator offre des endpoints de monitoring. Ajoutez la dépendance suivante dans **pom.xml** :

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

_Explication :_  
Actuator permet d'accéder à des informations détaillées sur la santé et les performances de l'application via des endpoints REST tels que `/actuator/health`.

---

## 8. Bonnes Pratiques

- **Structure du Projet :** Respecter la convention de packages pour une organisation claire.
- **Séparation des Responsabilités :** Utiliser les couches Controller, Service et Repository pour faciliter la maintenance et l’évolution du code.
- **Utilisation des Profiles :** Configurer différents profils (`dev`, `prod`, etc.) pour adapter l'application aux environnements spécifiques.
- **Documentation :** Documenter les API avec Swagger ou d'autres outils afin de faciliter la communication entre les équipes.

---

_mis à jour avril 2025_
