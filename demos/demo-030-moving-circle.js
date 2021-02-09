CGE.init(640, 360);

const dummyGameObject = new CGE.GameObject();
dummyGameObject.position = new CGE.Vector();
dummyGameObject.velocity = new CGE.Vector(CGE.canvasWidth, CGE.canvasHeight);

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
    CGE.drawCircleFill(this.position, 50);
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
