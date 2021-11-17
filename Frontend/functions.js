var canvas = document.getElementById("game");
canvas.width = 720;
canvas.height = 720;
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 0;
var dy = 0;
const charDimension = [10, 10, 10, 20]



//Drawing the square
const drawCharacter = () => {
    ctx.beginPath();
    ctx.fillStyle = "#0095DD";
    ctx.fillRect(x, y, 30, 40);
    ctx.closePath();
}

const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    x += dx;
    y -= dy;
}

//Key down event listener
document.addEventListener('keydown',  (evt) => {

    
    if(!evt) {
        var evt = window.event;
    }
    switch(evt.key) {
        case('w'):
            console.log('Moving Up')
            moveUp(true);
            break;
        case('s'):
            console.log('Moving Down');
            moveDown(true);
            break;
        case('a'):
            console.log('Moving Left');
            moveLeft(true);
            break;
        case('d'):
            console.log('Moving Right');
            moveRight(true);
            break;

    }
}, false);

//keyup event listener
document.addEventListener('keyup', (evt) => {
    
    if(!evt) {
        var evt = window.event;
    }
    switch(evt.key) {
        case('w'):
            console.log('Stop move up');
            moveUp(false);
            break;
        case('s'):
            console.log('Stop move down');
            moveDown(false);
            break;
        case('a'):
            console.log('Stop move left');
            moveLeft(false);
            break;
        case('d'):
            console.log('Stop move right');
            moveRight(false);
            break;
    }
    
    
}, false);

const moveUp = (isPressed) => {
    if(isPressed) {
        dy = 7;
    }else{
        dy = 0;
    };
};

const moveDown = (isPressed) => {
    if(isPressed) {
        dy = -7;
    }else{
        dy = 0;
    };
};

const moveLeft = (isPressed) => {
    if(isPressed) {
        dx = -7;
    }else{
        dx = 0;
    };
};

const moveRight = (isPressed) => {
    if(isPressed) {
        dx = 7;
    }else{
        dx = 0;
    };
};

drawCharacter();
setInterval(draw, 10);


