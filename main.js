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
        this.gameObjects.sort((gameObject1, gameObject2) => gameObject2.depth - gameObject1.depth);
        for (const gameObject of this.gameObjects)
        {
            gameObject.update(deltaTime);
        }
    },


    // calls draw on all game objects
    draw() {
        this.clearScreen();
        for (const gameObject of this.gameObjects)
        {
            gameObject.draw();
        }
    },


    // clears the screen
    clearScreen() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    },


    // main game loop
    gameLoop(currentTimestamp) {
        const deltaTime = (currentTimestamp - this.previousTimestamp) / 1000;
        this.previousTimestamp = currentTimestamp;
        this.update(deltaTime);
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


    drawSetLineColor(color) {
        this.context.strokeStyle = color;
    },


    drawGetLineColor(color) {
        return this.context.strokeStyle;
    },


    drawSetLineWidth(lineWidth) {
        this.context.lineWidth = lineWidth;
    },


    drawGetLineWidth() {
        return this.context.lineWidth;
    },


    drawSetFont(font) {
        this.context.font = font;
    },


    drawGetFont() {
        return this.context.font;
    },


    // horizontalAlignment == 'left' | 'right' | 'center' | 'start' | 'end'
    drawSetFontHorizontalAlignment(horizontalAlignment) {
        this.context.textAlign = horizontalAlignment;
    },


    drawGetFontHorizontalAlignment() {
        return this.context.textAlign;
    },


    // verticalAlignment == 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
    drawSetFontVerticalAlignment(verticalAlignment) {
        this.context.textBaseline = verticalAlignment;
    },


    drawGetFontVerticalAlignment() {
        return this.context.textBaseline;
    },


    drawCircleFill(center, radius) {
        this.context.beginPath();
        this.context.arc(
          center.x,
          center.y,
          radius,
          0,
          2 * Math.PI
        );
        this.context.fill();
    },


    drawCircleOutline(center, radius) {
        this.context.beginPath();
        this.context.arc(
          center.x,
          center.y,
          radius,
          0,
          2 * Math.PI
        );
        this.context.stroke();
    },


    drawRectangleFill(topLeftCorner, size) {
        this.context.fillRect(topLeftCorner.x, topLeftCorner.y, size.x, size.y);
    },


    drawRectangleOutline(topLeftCorner, size) {
        this.context.strokeRect(topLeftCorner.x, topLeftCorner.y, size.x, size.y);
    },


    drawLine(point1, point2) {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineTo(point2.x, point2.y);
        this.context.stroke();
    },


    drawTriangleFill(point1, point2, point3) {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineTo(point2.x, point2.y);
        this.context.lineTo(point3.x, point3.y);
        this.context.fill();
    },


    drawTriangleOutline(point1, point2, point3) {
        this.context.beginPath();
        this.context.moveTo(point1.x, point1.y);
        this.context.lineTo(point2.x, point2.y);
        this.context.lineTo(point3.x, point3.y);
        this.context.closePath();
        this.context.stroke();
    },


    drawTextFill(position, text) {
        this.context.fillText(text, position.x, position.y);
    },


    drawTextOutline(position, text) {
        this.context.strokeText(text, position.x, position.y);
    },


    drawImage(position, image) {
        context.drawImage(image, position.x, position.y);
    },


    drawImageScaled(position, image, scale) {
        context.drawImage(image, position.x, position.y, image.width / scale.x, image.width / scale.y);
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
        return new this.Vector(
            polar.distance * Math.cos(this.degreesToRadians(polar.angle)),
            polar.distance * Math.sin(this.degreesToRadians(polar.angle))
            );
    },


    polarFromVector(vector) {
        if (vector.x !== 0 && vector.y !== 0)
        {
            return new this.Polar(
                Math.sqrt(vector.x * vector.x + vector.y * vector.y),
                this.radiansToDegrees(Math.atan2(vector.y, vector.x))
                );
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


    random(number = 1) {
        return number * Math.random();
    },


    randomInteger(number = 1) {
        return Math.floor(number * Math.random());
    },


    randomRange(minimum, maximum) {
        return this.random(maximum - minimum) + minimum;
    },


    randomIntegerRange(minimum, maximum) {
        return Math.floor(this.randomRange(minimum, maximum));
    },


    lerp(start, end, percentage) {
        return start + (end - start) * percentage;
    },

         
};










/// testing the engine
CGE.init(640, 360);
console.log(typeof CGE.drawGetLineWidth());

