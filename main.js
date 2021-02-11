/// the Canvas Game Engine
const CGE = {};

// creates a canvas element and append it to the document
CGE.init = function(width, height, id = 'gameCanvas') {
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
}


// calls update on all game objects
CGE.update = function(deltaTime) {
    this.gameObjects.sort((gameObject1, gameObject2) => gameObject2.depth - gameObject1.depth);
    for (const gameObject of this.gameObjects)
    {
        gameObject.update(deltaTime);
    }
}


// calls draw on all game objects
CGE.draw = function() {
    this.clearScreen();
    for (const gameObject of this.gameObjects)
    {
        gameObject.draw();
    }
}


// clears the screen
CGE.clearScreen = function() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
}


// main game loop
CGE.gameLoop = function(currentTimestamp) {
    const deltaTime = (currentTimestamp - this.previousTimestamp) / 1000;
    this.previousTimestamp = currentTimestamp;
    this.update(deltaTime);
    this.draw();
    window.requestAnimationFrame(() => this.gameLoop());
}


// starts the game
CGE.startGame = function() {
    this.previousTimestamp = window.performance.now();
    this.gameLoop(this.previousTimestamp);
}


// add a game object to the list of game objects
CGE.addGameObject = function(gameObject) {
    this.gameObjects.push(gameObject);
}


// use as a constructor of game objects with new GameObject();
CGE.GameObject = function() {
    this.depth = 0;
    this.update = function(deltaTime) {};
    this.draw = function() {};
}


/// drawings methods
CGE.drawSaveContext = function() {
    this.context.save();
}


CGE.drawRestoreContext = function() {
    this.context.restore();
}


CGE.drawSetFillColor = function(color) {
    this.context.fillStyle = color;
}


// repeatMode == 'no_repeat' | 'repeat' | 'repeat-x' | 'repeat-y'
CGE.drawSetFillImagePattern = function(image, repeatMode) {
    this.context.fillStyle = this.context.createPattern(image, repeatMode);
}

CGE.drawGetFillColor = function(color) {
    return this.context.fillStyle;
}


CGE.drawSetLineColor = function(color) {
    this.context.strokeStyle = color;
}


CGE.drawGetLineColor = function(color) {
    return this.context.strokeStyle;
}


CGE.drawSetLineWidth = function(lineWidth) {
    this.context.lineWidth = lineWidth;
}


CGE.drawGetLineWidth = function() {
    return this.context.lineWidth;
}


CGE.drawSetFont = function(font) {
    this.context.font = font;
}


CGE.drawGetFont = function() {
    return this.context.font;
}


// horizontalAlignment == 'left' | 'right' | 'center' | 'start' | 'end'
CGE.drawSetFontHorizontalAlignment = function(horizontalAlignment) {
    this.context.textAlign = horizontalAlignment;
}


CGE.drawGetFontHorizontalAlignment = function() {
    return this.context.textAlign;
}


// verticalAlignment == 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom'
CGE.drawSetFontVerticalAlignment = function(verticalAlignment) {
    this.context.textBaseline = verticalAlignment;
}


CGE.drawGetFontVerticalAlignment = function() {
    return this.context.textBaseline;
}


CGE.drawCircleFill = function(center, radius) {
    this.context.beginPath();
    this.context.arc(
        center.x,
        center.y,
        radius,
        0,
        2 * Math.PI
    );
    this.context.fill();
}


CGE.drawCircleOutline = function(center, radius) {
    this.context.beginPath();
    this.context.arc(
        center.x,
        center.y,
        radius,
        0,
        2 * Math.PI
    );
    this.context.stroke();
}


CGE.drawRectangleFill = function(topLeftCorner, size) {
    this.context.fillRect(topLeftCorner.x, topLeftCorner.y, size.x, size.y);
}


CGE.drawRectangleOutline = function(topLeftCorner, size) {
    this.context.strokeRect(topLeftCorner.x, topLeftCorner.y, size.x, size.y);
}


CGE.drawLine = function(point1, point2) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.stroke();
}


CGE.drawTriangleFill = function(point1, point2, point3) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.lineTo(point3.x, point3.y);
    this.context.fill();
}


CGE.drawTriangleOutline = function(point1, point2, point3) {
    this.context.beginPath();
    this.context.moveTo(point1.x, point1.y);
    this.context.lineTo(point2.x, point2.y);
    this.context.lineTo(point3.x, point3.y);
    this.context.closePath();
    this.context.stroke();
}


CGE.drawTextFill = function(position, text) {
    this.context.fillText(text, position.x, position.y);
}


CGE.drawTextOutline = function(position, text) {
    this.context.strokeText(text, position.x, position.y);
}


CGE.drawImage = function(position, image) {
    context.drawImage(image, position.x, position.y);
}


CGE.drawImageScaled = function(position, image, scale) {
    context.drawImage(image, position.x, position.y, image.width / scale.x, image.width / scale.y);
}


CGE.loadImage = function(path) {
    const image = new Image();
    image.src = path;
    return image;
}


/// math functions

// vector constructor
CGE.Vector = function(x = 0, y = 0) {
    this.x = x;
    this.y = y;
}


// Polar constructor
CGE.Polar = function(distance = 0, angle = 0) {
    this.distance = distance;
    this.angle = angle;
}


/// vector functions
CGE.vectorAdd = function(vector1, vector2) {
    return new this.Vector(vector1.x + vector2.x, vector1.y + vector2.y);
}


CGE.vectorSubtract = function(vector1, vector2) {
    return new this.Vector(vector1.x - vector2.x, vector1.y - vector2.y);
}


CGE.vectorMultiply = function(vector, number) {
    return new this.Vector(vector.x * number, vector.y * number);
}


CGE.vectorDivide = function(vector, number) {
    return new this.Vector(vector.x / number, vector.y / number);
}


CGE.vectorLength = function(vector) {
    return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
}


CGE.vectorNormalize = function(vector) {
    const length = this.vectorLength(vector);
    if (length !== 0)
    {
        return new this.Vector(vector.x / length, vector.y / length);
    }
    else
    {
        return new this.Vector(vector.x, vector.y);
    }
}


CGE.clamp = function(value, min, max) {
    return Math.max(min, Math.min(max, value));
}


CGE.vectorFromPolar = function(polar) {
    return new this.Vector(
        polar.distance * Math.cos(this.degreesToRadians(polar.angle)),
        polar.distance * Math.sin(this.degreesToRadians(polar.angle))
        );
}


CGE.polarFromVector = function(vector) {
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
}


CGE.degreesToRadians = function(degrees) {
    return degrees * Math.PI / 180;
}


CGE.radiansToDegrees = function(radians) {
    return radians * 180 / Math.PI;
}


CGE.random = function(number = 1) {
    return number * Math.random();
}


CGE.randomInteger = function(number = 1) {
    return Math.floor(number * Math.random());
}


CGE.randomRange = function(minimum, maximum) {
    return this.random(maximum - minimum) + minimum;
}


CGE.randomIntegerRange = function(minimum, maximum) {
    return Math.floor(this.randomRange(minimum, maximum));
}


CGE.lerp = function(start, end, percentage) {
    return start + (end - start) * percentage;
}


/// controls
CGE.addKeyboardHandler = function() {
    this.keyStatus = {
        up: 0,
        down: 1,
    };

    const keys = [
        'a',
        'b',
        'c',
        'd',
        'e',
        'f',
        'g',
        'h',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        't',
        'u',
        'v',
        'w',
        'x',
        'y',
        'z',
        'up',
        'down',
        'left',
        'right',
        'enter',
        'space'
    ];

    this.key = {};
    for (const key of keys) {
        this.key[key] = this.keyStatus.up;
    }

    this.codeToKeyMap = {
        0x001E: 'a',
        0x0030: 'b',
        0x002E: 'c',
        0x0020: 'd',
        0x0012: 'e',
        0x0021: 'f',
        0x0022: 'g',
        0x0023: 'h',
        0x0017: 'i',
        0x0024: 'j',
        0x0025: 'k',
        0x0026: 'l',
        0x0032: 'm',
        0x0031: 'n',
        0x0018: 'o',
        0x0019: 'p',
        0x0010: 'q',
        0x0013: 'r',
        0x001F: 's',
        0x0014: 't',
        0x0016: 'u',
        0x002F: 'v',
        0x0011: 'w',
        0x002D: 'x',
        0x0015: 'y',
        0x002C: 'z',
        0xE048: 'up',
        0xE050: 'down',
        0xE04B: 'left',
        0xE04D: 'right',
        0x001C: 'enter',
        0x0039: 'space',
    };
    
    window.addEventListener('keydown', this.keyDownListener);
    window.addEventListener('keyup', this.keyUpListener);
}


CGE.keyDownListener = function(keyboardEvent) {
    if (keyboardEvent.code in this.codeToKeyMap) {
        this.key[this.codeToKeyMap[keyboardEvent.code]] = this.keyStatus.down;
    }
}


CGE.keyUpListener = function(keyboardEvent) {
    if (keyboardEvent.code in this.codeToKeyMap) {
        this.key[this.codeToKeyMap[keyboardEvent.code]] = this.keyStatus.up;
    }
}


CGE.removeKeyboardHandler = function() {
    delete this.keyStatus;
    delete this.key;
    delete this.codeToKeyMap;

    window.removeEventListener('keydown', this.keyDownListener);
    window.removeEventListener('keyup', this.keyUpListener);
}


CGE.addMouseHandler = function() {
    this.mouseButtonStatus = {
        up: 0,
        down: 1,
    };

    this.mouse = {
        buttonLeft: this.mouseButtonStatus.up,
        buttonMiddle: this.mouseButtonStatus.up,
        buttonRight: this.mouseButtonStatus.up,
        x: 0,
        y: 0
    };

    window.addEventListener('mousedown', this.mouseDownListener);
    window.addEventListener('mouseup', this.mouseUpListener);
    this.canvasElement.addEventListener('mousemove', this.mouseMoveListener);
}


CGE.mouseDownListener = function(mouseEvent) {
    switch (mouseEvent.button) {
        case 0:
            CGE.mouse.buttonLeft = CGE.mouseButtonStatus.down;
            break;
        case 1:
            CGE.mouse.buttonMiddle = CGE.mouseButtonStatus.down;
            break;
        case 2:
            CGE.mouse.buttonRight = CGE.mouseButtonStatus.down;
            break;
    }
    
    const canvasBoundingBox = CGE.canvasElement.getBoundingClientRect();
    CGE.mouse.x = mouseEvent.clientX - canvasBoundingBox.left * (CGE.canvasElement.width / canvasBoundingBox.width);
    CGE.mouse.y = mouseEvent.clientY - canvasBoundingBox.top * (CGE.canvasElement.height / canvasBoundingBox.height);
}


CGE.mouseUpListener = function(mouseEvent) {
    switch (mouseEvent.button) {
        case 0:
            CGE.mouse.buttonLeft = CGE.mouseButtonStatus.up;
            break;
        case 1:
            CGE.mouse.buttonMiddle = CGE.mouseButtonStatus.up;
            break;
        case 2:
            CGE.mouse.buttonRight = CGE.mouseButtonStatus.up;
            break;
    }
    
    const canvasBoundingBox = CGE.canvasElement.getBoundingClientRect();
    CGE.mouse.x = mouseEvent.clientX - canvasBoundingBox.left * (CGE.cancanvasElementvas.width / canvasBoundingBox.width);
    CGE.mouse.y = mouseEvent.clientY - canvasBoundingBox.top * (CGE.canvasElement.height / canvasBoundingBox.height);
}


CGE.mouseMoveListener = function(mouseEvent) {
    const canvasBoundingBox = CGE.canvasElement.getBoundingClientRect();
    CGE.mouse.x = mouseEvent.clientX - canvasBoundingBox.left * (CGE.canvasElement.width / canvasBoundingBox.width);
    CGE.mouse.y = mouseEvent.clientY - canvasBoundingBox.top * (CGE.canvasElement.height / canvasBoundingBox.height);
}


CGE.removeMouseHandler = function() {
    delete this.mouseButtonStatus;
    delete this.mouse;

    window.removeEventListener('mousedown', this.mouseDownListener);
    window.removeEventListener('mouseup', this.mouseUpListener);
    window.removeEventListener('mousemove', this.mouseMoveListener);
}





/// testing the engine
CGE.init(640, 360);
CGE.addMouseHandler();
const gameObject = new CGE.GameObject();
gameObject.update = function() {
    if (CGE.mouse.buttonLeft === CGE.mouseButtonStatus.up) {
        this.buttonLeftState = 'bouton 1 relache';
    }
    else
    {
        this.buttonLeftState = 'bouton 1 enfonce';
    }
};
gameObject.draw = function() {
    CGE.drawTextFill(new CGE.Vector(10, 50), 'mouse X:' + CGE.mouse.x + 'mouse Y: ' + CGE.mouse.y);
    CGE.drawTextFill(new CGE.Vector(10, 60), this.buttonLeftState);
};
CGE.addGameObject(gameObject);
CGE.startGame();

