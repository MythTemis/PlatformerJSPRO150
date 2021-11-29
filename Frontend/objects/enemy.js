class enemy {
    //send in this.gamespace? something to signify where it will be.
    constructor(x, y) {
        this.start_health = 1;
        this.color      = "#000000";
        this.height     = 5;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width      = 5;
        this.x          = 80;
        this.y          = 50;
        
        this._container = new createjs.Container();
        //this._image = new createjs.Shape();
        //this._image.graphics.beginFill(info.color ? info.color : "magenta").dp(0, 0, this.info.enemySize ? this.info.enemySize : 20, this.info.numberOfSides ? this.info.numberOfSides : 6);
        parent.addChild(this._container);
        this._container.addChild(this._image);
    }
    
    prototype = {
        constructor : this.enemy,

        move:function() {
            let minimum = 0, maximum = 1;
            let num = Math.floor(Math.random() * (maximum - minimum)) + minimum

            if(num == 0){
                this.moveLeft;
            }else{
                this.moveRight;
            }
        },

        get bottom() { return this.y + this.height; },
        get left() { return this.x; },
        get right() { return this.x + this.width; },
        get top() { return this.y; },

        moveLeft:function()  { this.velocity_x -= 0.5; },
        moveRight:function() { this.velocity_x += 0.5; },

        update:function() {
            this.x += this.velocity_x;
            this.y += this.velocity_y;
        }
    }
}