# Canvas Game Engine (CGE)

*par flashjaysan*

## Introduction

Ce projet est une tentative de créer mon propre moteur de jeu vidéo en JavaScript et en utilisant l'API CanvasContext.

## Partis pris

Je souhaite limiter le plus possible les sous objets et favoriser un maximum de fonctions au niveau le plus haut de la lib.

Le moteur est basé sur une boucle de jeu qui appelle en boucle les méthodes `update` et `draw` d'une liste d'objets de jeu.

Les objets de jeu n'ont au départ que des méthodes vides `update` et `draw` et une propriété `depth` à `0`. Si vous souhaitez leur donner une position ou une image, vous devez leur ajouter les propriétés manuellement.

## Fonctionnement

- La méthode `init` crée un canvas et l'ajoute au document HTML.
- La méthode `startGame` lance la boucle de jeu.
- La boucle de jeu calcule le `deltaTime` (en secondes), appelle les méthodes `update` et `draw` puis demande au navigateur de rappeler cette méthode lors du prochain rafraichissement d'écran.
- La méthode `update` parcourt tous les objets de jeu contenus dans le tableau `CGE.gameObjects` et appelle leur méthode `update` en passant le `deltaTime`.
- La méthode `draw` parcourt tous les objets de jeu contenus dans le tableau `CGE.gameObjects` et appelle leur méthode `draw`.

Votre rôle est de créer des objets de jeu, de définir leurs méthodes `update` et `draw` et  de les ajouter au tableau `CGE.gameObjects` du moteur avec la méthode `CGE.addGameObject`.

## Utilisation

Commencez par créer un fichier `index.html` avec le code suivant :

```html
<!doctype html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="votre description">
        <meta name="author" content="votre nom">
        <title>titre du document</title>
    </head>
    <body>
        <h1>Texte d'accompagnement</h1>
        <script src="main.js"></script>
    </body>
</html>
```

Comme vous pouvez le constater, le document HTML ne contient pas d'élément `canvas`. Le moteur s'occupe de le créer et de le rajouter au document automatiquement.

Créez un fichier `main.js` et placez en tête du fichier le code source du moteur CGE.

**Remarque :** Je n'ai pas encore réussi à gérer l'utilisation de deux fichiers externes JavaScript. A terme, je souhaite faire de CGE un module indépendant en tant que fichier séparé que vous n'aurez plus qu'à joindre à votre projet et à importer.

A la fin du fichier `main.js`, placez votre programme.

### La méthode init

Commencez par appeler la méthode `init`. Cette méthode crée un élément `canvas` et l'ajoute à la fin du document HTML.

```js
CGE.init(largeur, hauteur, id);
```

Paramètres :

- `largeur` : la largeur en pixels du canevas. Requis.
- `hauteur` : la hauteur en pixels du canevas. Requis.
- `id` : l'identifiant unique de l'élément `canvas`. Optionnel. Défaut `'gameCanvas'`.

Exemple :

```js
CGE.init(640, 360);
```

Cette méthode initialise également les propriétés suivantes :

- `CGE.canvasElement` : l'élément `canvas` créé.
- `CGE.canvasWidth` : la largeur du canevas.
- `CGE.canvasHeight` : la hauteur du canevas.
- `CGE.canvasId` : l'id de l'élément `canvas`.
- `CGE.context` : le contexte graphique du canevas.
- `CGE.gameObjects` : un tableau vide d'objets de jeu.

### Créer un nouvel objet de jeu

Utilisez le constructeur `CGE.GameObject` pour créer un nouvel objet de jeu.

```js
const gameObject = new CGE.GameObject();
```

### Ajouter une propriété à un objet de jeu

Par défaut, un objet de jeu ne contient que les méthodes `update` et `draw` vides et une propriété `depth` à `0`. Ajoutez les propriétés de votre choix pour personnaliser votre objet de jeu.

Exemple :

```js
gameObject.position = new CGE.Vector(30, 30);
gameObject.velocity = new CGE.Vector(2, 3);
```

### Définir la méthode update d'un objet de jeu

Redéfinissez la méthode `update` pour gérer la mise à jour des propriétés de l'objet de jeu.

Exemple :

```js
gameObject.update = function(deltaTime) {
    this.position = CGE.vectorAdd(this.position, this.velocity);
    if (this.position.x < 0)
    {
        this.position.x = 0;
        this.velocity.x *= -1;
    }
    if ( this.position.x > CGE.canvasWidth)
    {
        this.position.x = CGE.canvasWidth;
        this.velocity.x *= -1;
    }
    if (this.position.y < 0)
    {
        this.position.y = 0;
        this.velocity.y *= -1;
    }
    if (this.position.y > CGE.canvasHeight)
    {
        this.position.y = CGE.canvasHeight;
        this.velocity.y *= -1;
    }
};
```

### Définir la méthode draw d'un objet de jeu

Redéfinissez la méthode `draw` pour gérer l'affichage de l'objet de jeu. Vous pouvez utiliser les nombreuses méthodes de dessin fournies par le moteur.

```js
gameObject.draw = function() {
    CGE.drawCircleFill(this.position.x, this.position.y, 50);
};
```

### Ajouter l'objet de jeu au moteur

Utilisez la méthode `CGE.addGameObject` pour ajouter un objet de jeu au moteur.

```js
CGE.addGameObject(gameObject);
```

**Attention !** Si vous n'ajoutez pas vos objets de jeu au moteur, ils ne seront pas inclus dans la boucle de jeu.

## Lancer la boucle de jeu

Utilisez la méthode `CGE.startGame` pour lancer l'exécution de la boucle de jeu.

```js
CGE.startGame();
```

## Vecteurs

### Créer un vecteur

Utilisez le constructeur `CGE.Vector` pour créer un nouveau vecteur.

```js
const vector = new CGE.Vector(x, y);
```

Paramètres :

- `x` : la composante horizontale du vecteur. Optionnel. Défaut `0`.
- `y` : la composante verticale du vecteur. Optionnel. Défaut `0`.

Exemples :

```js
const vector = new CGE.Vector(10, 20);
const nullVector = new CGE.Vector();
```

### Ajouter deux vecteurs

Utilisez la méthode `CGE.vectorAdd` pour ajouter deux vecteurs.

```js
const newVector = CGE.vectorAdd(vecteur1, vecteur2);
```

**Remarque :** La méthode ne modifie pas les vecteurs d'origine mais renvoie un nouveau vecteur.

### Soustraire deux vecteurs

Utilisez la méthode `CGE.vectorSubtract` pour soustraire un vecteur à un autre.

```js
const newVector = CGE.vectorSubtract(vecteur1, vecteur2);
```

**Remarque :** La méthode ne modifie pas les vecteurs d'origine mais renvoie un nouveau vecteur.

### Multiplier un vecteur par un nombre

Utilisez la méthode `CGE.vectorMultiply` pour multiplier un vecteur par un nombre.

```js
const newVector = CGE.vectorMultiply(vecteur, number);
```

**Remarque :** La méthode ne modifie pas le vecteur d'origine mais renvoie un nouveau vecteur.

### Diviser un vecteur par un nombre

Utilisez la méthode `CGE.vectorDivide` pour diviser un vecteur par un nombre.

```js
const newVector = CGE.vectorDivide(vecteur, number);
```

**Remarque :** La méthode ne modifie pas le vecteur d'origine mais renvoie un nouveau vecteur.

### calculer la longueur d'un vecteur

Utilisez la méthode `CGE.vectorLength` pour calculer la longueur d'un vecteur.

```js
const vectorLength = CGE.vectorLength(vector);
```

### Normaliser un vecteur

Utiisez la méthode `CGE.vectorNormalize` pour normaliser un vecteur (lui donner une longueur 1).

```js
const newVector = CGE.vectorNormalize(vector);
```

**Remarque :** La méthode ne modifie pas le vecteur d'origine mais renvoie un nouveau vecteur.













