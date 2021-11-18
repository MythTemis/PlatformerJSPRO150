var canvas = document.getElementById("game");
canvas.width = 720;
canvas.height = 720;
const minX = 0, maxX = 700;
const minY = 0, maxY = 700;
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
var enemyX = Math.random() * (maxX - minX) + minX;
var enemyY = Math.random() * (maxY - minY) + minY;
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

const drawEnemy = () => {
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.fillRect(enemyX, enemyY, 30, 40);
    ctx.closePath();
}

const drawUpdate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter();
    drawEnemy();
    x += dx;
    y -= dy;
}

const drawEnemyUpdate = () => {
    let num = Math.floor(Math.random() * (100 - 0 + 1) + 0);
    let num2 = Math.floor(Math.random() * (100 - 0 + 1) + 0);

    if((num % 2) == 0){
        enemyX += 3;
    } else{
        enemyX -= 3;
    }

    if((num2 % 2) == 0){
        enemyY += 3;
    } else{
        enemyY -= 3;
    }
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
    if(isPressed && y < maxY) {
        dy = 5;
    }else{
        dy = 0;
    };
};

const moveDown = (isPressed) => {
    if(isPressed && y > minY) {
        dy = -5;
    }else{
        dy = 0;
    };
};

const moveLeft = (isPressed) => {
    if(isPressed && x > minX) {
        dx = -5;
    }else{
        dx = 0;
    };
};

const moveRight = (isPressed) => {
    if(isPressed && x < maxX) {
        dx = 5;
    }else{
        dx = 0;
    };
};

//starts everything
const init = () => {
    drawCharacter();
    drawEnemy();
    setInterval(drawUpdate, 10);
    setInterval(drawEnemyUpdate, 100);
}
init();

