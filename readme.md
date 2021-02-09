# Canvas Game Engine (CGE)

*par flashjaysan*

## Introduction

Ce projet est une tentative de créer mon propre moteur de jeu vidéo en JavaScript et en utilisant l'API CanvasContext.

## Partis pris

Je souhaite limiter le plus possible les sous objets et favoriser un maximum de fonctions au niveau le plus haut de la lib.

Le moteur est basé sur une boucle de jeu qui appelle en boucle les méthodes `update` et `draw` d'une liste d'objets de jeu.

Les objets de jeu n'ont au départ que des méthodes vides `update` et `draw` et une propriété `depth` à `0`. Si vous souhaitez leur donner une position ou une image, vous devez leur ajouter les propriétés manuellement.

## Fonctionnement

- La méthode `init` crée un élément `canvas` et l'ajoute au document HTML.
- La méthode `startGame` lance la boucle de jeu.
- La boucle de jeu calcule le `deltaTime` (en secondes), appelle les méthodes `update` (en passant `deltaTime`) et `draw` puis demande au navigateur de rappeler cette méthode lors du prochain rafraichissement d'écran.
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

## Interpolation

Utilisez la méthode `CGE.lerp` pour effectuer une interpolation linéaire.

```js
const value = CGE.lerp(min, max, pourcentage);
```

Paramètres :

- `min` : la valeur minimale de l'intervalle. Requis.
- `max` : la valeur maximale de l'intervalle. Requis.
- `pourcentage` : le pourcentage à calculer dans l'intervalle. Requis.

Exemples :

```js
const median = CGE.lerp(0, 100, 0.5);
```

## Méthodes de dessin

### Etat du contexte

#### Sauvegarde du contexte de dessin

Utilisez la méthode `CGE.drawSaveContext` pour sauvegarder l'état du contexte de dessin. Vous pouvez ainsi sauvegarder la couleur de remplissage, la couleur de trait et son épaisseur ainsi que toute modification du contexte.

```js
CGE.drawSaveContext();
```

**Remarque :** Une fois vos manipulations terminées, n'oubliez pas de restaurer le contexte précédent.

#### Restauration du contexte de dessin précédent

Utilisez la méthode `CGE.drawRestoreContext` pour restaurer l'état précédent du contexte de dessin.

```js
CGE.drawRestoreContext();
```

#### Définir la couleur de remplissage

Utilisez la méthode `CGE.drawSetFillColor` pour définir la couleur de remplissage des formes.

```js
CGE.drawSetFillColor(couleur);
```

Paramètre :

- `couleur` : Une chaine représentant l'une des [couleurs prédéfinies](https://htmlcolorcodes.com/fr/noms-de-couleur/) ou un nombre hexadécimal précédé du signe `#` représentant une couleur RGB. Requis. Défaut `'black'` (`#000`).

#### Récupérer la couleur de remplissage

Utilisez la méthode `CGE.drawGetFillColor` pour récupérer la couleur actuelle de remplissage des formes.

```js
const currentFillColor = CGE.drawGetFillColor();
```

Valeur de retour : Une chaine représentant la couleur de remplissage actuelle sous forme d'un nombre hexadécimal précédé du signe `#`.

#### Définir la couleur de contour

Utilisez la méthode `CGE.drawSetLineColor` pour définir la couleur de contour des formes.

```js
CGE.drawSetLineColor(couleur);
```

Paramètre :

- `couleur` : Une chaine représentant l'une des [couleurs prédéfinies](https://htmlcolorcodes.com/fr/noms-de-couleur/) ou un nombre hexadécimal précédé du signe `#` représentant une couleur RGB. Requis. Défaut `'black'` (`#000`).

#### Récupérer la couleur de contour

Utilisez la méthode `CGE.drawGetLineColor` pour récupérer la couleur actuelle de contour des formes.

```js
const currentLineColor = CGE.drawGetLineColor();
```

Valeur de retour : Une chaine représentant la couleur de contour actuelle sous forme d'un nombre hexadécimal précédé du signe `#`.

#### Définir l'épaisseur de trait

Utilisez la méthode `CGE.drawSetLineWidth` pour définir l'épaisseur de trait.

```js
CGE.drawSetLineWidth(epaisseur);
```

Paramètre :

- `epaisseur` : Un nombre représentant l'épaisseur de trait. Requis. Défaut `1`.

#### Récupérer l'épaisseur de trait

Utilisez la méthode `CGE.drawGetLineWidth` pour récupérer l'épaisseur de trait actuelle.

```js
const currentLineWidth = CGE.drawGetLineWidth();
```

Valeur de retour : Un nombre représentant l'épaisseur de trait actuel.

#### Définir la police de caractères

Utilisez la méthode `CGE.drawSetFont` pour définir la police de caractères.

```js
CGE.drawSetFont(police);
```

Paramètre :

- `police` : Un chaine représentant la police de caractères. Requis. Défaut `'10px sans-serif'`. La chaine est basée sur le format de [font CSS](https://developer.mozilla.org/fr/docs/Web/CSS/font).

#### Récupérer la police de caractères

Utilisez la méthode `CGE.drawGetFont` pour récupérer la police de caractères actuelle.

```js
const currentFont = CGE.drawGetFont();
```

Valeur de retour : Une chaine représentant la police de caractères actuel.

### Formes géométriques

#### Cercle plein

La méthode `CGE.drawCircleFill` dessine un cercle plein (en utilisant la couleur de remplissage actuelle).

```js
CGE.drawCircleFill(centre, rayon);
```

Paramètres :

- `centre` : un vecteur représentant la position du centre du cercle. Requis.
- `rayon` : le rayon du cercle. Requis.

#### Contour de cercle

La méthode `CGE.drawCircleOutline` dessine un contour de cercle (en utilisant la couleur de contour et l'épaisseur de trait actuels).

```js
CGE.drawCircleOutline(centre, rayon);
```

Paramètres :

- `centre` : un vecteur représentant la position du centre du cercle. Requis.
- `rayon` : le rayon du cercle. Requis.

#### Rectangle plein

La méthode `CGE.drawRectangleFill` dessine un rectangle plein (en utilisant la couleur de remplissage actuelle).

```js
CGE.drawRectangleFill(coinSuperieurGauche, taille);
```

Paramètres :

- `coinSuperieurGauche` : un vecteur représentant la position du coin supérieur gauche du rectangle. Requis.
- `taille` : un vecteur représentant les dimensions du rectangle. Requis.

#### Contour de rectangle

La méthode `CGE.drawRectangleOutline` dessine un contour de rectangle (en utilisant la couleur de contour et l'épaisseur de trait actuels).

```js
CGE.drawRectangleOutline(coinSuperieurGauche, taille);
```

Paramètres :

- `coinSuperieurGauche` : un vecteur représentant la position du coin supérieur gauche du rectangle. Requis.
- `taille` : un vecteur représentant les dimensions du rectangle. Requis.

### Texte

#### Affichage de texte

Utilisez la méthode `CGE.drawTextFill` pour afficher du texte (en utilisant la couleur de remplissage actuelle).

```js
CGE.drawTextFill(position, texte);
```

Paramètres :

- `position` : un vecteur représentant la position du point d'origine du texte. Requis.
- `texte` : une chaine représentant le texte à afficher. Requis.

#### Affichage de contour de texte

Utilisez la méthode `CGE.drawTextOutline` pour afficher un contour de texte (en utilisant la couleur de contour et l'épaisseur de trait actuels).

```js
CGE.drawTextOutline(position, texte);
```

Paramètres :

- `position` : un vecteur représentant la position du point d'origine du texte. Requis.
- `texte` : une chaine représentant le texte à afficher. Requis.

#### Alignement horizontal du texte

Utilisez la méthode `CGE.drawSetFontHorizontalAlignment` pour définir le type d'alignement horizontal des textes à afficher.

```js
CGE.drawSetFontHorizontalAlignment(alignementHorizontal);
```

Paramètres :

- `horizontalAlignment` : une chaine représentant l'alignement horizontal du texte. Requis. Défaut `'start'`. Passez une des valeurs suivantes :
  - `'left'`: Le texte est aligné à gauche du point d'origine.
  - `'right'` : Le texte est aligné à droite du point d'origine.
  - `'center'` : Le texte est centré sur le point d'origine.
  - `'start'` : Le texte est aligné au début normal de la ligne (aligné à gauche pour les systèmes d'écriture de gauche à droite, aligné à droite pour les systèmes d'écriture de droite à gauche).
  - `'end'` : Le texte est aligné à la fin normale de la ligne (aligné à droite pour les systèmes d'écriture de gauche à droite, aligné à gauche pour les systèmes d'écriture de droite à gauche).

#### Alignement vertical du texte

Utilisez la méthode `CGE.drawSetFontVerticalAlignment` pour définir le type d'alignement vertical des textes à afficher.

```js
CGE.drawSetFontVerticalAlignment(alignementVertical);
```

Paramètres :

- `verticalAlignment` : une chaine représentant l'alignement vertical du texte. Requis. Défaut `'alphabetic'`. Passez une des valeurs suivantes :
  - `'top'` : La ligne de base du texte est le haut du cadratin.
  - `'hanging'` : La ligne de base du texte est la ligne de base supérieure.
  - `'middle'` : La ligne de base du texte est le milieu du cadratin.
  - `'alphabetic'` : La ligne de base du texte est la ligne de base normale alphabétique.
  - `'ideographic'` : La ligne de base du texte est la ligne de base idéographique ; c'est le bas du corps des caractères, si le corps principal des caractères fait saillie en dessous de la ligne de base alphabétique.
  - `'bottom'` : La ligne de base du texte est le bas du cadre. Cela diffère de ligne de base idéographique en ce que la ligne de base idéographique ne prend pas en considération les jambages.



















