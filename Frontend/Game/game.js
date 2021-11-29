const Game = function() {

  this.world = {

    background_color:"rgba(40,48,56,0.25)",

    friction:0.9,
    gravity:3,

    player:new Game.Player(),
    enemy: new Game.Enemy(),

    height:72,
    width:128,

    collideObject:function(object) {

      if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
      else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
      if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
      else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }

    },

    update:function() {

      enemy = this.player.enemyCollision(this.enemy);

      this.player.velocity_y += this.gravity;
      this.player.update();

      this.player.velocity_x *= this.friction;
      this.player.velocity_y *= this.friction;

      this.enemy.update();

      this.collideObject(this.player);

    }

  };

  this.update = function() {

    this.world.update();

  };

};

Game.prototype = { constructor : Game };

Game.Player = function(x, y) {

  this.health     = 3;
  this.color      = "#ff0000";
  this.height     = 5;
  this.jumping    = true;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.width      = 5;
  this.x          = 100;
  this.y          = 50;

};

Game.Enemy = function(x, y) {
  
  this.health     = 1;
  this.color      = "#000000";
  this.height     = 5;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.width      = 5;
  this.x          = 80;
  this.y          = 67;
  
}

Game.Player.prototype = {

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

  get bottom() { return this.y + this.height; },
  get left() { return this.x; },
  get right() { return this.x + this.width; },
  get top() { return this.y; },

  moveLeft:function()  { this.velocity_x -= 0.5; },
  moveRight:function() { this.velocity_x += 0.5; },

  enemyCollision:function(enemy) {

    if (this.bottom <= enemy.top && this.bottom > enemy.bottom) {
      enemy.health -=1;
      return enemy;
    }
    else if (this.left >= enemy.right && this.left < enemy.left) {
      this.health -= 1;
      this.x = enemy.right + 2;
      this.velocity_x = 0;
    }
    else if (this.right <= enemy.left && this.right > enemy.right) {
      this.health -= 1;
      this.x = enemy.left - 7;
      this.velocity_x = 0;
    }

  },

  update:function() {

    this.x += this.velocity_x;
    this.y += this.velocity_y;

  }

};

Game.Enemy.prototype = {
  constructor : this.enemy,

  move:function() {
      let minimum = 0, maximum = 1;
      let num = Math.round(Math.random() * (maximum - minimum))

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