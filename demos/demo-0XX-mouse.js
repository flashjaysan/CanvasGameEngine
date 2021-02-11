CGE.init(640, 360);
CGE.addMouseHandler();
const gameObject = new CGE.GameObject();
gameObject.update = function() {
    if (CGE.mouse.buttonLeft === CGE.mouseButtonStatus.up) {
        this.buttonLeftState = 'bouton 1 up';
    }
    else
    {
        this.buttonLeftState = 'bouton 1 down';
    }
};
gameObject.draw = function() {
    CGE.drawTextFill(new CGE.Vector(10, 50), 'mouse X:' + CGE.mouse.x + ' mouse Y: ' + CGE.mouse.y);
    CGE.drawTextFill(new CGE.Vector(10, 60), this.buttonLeftState);
};
CGE.addGameObject(gameObject);
CGE.startGame();