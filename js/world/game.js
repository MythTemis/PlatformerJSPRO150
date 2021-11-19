var canvas = document.getElementById("game");
canvas.width = 720;
canvas.height = 720;
const minX = 0, maxX = 700;
const minY = 0, maxY = 700;

var x = 0;
var y = 0;
var enemyX = Math.random() * (maxX - minX) + minX;
var enemyY = Math.random() * (maxY - minY) + minY;
var dx = 0;
var dy = 0;
const charDimension = [10, 10, 10, 20]



//Drawing the square


const Game = () => {
    this.viewport = document.createElement('game');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.viewport.width = 800;
    this.viewport.height = 600;


    $container.insertBefore(this.viewport, canvas.firstChild);

    this.ctx.font = '32px Arial';
    this.contxt.fillText("The fuckin game", 5, 50, 800);
    return this;
    
}

window.game = new Game();
module.exports = game;

