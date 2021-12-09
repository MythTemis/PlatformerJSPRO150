const Game = function(data) {

  this.world = new Game.World(data);

  this.update = function() {

    this.world.update();

  };

};
Game.prototype = { constructor : Game };


Game.Collider = function() {

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
        }w
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

Game.Collider.prototype = {
  constructor: Game.Collider,

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


Game.Object = function(x, y, width, height) {

  this.height = height;
  this.width  = width;
  this.x      = x;
  this.y      = y;

};

Game.Object.prototype = {

  constructor:Game.Object,

  getBottom : function()  { return this.y + this.height;       },
  getCenterX: function()  { return this.x + this.width  * 0.5; },
  getCenterY: function()  { return this.y + this.height * 0.5; },
  getLeft   : function()  { return this.x;                     },
  getRight  : function()  { return this.x + this.width;        },
  getTop    : function()  { return this.y;                     },
  setBottom : function(y) { this.y = y - this.height;          },
  setCenterX: function(x) { this.x = x - this.width  * 0.5;    },
  setCenterY: function(y) { this.y = y - this.height * 0.5;    },
  setLeft   : function(x) { this.x = x;                        },
  setRight  : function(x) { this.x = x - this.width;           },
  setTop    : function(y) { this.y = y;                        }
};
Game.MovingObject = function(x, y, width, height, velocity_max = 20) {

  Game.Object.call(this, x, y, width, height);

  this.jumping      = false;
  this.velocity_max = velocity_max;
  this.velocity_x   = 0;
  this.velocity_y   = 0;
  this.x_old        = x;
  this.y_old        = y;

};
Game.MovingObject.prototype = {

  getOldBottom : function()  { 
    return this.y_old + this.height;      
  },
  getOldCenterX: function()  { 
    return this.x_old + this.width  * 0.5;
  },
  getOldCenterY: function()  { 
    return this.y_old + this.height * 0.5; 
  },
  getOldLeft   : function()  { 
    return this.x_old;                     
  },
  getOldRight  : function()  { 
    return this.x_old + this.width;        },
  getOldTop    : function()  { return this.y_old;                     
  },
  setOldBottom : function(y) { 
    this.y_old = y    - this.height;       },
  setOldCenterX: function(x) { this.x_old = x    - this.width  * 0.5; 
  },
  setOldCenterY: function(y) { 
    this.y_old = y    - this.height * 0.5; },
  setOldLeft   : function(x) { this.x_old = x;                        
  },
  setOldRight  : function(x) { 
    this.x_old = x    - this.width;        
  },
  setOldTop    : function(y) { 
    this.y_old = y;                        
  }

};
Object.assign(Game.MovingObject.prototype, Game.Object.prototype);
Game.MovingObject.prototype.constructor = Game.MovingObject;

Game.Door = function(door) {

  Game.Object.call(this, door.x, door.y, door.width, door.height);

  this.destination_x    = door.destination_x;
  this.destination_y    = door.destination_y;
  this.destination_zone = door.destination_zone;

};
Game.Door.prototype = {

  collideObject(object) {

    let center_x = object.getCenterX();
    let center_y = object.getCenterY();

    if (center_x < this.getLeft() || center_x > this.getRight() ||
      center_y < this.getTop() || center_y > this.getBottom()) return false;

    return true;

  }

};
Object.assign(Game.Door.prototype, Game.Object.prototype);
Game.Door.prototype.constructor = Game.Door;

Game.Player = function(x, y) {
  this.color1 = '#000';
  this.color2 = '#fff';
  Game.MovingObject.call(this, x, y, 20, 20);

  this.health = 3;
  this.jumping     = true;
  this.direction_x = -1;
  this.velocity_x  = 0;
  this.velocity_y  = 0;

};
Game.Player.prototype = {

  jump: function() {

    if (!this.jumping && this.velocity_y < 10) {

      this.jumping = true;
      this.velocity_y -= 100;

    }

  },

  enemyCollision:function(enemy) {

    if ((Math.ceil(this.getBottom()) >= enemy.getTop() && Math.ceil(this.getBottom()) < enemy.getBottom()) && ((Math.ceil(this.getRight()) > Math.ceil(enemy.getLeft()) && (Math.ceil(this.getLeft()) < Math.ceil(enemy.getLeft()))) || ((Math.ceil(this.getLeft()) < Math.ceil(enemy.getRight())) && (Math.ceil(this.getRight()) > Math.ceil(enemy.getRight()))))) {
      enemy.health -= 1;
      enemy.x = 2500;
    }
    else if ((Math.ceil(this.getRight()) >= Math.ceil(enemy.getLeft())) && (Math.ceil(this.getLeft()) < Math.ceil(enemy.getLeft())) && (Math.ceil(this.getBottom()) > enemy.getTop() && Math.ceil(this.getBottom()) <= Math.ceil(enemy.getBottom()))) {
      this.health -= 1;
      if(this.health == 0){
        window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/death.html';
      }
      this.velocity_x = 0;
      this.x = enemy.getLeft() - 26;
      console.log(this.health);
    }
    else if ((Math.ceil(this.getLeft()) <= Math.ceil(enemy.getRight())) && (Math.ceil(this.getRight()) > Math.ceil(enemy.getRight())) && (Math.ceil(this.getBottom()) > enemy.getTop() && Math.ceil(this.getBottom()) <= Math.ceil(enemy.getBottom()))) {
      this.health -= 1;
      if(this.health == 0){
        window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/death.html';
      }
      this.velocity_x = 0;
      this.x = enemy.getRight() + 14;
      console.log(this.health);
    }

    return enemy;

  },

  moveLeft: function() {

    this.direction_x = -1;
    this.velocity_x -= 1;

  },

  moveRight:function(frame_set) {

    this.direction_x = 1;
    this.velocity_x += 1;

  },

  updatePosition:function(gravity, friction) {

    this.x_old = this.x;
    this.y_old = this.y;

    this.velocity_y += gravity;
    this.velocity_x *= friction;

    /* Made it so that velocity cannot exceed velocity_max */
    if (Math.abs(this.velocity_x) > this.velocity_max)
    this.velocity_x = this.velocity_max * Math.sign(this.velocity_x);

    if (Math.abs(this.velocity_y) > this.velocity_max)
    this.velocity_y = this.velocity_max * Math.sign(this.velocity_y);

    this.x += this.velocity_x;
    this.y += this.velocity_y;
    // console.log(this.x, this.y);

  }

};
Object.assign(Game.Player.prototype, Game.MovingObject.prototype);
Game.Player.prototype.constructor = Game.Player;

Game.Enemy = function(data) {
  
  Game.Object.call(this, data.x, data.y, data.width, data.height);

  this.health = 1;
  this.x = data.x;
  this.y = data.y;

  this.color1 = data.color1;
  this.color2 = data.color2;

  this.height = data.width;
  this.width = data.height;
  this.enemyAlive = data.enemyAlive;

  this.velocity_x = 0;
  this.velocity_y = 0;

  this.timeCount = 0;

};

Game.Enemy.prototype = {

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

  getBottom:function() { return this.y + this.height; },
  getLeft:function() { return this.x; },
  getRight:function() { return this.x + this.width; },
  getTop:function() { return this.y; },

  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },

  update:function() {

    this.x_old = this.x;
    this.y_old = this.y;
    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Game.TileSet = function(columns, tile_size) {

  this.columns    = columns;
  this.tile_size  = tile_size;

};
Game.TileSet.prototype = { constructor: Game.TileSet };

Game.World = function(friction = 0.85, gravity = 2, data) {

  this.collider  = new Game.Collider();

  this.friction  = friction;
  this.gravity   = gravity;

  this.columns   = 12;
  this.rows      = 9;

  this.tile_set  = new Game.TileSet(5, 48);
  this.player    = new Game.Player(0, 300);
  this.enemies = undefined;

  this.zone_id = "0";// The current zone.

  this.doors = [];
  this.door = undefined; // If the player enters a door, the game will set this property to that door and the level will be loaded.

  this.height = this.tile_set.tile_size * this.rows;
  this.width = this.tile_set.tile_size * this.columns;

};
Game.World.prototype = {

  constructor: Game.World,

  collideObject:function(object) {

    var bottom, left, right, top, value;

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    top    = Math.floor(object.getTop()    / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[top * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, top * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    left   = Math.floor(object.getLeft()   / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + left];
    this.collider.collide(value, object, left * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

    bottom = Math.floor(object.getBottom() / this.tile_set.tile_size);
    right  = Math.floor(object.getRight()  / this.tile_set.tile_size);
    value  = this.collision_map[bottom * this.columns + right];
    this.collider.collide(value, object, right * this.tile_set.tile_size, bottom * this.tile_set.tile_size, this.tile_set.tile_size);

  },

  
  setup:function(zone) {

    
    this.graphical_map = zone.graphical_map;
    this.collision_map = zone.collision_map;
    this.columns = zone.columns;
    this.rows = zone.rows;
    this.doors = new Array();
    this.zone_id = zone.id;
    this.enemies = new Array();

    for (let index = zone.doors.length - 1; index > -1; -- index) {

      let door = zone.doors[index];
      this.doors[index] = new Game.Door(door);

    }

    if(zone.enemies != undefined) {
      for(let i = 0; i < zone.enemies.length; i++) {
        let enemy = zone.enemies[i];
        this.enemies[i] = new Game.Enemy(enemy);
      }
    }
    

    
    if (this.door) {
      if (this.door.destination_x != -1) {

        this.player.setCenterX   (this.door.destination_x);
        this.player.setOldCenterX(this.door.destination_x);

      }

      if (this.door.destination_y != -1) {

        this.player.setCenterY   (this.door.destination_y);
        this.player.setOldCenterY(this.door.destination_y);

      }

      this.door = undefined;

    }

  },

  update:function() {

    this.player.updatePosition(this.gravity, this.friction);
    for(let i = 0; i< this.enemies.length; i++) {
      this.enemies[i].update();
    }
    this.collideObject(this.player);

    for(let index = this.doors.length - 1; index > -1; -- index) {

      let door = this.doors[index];

      if (door.collideObject(this.player)) {

        this.door = door;

      };

    }

    
  }
}