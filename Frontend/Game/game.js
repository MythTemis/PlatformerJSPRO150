const Game = function() {

  this.world = new Game.World();

  this.update = function() {

    this.world.update();

  };

};

Game.prototype = { constructor : Game };


Game.World = function(friction = 0.9, gravity = 3) {

  this.friction = friction;
  this.gravity  = gravity;

  this.player   = new Game.World.Player();

  this.columns   = 12;
  this.rows      = 9;
  this.tile_size = 48;
  this.map = [13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
              13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
              13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 
              35, 38, 38, 34, 38, 36, 33, 36, 38, 34, 38, 35, 
              58, 58, 58, 58, 58, 57, 58, 59, 58, 58, 58, 58, 
              15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
              15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
              15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 
              22, 23, 22, 23, 22, 23, 22, 23, 22, 23, 22, 23];

  this.height   = this.tile_size * this.rows;
  this.width    = this.tile_size * this.columns;

};

Game.World.prototype = {

  constructor: Game.World,

  collideObject:function(object) {

    if (object.x < 0) { 
      object.x = 0; object.velocity_x = 0; 
    }
    else if (object.x + object.width > this.width) { 
      object.x = this.width - object.width; object.velocity_x = 0; 
    }
    if (object.y < 0) { 
      object.y = 0; object.velocity_y = 0; 
    }
    else if (object.y + object.height > this.height) { 
      object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; 
    }

  },

  update:function() {

    this.player.velocity_y += this.gravity;
    this.player.update();

    this.player.velocity_x *= this.friction;
    this.player.velocity_y *= this.friction;

    this.collideObject(this.player);

  }

};

Game.World.Player = function(x, y) {

  this.color1     = "#404040";
  this.color2     = "#f0f0f0";
  this.height     = 12;
  this.width      = 12;
  this.jumping    = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.x          = 50;
  this.y          = 300;

};

Game.World.Player.prototype = {

  constructor : Game.World.Player,

  jump:function() {

    if (!this.jumping) {

      this.jumping     = true;
      this.velocity_y -= 27;

    }

  },

  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },

  update:function() {

    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};