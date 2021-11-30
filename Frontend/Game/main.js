window.addEventListener("load", function(event) {

    "use strict";

    const ZONE_PREFIX = "Worlds/world";
    const ZONE_SUFFIX = ".json";

    const AssetsManager = function() {
        this.tile_set_image = undefined;
    }
    AssetsManager.prototype = {
        constructor: Game.AssetsManager,

        requestJSON: async function(url, callback) {
            
            const response = await fetch(url);
            const data = await response.json();
            response.addEventListener('load', function(evt) {
                callback(data)
                
            })
            
            console.log(data);
            return data;
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

        display.drawMap(assets_manager.tile_set_image, game.world.tile_set.columns, game.world.map, game.world.columns,  game.world.tile_set.tile_size);
        display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
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

        game.update();

        if(game.world.door) {
            engine.stop();

            assets_manager.requestJSON(ZONE_PREFIX + game.world.door.destination_zone + ZONE_SUFFIX, (zone) => {

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

    assets_manager.requestJSON(ZONE_PREFIX + game.world.zone_id + ZONE_SUFFIX, (zone) => {

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