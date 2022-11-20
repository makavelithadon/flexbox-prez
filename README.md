# Présentation/Démo sur les Flexbox

## Ce dossier contient les slides de la présentation du module Flexbox

Son but est de résumer et de passer en revue très brièvement les notions abordées au sein de la formation telles que :

- Une page de garde
- Une explication succincte du Module Flexbox
- L'historique du module (réflexion, spécifications, versions et support navigateurs)
- Les notions fondamentales, terminologie et les bases du Module (Container & Flex-Items)
- La disposition des éléments Flex (les Axes de répartition) accompagnée d'une démo
- Un Nota Bene

Ce module comporte aussi une Démo succincte de ce qu'il sera possible d'effectuer à l'issue de ce cours, et une fois les différents aspects de ce module appréhendés et maîtrisés.

## Démarrer le projet

1. Installer les dépendances :

```
npm install | yarn
```

2. Exécuter le script NPM `start`

```
npm run start | yarn start
```

Il va lancer :

- un live-server
- le watch des fichiers source SCSS

Le fichier `index.html` s'ouvre dans le navigateur par défaut du système

## Scripts NPM

`install:extensions`: Installe les extensions recommandées dans VSCode

`start:live-server`: Lance le Live Server manuellement

`styles`: Compile les fichiers SCSS en fichiers CSS manuellement

`styles:watch`: Exécute le script NPM `styles:watch` pour bundler le SCSS à la volée

| Source           | Destination |
| ---------------- | ----------- |
| `sass/**/*.scss` | `index.css` |

**N.B**: Le code ainsi que les syntaxes utilisées dans les différents fichiers qui structurent ce module n'ont pas vocation être production ready, et ne sont pas forcément d'une qualité transcendante\*
