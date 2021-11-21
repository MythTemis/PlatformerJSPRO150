class player {
    //send in this.gamespace? something to signify where it will be.
    constructor(parent) {
        
        let moveSpeed =  40;          // How fast this enemy moves
        let start_health = 2;
        let playerSize = 25;         // How big this enemy's image is
        let damage = 1;
        
        this._container = new createjs.Container();
        //this._image = new createjs.Shape();
        //this._image.graphics.beginFill(info.color ? info.color : "magenta").dp(0, 0, this.info.enemySize ? this.info.enemySize : 20, this.info.numberOfSides ? this.info.numberOfSides : 6);
        parent.addChild(this._container);
        this._container.addChild(this._image);
    }
}