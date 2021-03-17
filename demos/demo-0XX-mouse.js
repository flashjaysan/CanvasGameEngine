CGE.init(640, 360);
CGE.addMouseHandler();
const gameObject = new CGE.GameObject();
gameObject.update = function() {
    this.buttonLeftState = (CGE.mouse.buttonLeft === CGE.mouseButtonStatus.up) ? 'bouton 1 relache' : 'bouton 1 enfonce';
};
gameObject.draw = function() {
    CGE.drawTextFill(new CGE.Vector(10, 50), 'mouse X:' + CGE.mouse.x + ' mouse Y: ' + CGE.mouse.y);
    CGE.drawTextFill(new CGE.Vector(10, 60), this.buttonLeftState);
};
CGE.addGameObject(gameObject);
CGE.startGame();