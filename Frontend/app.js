var app = {

    // This will hold the stage variable needed for createJS
    stage: null,
    gamespace: null,

    // Store a reference to the game canvas and the context
    canvas: null,
    ctx: null,

    // Screen settings and container
    SCREEN_WIDTH: 1080,
    SCREEN_HEIGHT: 720,
    screen: null,

    // Keep track of the game time
    elapsedTime: 0, // total app time
    gameTime: 0, // time for this session, reset when entering game
    nextSpawnTime: 0,

    // Game Settings
    FPS: 30,
    currentLevel: 1,
    player: null,


    // Keyboard input info
    KEYCODE_LEFT : { code: 37, isPressed: false},
    KEYCODE_UP : { code: 38, isPressed: false},
    KEYCODE_RIGHT : { code: 39, isPressed: false},
    KEYCODE_DOWN : { code: 40, isPressed: false},
    KEYCODE_SPACEBAR : { code: 32, isPressed: false},
    KEYCODE_W : { code: 87, isPressed: false},
    KEYCODE_A : { code: 65, isPressed: false},
    KEYCODE_S : { code: 83, isPressed: false},
    KEYCODE_D : { code: 68, isPressed: false},


    // Setup the canvas
    setupCanvas: function() {
      this.canvas = document.getElementById("game"); //get canvas with id='game'
      this.canvas.width = this.SCREEN_WIDTH;
      this.canvas.height = this.SCREEN_HEIGHT;
      this.ctx = this.canvas.getContext("2d");
      this.stage = new createjs.Stage(this.canvas); //makes stage object from the canvas
    },

    // Run once when the page loads
    init: function () {
        // Sets up the canvas and our screen
        this.setupCanvas(); 
        this.gamespace = new createjs.Container();
        this.gamespace.setBounds(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        var background = new createjs.Shape();
        background.graphics.beginFill('#adff5b').dr(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.stage.addChild(this.gamespace);
        this.gamespace.addChild(background);

        this.screen = new createjs.Container();
        this.screen.setBounds(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
        this.stage.addChild(this.screen);

        // Enable and track mouse input
        this.stage.enableMouseOver();
        
        this.stage.on("stagemousemove", function(evt) {
            app.mousePos.x = Math.floor(evt.stageX);
            app.mousePos.y = Math.floor(evt.stageY);
            //console.log("Mouse: ( " + app.mouseX + ", " + app.mouseY + " )");
        });
        this.stage.on("stagemousedown", function (evt) {
            app.handleMouseDown(evt);
        });
		this.stage.on("stagemouseup", function (evt) {
            app.handleMouseUp(evt);
        });

        // Set up our basic keyboard inputs 
        document.onkeydown = this.handleKeyDown;
        document.onkeyup = this.handleKeyUp;

        
        // Set up our game loop
        createjs.Ticker.addEventListener("tick", this.update);
        createjs.Ticker.framerate = this.FPS;

        // Create the first screen
        this.gotoScreen("menus");


    },



}