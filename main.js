/// the Canvas Game Engine
const CGE = {

    // creates a canvas element and append it to the document
    init(width, height, id = 'gameCanvas') {
        const canvasElement = document.createElement('canvas');
        canvasElement.setAttribute('width', width);
        canvasElement.setAttribute('height', height);
        canvasElement.setAttribute('id', id);
        this.canvasElement = canvasElement;
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.canvasId = id;
        this.context = canvasElement.getContext('2d');
        document.body.appendChild(canvasElement);
        this.gameObjects = [];
    },


    // calls update on all game objects
    update(deltaTime) {
        for (const gameObject of this.gameObjects)
        {
            gameObject.update(deltaTime);
        }
    },


    // clears the screen
    clearScreen() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },


    // calls draw on all game objects
    draw() {
        for (const gameObject of this.gameObjects)
        {
            gameObject.draw();
        }
    },


    // main game loop
    gameLoop(currentTimestamp) {
        const deltaTime = (currentTimestamp - this.previousTimestamp) / 1000;
        this.previousTimestamp = currentTimestamp;
        this.update(deltaTime);
        this.clearScreen();
        this.draw();
        window.requestAnimationFrame(() => this.gameLoop());
    },


    // starts the game
    startGame() {
        this.previousTimestamp = window.performance.now();
        this.gameLoop(this.previousTimestamp);
    },


    // add a game object to the list of game objects
    addGameObject(gameObject) {
        this.gameObjects.push(gameObject);
    },


    // use as a constructor of game objects with new GameObject();
    GameObject: function() {
        this.depth = 0;
        this.update = function(deltaTime) {};
        this.draw = function() {};
    },


    /// drawings methods
    drawSaveContext() {
        this.context.save();
    },


    drawRestoreContext() {
        this.context.restore();
    },
    

    drawSetFillColor(color) {
        this.context.fillStyle = color;
    },


    // repeatMode == 'no_repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
    drawSetFillImagePattern(image, repeatMode) {
        this.context.fillStyle = this.context.createPattern(image, repeatMode);
    },

    drawGetFillColor(color) {
        return this.context.fillStyle;
    },


    drawSetStrokeColor(color) {
        this.context.strokeStyle = color;
    },


    drawGetStrokeColor(color) {
        return this.context.strokeStyle;
    },


    drawSetStrokeWidth(lineWidth) {
        this.context.lineWidth = lineWidth;
    },


    drawGetStrokeWidth() {
        return this.context.lineWidth;
    },


    drawSetFont(font) {
        this.context.font = font;
    },


    drawGetFont() {
        return this.context.font;
    },


    drawSetFontHorizontalAlignment(horizontalAlignment) {
        this.context.textAlign = horizontalAlignment;
    },


    drawGetFontHorizontalAlignment() {
        return this.context.textAlign;
    },


    drawSetFontVerticalAlignment(verticalAlignment) {
        this.context.textBaseline = verticalAlignment;
    },


    drawGetFontVerticalAlignment() {
        return this.context.textBaseline;
    },


    drawCircleFill(x, y, radius) {
        this.context.beginPath();
        this.context.arc(
          x,
          y,
          radius,
          0,
          2 * Math.PI
        );
        this.context.fill();
    },


    drawCircleOutline(x, y, radius) {
        this.context.beginPath();
        this.context.arc(
          x,
          y,
          radius,
          0,
          2 * Math.PI
        );
        this.context.stroke();
    },


    drawRectangleFill(x, y, width, height) {
        this.context.fillRect(x, y, width, height);
    },


    drawRectangleOutline(x, y, width, height) {
        this.context.strokeRect(x, y, width, height);
    },


    drawLine(x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    },


    drawTriangleFill(x1, y1, x2, y2, x3, y3) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.fill();
    },


    drawTriangleOutline(x1, y1, x2, y2, x3, y3) {
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.lineTo(x3, y3);
        this.context.closePath();
        this.context.stroke();
    },


    drawText(x, y, text) {
        this.context.fillText(text, x, y);
    },


    drawImage(x, y, image) {
        context.drawImage(image, x, y);
    },


    drawImageScaled(x, y, image, xScale, yScale) {
        context.drawImage(image, coin_supérieur_gauche_x, coin_supérieur_gauche_y, image.width / ratio_horizontal, image.width / ratio_vertical);
    },


    loadImage(path) {
        const image = new Image();
        image.src = path;
        return image;
    },


    /// math functions

    // vector constructor
    Vector: function(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    },


    // Polar constructor
    Polar: function(distance = 0, angle = 0) {
        this.distance = distance;
        this.angle = angle;
    },


    /// vector functions
    vectorAdd(vector1, vector2) {
        return new this.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
    },


    vectorSubtract(vector1, vector2) {
        return new this.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
    },


    vectorMultiply(vector, number) {
        return new this.Vector(vector.x * number, vector.y * number);
    },


    vectorDivide(vector, number) {
        return new this.Vector(vector.x / number, vector.y / number);
    },


    vectorLength(vector) {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },


    vectorNormalize(vector) {
        const length = this.vectorLength(vector);
        if (length !== 0)
        {
            return new this.Vector(vector.x / length, vector.y / length);
        }
        else
        {
            return new this.Vector(vector.x, vector.y);
        }
    },


    clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    },


    vectorClamp(vector, vectorMin, vectorMax) {
        const x = clamp(vector.x, vectorMin.x, vectorMax.x);
        const y = clamp(vector.y, vectorMin.y, vectorMax.y);
        return new this.Vector(x, y);
    },


    vectorFromPolar(polar) {
        return new this.Vector(polar.distance * Math.cos(this.degreesToRadians(polar.angle)), polar.distance * Math.sin(this.degreesToRadians(polar.angle)));
    },


    polarFromVector(vector) {
        if (vector.x !== 0 && vector.y !== 0)
        {
            return new this.Polar(Math.sqrt(vector.x * vector.x + vector.y * vector.y), this.radiansToDegrees(Math.atan2(vector.y, vector.x)));
        }
        else
        {
            return new this.Polar();
        }
    },


    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    },


    radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
    },


    lerp(start, end, percentage) {
        return start + (end - start) * percentage;
    },

         
};










/// testing the engine
CGE.init(640, 360);

const dummyGameObject = new CGE.GameObject();
dummyGameObject.position = new CGE.Vector(30, 30);
dummyGameObject.velocity = new CGE.Vector(2, 3);
dummyGameObject.update = function(deltaTime) {
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
dummyGameObject.draw = function() {
    CGE.drawCircleFill(this.position.x, this.position.y, 50);
};
CGE.addGameObject(dummyGameObject);
/*
const dummyGameObject2 = new CGE.GameObject();
dummyGameObject2.position = new CGE.Vector(100, 100);
dummyGameObject2.draw = function() {
    CGE.drawRectangleFill(this.position.x, this.position.y, 50, 50);
};
CGE.addGameObject(dummyGameObject2);
*/
CGE.startGame();
