// draws a black circle outline
CGE.init(640, 360);
const gameObject = new CGE.GameObject();
gameObject.position = new CGE.Vector(CGE.canvasWidth / 2, CGE.canvasHeight / 2);
gameObject.draw = function() {
    CGE.drawCircleOutline(this.position, 50);
};
CGE.addGameObject(gameObject);
CGE.startGame();
