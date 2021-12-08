let world0key = false;
let world1key = false;
let world2key = false;

window.addEventListener("load", function(event) {

    "use strict";

    const ZONE_PREFIX = "Worlds/world";
    const ZONE_SUFFIX = ".json";
    var enemyAlive = true;


    const AssetsManager = function() {
        this.tile_set_image = undefined;
    }
    AssetsManager.prototype = {
        constructor: Game.AssetsManager,

        requestJSON: async function(id, callback) {
            const response = await fetch(`http://localhost:3000/world/${id}`);
            const data = await response.json();
            console.log(data);
            callback(data);
        },

        requestImage:function(url, callback) {

            let image = new Image();

            image.addEventListener("load", function(event) {

                callback(image);

            }, { once:true });

            image.src = url;

        },

    }

    var keyDownUp = function(event) {

        controller.keyDownUp(event.type, event.key);
    };

    var resize = function(event) {
        display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.render();

    };

    var render = function() {

        display.drawMap(assets_manager.tile_set_image, game.world.tile_set.columns, game.world.graphical_map, game.world.columns,  game.world.tile_set.tile_size);
        display.drawObject(game.world.player, game.world.player.color1, game.world.player.color2);
        for(let i=0; i < game.world.enemies.length; i++) {
            if (game.world.enemies[i].enemyAlive) {
                display.drawObject(game.world.enemies[i], game.world.enemies[i].color1, game.world.enemies[i].color2);
            }
        }

        for(let i = 0; i< game.world.keys.length; i++){
            if(!game.world.keys[i].isPickedUp) {
                display.drawKey(game.world.keys[i].image, game.world.keys[i].x, game.world.keys[i].y)
            }
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
            game.world.player.jump(); 
            controller.up.active = false; 
        }

        for(let i = 0; i< game.world.keys.length; i++){
            switch(game.world.zone_id){
                case '0' :
                    game.world.keys[i] = game.world.player.keyCollision(game.world.keys[i]);
                    world0key = game.world.keys[i].isPickedUp;
                case '1':
                    game.world.keys[i] = game.world.player.keyCollision(game.world.keys[i]);
                    world1key = game.world.keys[i].isPickedUp;
                case '2':
                    game.world.keys[i] = game.world.player.keyCollision(game.world.keys[i]);
                    world2key = game.world.keys[i].isPickedUp;
            }
            
        }
        for(let i = 0; i< game.world.enemies.length; i++){
            game.world.enemies[i].move();
            game.world.enemies[i] = game.world.player.enemyCollision(game.world.enemies[i]);
            
            if (game.world.enemies[i].health == 0) {
                game.world.enemies[i].enemyAlive = false;
            }
        }
        
        var health = document.getElementById('health');
        var keys = document.getElementById('key');
        health.setAttribute("style", "color:#000; font-size:2.0em; position:fixed; padding: 2px 60px ");
        keys.setAttribute("style", "color:#000; font-size:2.0em; position:fixed; padding: 35px 60px ");
        game.update();
        health.innerHTML = `Health: ${game.world.player.health}`;
        keys.innerHTML = `Keys: ${game.world.player.keyCount}`;
        if(game.world.door) {
            engine.stop();

            assets_manager.requestJSON(game.world.door.destination_zone, (zone) => {
                //console.log(zone.Game.zone_id);
                game.world.setup(zone);
        
                engine.start();
        
            });
            return;
        }

    };

    

    var controller = new Controller();
    var assets_manager = new AssetsManager();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    var engine = new Engine(1000/30, render, update);

    

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;
    display.buffer.imageSmoothingEnabled = false;

    assets_manager.requestJSON(game.world.zone_id, (zone) => {

        game.world.setup(zone);
        
        assets_manager.requestImage("Data/WorldTiles.png", (image) => {

            assets_manager.tile_set_image = image;
    
            resize();
            engine.start();
    
        });
    
    });


    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup",   keyDownUp);
    window.addEventListener("resize",  resize);

    });