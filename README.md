# Portfolio - Développeur Web [ En cours !] 👨‍💻

Bienvenue sur mon portfolio en ligne ! ✨ ce projet a été conçu pour présenter mes compétences et mes réalisations en tant que développeur web. vous y trouverez un aperçu de mon parcours, de mes projets et de mes compétences techniques.

## Aperçu 🔍

Ce portfolio est une application web dynamique et interactive, développée avec react. ⚛️ il met en avant une interface utilisateur soignée et une expérience utilisateur fluide. voici les principales fonctionnalités que vous pouvez explorer :

*   **Navigation intuitive** : un menu de navigation clair et accessible, avec des liens vers les différentes sections du portfolio (accueil, à propos de moi, mes projets, contact). 🧭
*   **Effets de curseur personnalisés** : un curseur personnalisé qui réagit aux interactions de l'utilisateur, avec des effets magnétiques sur les éléments clés comme le titre, les liens de navigation et le bouton de contact. 🖱️🧲
*   **Bouton de contact dynamique** : un bouton de contact avec un effet magnétique et une animation de flèche, invitant à l'interaction. 📩➡️
*   **Menu hamburger réactif** : un menu hamburger pour une navigation optimisée sur les appareils mobiles. 🍔📱
*   **Section hero interactive** : une section d'accueil (hero) avec des images qui réagissent au survol du titre, créant une expérience visuelle engageante. 🖼️🤩
*   **Contexte de référence** : utilisation d'un contexte react (`NavLinksRefsContext`) pour gérer les références des liens de navigation, facilitant ainsi la manipulation et l'interaction avec ces éléments. 🔗

## Technologies utilisées 🛠️

Ce projet a été développé en utilisant les technologies suivantes :

*   **React** : la bibliothèque javascript pour la création d'interfaces utilisateur. ⚛️
*   **Jsx** : pour une syntaxe déclarative et intuitive dans la construction des composants. 📄
*   **Scss** : pour la gestion des styles, avec une structure organisée et des fonctionnalités avancées comme les variables et les mixins. 🎨
*   **Javascript (es6+)** : pour la logique et l'interactivité de l'application. 💻
*   **React hooks** : `useState`, `useEffect`, `useRef`, `useCallback` et `useContext` pour une gestion efficace de l'état, des effets de bord et des références. 🎣
*   **Gestion des références** : utilisation de `useRef` pour manipuler directement les éléments du dom et créer des interactions dynamiques. 🎯
*   **Gestion du contexte** : utilisation de `createContext` et `useContext` pour partager des données et des références entre les composants. 🤝

## Structure du projet 📂

Le projet est organisé de manière logique, avec une séparation claire des responsabilités :

*   `App.jsx` : le composant principal qui gère la structure globale de l'application. 🏠
*   `hero/` : un dossier dédié à la section d'accueil (hero), contenant les composants :
    *   `Cursor.jsx` : le composant qui gère le curseur personnalisé et ses interactions. 🖱️
    *   `Navigation.jsx` : le composant qui gère la barre de navigation et le menu hamburger. 🧭🍔
    *   `ContactButton.jsx` : le composant qui gère le bouton de contact. 📩
    *   `Hero.jsx` : le composant qui gère la section d'accueil principale. 🦸‍♂️
    *   `NavLinksRefsContext.jsx` : le contexte pour gérer les références des liens de navigation. 🔗
*   `assets/` : un dossier pour les ressources statiques, comme les images (`img/`) et les styles (`styles/`). 🖼️🎨
*   `main.jsx` : le point d'entrée de l'application, qui initialise react et rend le composant `App`. 🚀

## Fonctionnalités clés ✨

*   **Curseur personnalisé** : le curseur réagit aux éléments de la page, avec des effets magnétiques sur le titre, les liens de navigation et le bouton de contact. il y a aussi une zone morte dans le coin supérieur gauche. 🖱️🧲
*   **Navigation réactive** : le menu hamburger s'ouvre et se ferme en fonction de l'état `isMenuOpen`. 🍔
*   **Effet magnétique** : le bouton de contact et le curseur ont un effet magnétique lorsqu'ils sont survolés. 🧲
*   **Images interactives** : les images de la section hero deviennent visibles lorsque le titre est survolé. 🖼️🤩

## Installation et exécution 🚀

1.  Clonez le dépôt : `git clone [URL du dépôt]` ⬇️
2.  Installez les dépendances : `npm i` 📦
3.  Démarrez l'application : `npm run dev` ▶️

## Ce projet 🎉

Ce portfolio est une vitrine de mes compétences en développement web. j'ai mis un point d'honneur à créer une expérience utilisateur unique et engageante. N'hésitez pas à explorer les différentes sections et à me contacter pour toute question ou opportunité.
