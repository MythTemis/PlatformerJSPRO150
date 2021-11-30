window.addEventListener("load", function(event) {

    "use strict";

    var enemyAlive = true;



    var keyDownUp = function(event) {

        controller.keyDownUp(event.type, event.key);

    };

    var resize = function(event) {

        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();

    };

    var render = function() {

        display.drawMap(game.world.map, game.world.columns);
        display.drawObject(game.world.player, game.world.player.color1, game.world.player.color2);
        if (enemyAlive) {
            display.drawObject(game.world.enemy, game.world.enemy.color1, game.world.enemy.color2);
        }
        display.render();
    };

    var update = function() {

        if (controller.left.active)  { 
            game.world.player.moveLeft();  
        }
        if (controller.right.active) { 
            game.world.player.moveRight(); 
        }
        if (controller.up.active)  { 
            game.world.player.jump(); controller.up.active = false; 
        }

        game.world.enemy.move();

        game.world.enemy = game.world.player.enemyCollision(game.world.enemy);

        if (game.world.enemy.health == 0) {
            enemyAlive = false;
        }

        game.update();

    };

    

    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000/30, render, update);

    

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    display.tile_sheet.image.addEventListener("load", function(event) {

        resize();

        engine.start();

    }, { once:true });

    display.tile_sheet.image.src = "Data/WorldTiles.png";

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);

    });