// draws a red text
CGE.init(640, 360);
const gameObject = new CGE.GameObject();
gameObject.position = new CGE.Vector(CGE.canvasWidth / 2, CGE.canvasHeight / 2);
gameObject.size = new CGE.Vector(100, 50);
gameObject.draw = function() {
    CGE.drawSetFont('50px arial');
    CGE.drawSetFillColor('red');
    CGE.drawTextFill(this.position, 'Hello, world!');
};
CGE.addGameObject(gameObject);
CGE.startGame();
