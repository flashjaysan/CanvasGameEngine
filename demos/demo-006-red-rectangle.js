// draws a red rectangle
CGE.init(640, 360);
const gameObject = new CGE.GameObject();
gameObject.position = new CGE.Vector(CGE.canvasWidth / 2, CGE.canvasHeight / 2);
gameObject.size = new CGE.Vector(100, 50);
gameObject.draw = function() {
    CGE.drawSetFillColor('red');
    CGE.drawRectangleFill(
        CGE.vectorSubtract(this.position, CGE.vectorDivide(this.size, 2)),
        this.size
        );
};
CGE.addGameObject(gameObject);
CGE.startGame();
