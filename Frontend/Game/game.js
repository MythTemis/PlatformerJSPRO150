const Game = function() {

  this.world = new Game.World();

  this.update = function() {

    this.world.update();

  };

};

Game.prototype = { constructor : Game };


Game.World = function(friction = 0.9, gravity = 3) {

  this.collider = new Game.World.Collider();
  this.friction = friction;
  this.gravity  = gravity;

  this.player   = new Game.World.Player();
  this.enemy    = new Game.World.Enemy(112, 372);

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

/*Collision system
          0
        0   0
          0 */

  this.collisionMap = [0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      0,0,0,0,0,0,0,0,0,0,0,0,
                      01,01,01,01,01,01,01,01,01,01,01,01];

  this.height   = this.tile_size * this.rows;
  this.width    = this.tile_size * this.columns;

};

Game.World.prototype = {

  constructor: Game.World,

  collideObject:function(object) {

    if (object.getLeft() < 0) { 
      object.setLeft(0);
      object.velocity_x = 0; 
    }
    else if (object.getRight() > this.width ) { 
      object.setRight(this.width);   
      object.velocity_x = 0; 
    }

    if (object.getTop() < 0 ) { 
      object.setTop(0);              
      object.velocity_y = 0; 
    }
    else if (object.getBottom() > this.height) { 
      object.setBottom(this.height); object.velocity_y = 0; 
      object.jumping = false; 
    }

    var top,
      bottom,
      left,
      right,
      value

      top    = Math.floor(object.getTop()    / this.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_size);
      value  = this.collisionMap[top * this.columns + left];
      this.collider.collide(value, object, left * this.tile_size, top * this.tile_size, this.tile_size);
  
      top    = Math.floor(object.getTop()    / this.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_size);
      value  = this.collisionMap[top * this.columns + right];
      this.collider.collide(value, object, right * this.tile_size, top * this.tile_size, this.tile_size);
  
      bottom = Math.floor(object.getBottom() / this.tile_size);
      left   = Math.floor(object.getLeft()   / this.tile_size);
      value  = this.collisionMap[bottom * this.columns + left];
      this.collider.collide(value, object, left * this.tile_size, bottom * this.tile_size, this.tile_size);
  
  
      bottom = Math.floor(object.getBottom() / this.tile_size);
      right  = Math.floor(object.getRight()  / this.tile_size);
      value  = this.collisionMap[bottom * this.columns + right];
      this.collider.collide(value, object, right * this.tile_size, bottom * this.tile_size, this.tile_size);
  },

  update:function() {

    this.player.velocity_y += this.gravity;
    this.player.update();

    this.player.velocity_x *= this.friction;
    this.player.velocity_y *= this.friction;

    this.enemy.update();

    this.collideObject(this.player);

  }

};

Game.World.Collider = function() {

  this.collide = function(value, obj, tile_x, tile_y, tile_size) {

    switch(value) {
      //Check top
      case 1: 
        this.collideTop(obj, tile_y);
        break;
      //Check 
      case 2:
        this.collideRight(obj, tile_x + tile_size)
        break;
      case 3: 
        if (this.collideTop(obj, tile_y)) {
          return;// If there's a collision, we don't need to check for anything else.
        } 
        this.collideRight (obj, tile_x + tile_size); 
        break;
      case 4: 
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 5: 
        if (this.collideTop(obj, tile_y)) {
          return;// If there's a collision, we don't need to check for anything else.
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 6:
        if(this.collideRight(obj, tile_x + tile_size)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size)
        break;
      case 7: 
        if(this.collideTop(obj, tile_y)) {
          return;
        }
        if(this.collideRight(obj, tile_x + tile_size)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 8: 
        this.collideLeft(obj, tile_x);
        break;
      case 9: 
        if(this.collideTop(obj, tile_y)){
          return;
        }
        this.collideLeft(obj, tile_x);
        break;
      case 10: 
        if(this.collideLeft(obj, tile_x)){
          return;
        }
        this.collideRight(obj, tile_x + tile_size);
        break;
      case 11:  
        if(this.collideTop(obj, tile_y)){
          return;
        }
        if(this.collideLeft(obj, tile_x)){
          return;
        }
        this.collideRight(obj, tile_x + tile_size)
        break;
      case 12: 
        if(this.collideLeft(obj,tile_x)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 13: 
        if(this.collideTop(obj, tile_y)) {
          return;
        }
        if(this.collideLeft(obj, tile_x)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 14:
        if(this.collideLeft(obj, tile_x)) {
          return;
        }
        if(this.collideRight(obj, tile_x)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
      case 15:
        if(this.collideTop(obj, tile_y)) {
          return;
        }
        if(this.collideLeft(obj, tile_x)) {
          return;
        }
        if(this.collideRight(obj, tile_x + tile_size)) {
          return;
        }
        this.collideBottom(obj, tile_y + tile_size);
        break;
    }
  }  
}

Game.World.Collider.prototype = {
  constructor: Game.World.Collider,

  collideBottom:function(object, tile_bottom) {

    if (object.getTop() < tile_bottom && object.getOldTop() >= tile_bottom) {

      object.setTop(tile_bottom);
      object.velocity_y = 0;     
      return true;               

    } return false;             

  },

  collideLeft:function(object, tile_left) {

    if (object.getRight() > tile_left && object.getOldRight() <= tile_left) {

      object.setRight(tile_left - 0.01);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collideRight:function(object, tile_right) {

    if (object.getLeft() < tile_right && object.getOldLeft() >= tile_right) {

      object.setLeft(tile_right);
      object.velocity_x = 0;
      return true;

    } return false;

  },

  collideTop:function(object, tile_top) {

    if (object.getBottom() > tile_top && object.getOldBottom() <= tile_top) {

      object.setBottom(tile_top - 0.01);
      object.velocity_y = 0;
      object.jumping    = false;
      return true;

    } return false;

  }
  
}

Game.World.Object = function(x, y, width, height) {

  this.height = height;
  this.width  = width;
  this.x      = x;
  this.x_old  = x;
  this.y      = y;
  this.y_old  = y;
  
};

Game.World.Object.prototype = {

  constructor:Game.World.Object,

  /* These functions are used to get and set the different side positions of the object. */
  getBottom: function()  { 
    return this.y     + this.height; 
  },
  getLeft: function()  { 
    return this.x;                   
  },
  getRight: function()  { 
    return this.x     + this.width;  
  },
  getTop: function()  { 
    return this.y;                   
  },
  getOldBottom: function()  { 
    return this.y_old + this.height; 
  },
  getOldLeft: function()  { 
    return this.x_old;               
  },
  getOldRight: function()  { 
    return this.x_old + this.width;  
  },
  getOldTop: function()  { 
    return this.y_old                
  },
  setBottom: function(y) { 
    this.y     = y    - this.height; 
  },
  setLeft: function(x) { 
    this.x     = x;                  
  },
  setRight: function(x) { 
    this.x     = x    - this.width;  
  },
  setTop: function(y) { 
    this.y     = y;                  
  },
  setOldBottom: function(y) { 
    this.y_old = y    - this.height;
  },
  setOldLeft: function(x) { 
    this.x_old = x;                  
  },
  setOldRight: function(x) { 
    this.x_old = x    - this.width;  
  },
  setOldTop: function(y) { 
    this.y_old = y;                 
  }

};

Game.World.Player = function(x, y) {
  Game.World.Object.call(this, 100, 100, 12, 12);

  this.color1     = "#404040";
  this.color2     = "#f0f0f0";

  this.jumping    = true;
  this.velocity_x = 0;
  this.velocity_y = 0;

};

Game.World.Player.prototype = {

  jump:function() {

    if (!this.jumping) {

      this.jumping     = true;
      this.velocity_y -= 27;

    }

  },

  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },

  update:function() {

    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Game.World.Enemy = function(x, y) {
  Game.World.Object.call(this, x, y, 12, 12);

  this.color1     = "#f0f0f0";
  this.color2     = "#404040";

  this.velocity_x = 0;
  this.velocity_y = 0;

  this.timeCount = 0;

};

Game.World.Enemy.prototype = {

  move:function() {

    if (this.timeCount < 75) {
      this.velocity_x = 1;
      this.timeCount++;
    }
    else if (this.timeCount >= 75 && this.timeCount < 105) {
      this.velocity_x = 0;
      this.timeCount++;
    }
    else if (this.timeCount >= 105 && this.timeCount < 180) {
      this.velocity_x = -1;
      this.timeCount++;
    }
    else if (this.timeCount >= 180 && this.timeCount < 210) {
      this.velocity_x = 0;
      this.timeCount++;
    }
    else if (this.timeCount == 210) {
      this.timeCount = 0;
    }

  },

  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },

  update:function() {

    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Object.assign(Game.World.Player.prototype, Game.World.Object.prototype);
Game.World.Player.prototype.constructor = Game.World.Player;
