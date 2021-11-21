class player {
    //send in this.gamespace? something to signify where it will be.
    constructor(x, y) {
        this.start_health = 2;
        this.color      = "#ff0000";
        this.height     = 5;
        this.jumping    = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width      = 5;
        this.x          = 100;
        this.y          = 50;
        
        this._container = new createjs.Container();
        //this._image = new createjs.Shape();
        //this._image.graphics.beginFill(info.color ? info.color : "magenta").dp(0, 0, this.info.enemySize ? this.info.enemySize : 20, this.info.numberOfSides ? this.info.numberOfSides : 6);
        parent.addChild(this._container);
        this._container.addChild(this._image);
    }
    
    prototype = {
        constructor : Game.Player,

        jump:function() {

            if (!this.jumping) {
                this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);
            
                if (this.color.length != 7) {
                    this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);
                }

            this.jumping     = true;
            this.velocity_y -= 20;

            }

    },

    moveLeft:function()  { this.velocity_x -= 0.5; },
    moveRight:function() { this.velocity_x += 0.5; },

    update:function() {

    this.x += this.velocity_x;
    this.y += this.velocity_y;

    }

    }
}