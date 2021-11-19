onst drawCharacter = () => {
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
        dy = 1;
    }else{
        dy = 0;
    };
};

const moveDown = (isPressed) => {
    if(isPressed && y > minY) {
        dy = -1;
    }else{
        dy = 0;
    };
};

const moveLeft = (isPressed) => {
    if(isPressed && x > minX) {
        dx = 1;
    }else{
        dx = 0;
    };
};

const moveRight = (isPressed) => {
    if(isPressed && x < maxX) {
        dx = -1;
    }else{
        dx = 0;
    };
};

//starts everything
const init = () => {
    level = new level ()
    drawCharacter();
    drawEnemy();
    setInterval(drawUpdate, 10);
    setInterval(drawEnemyUpdate, 100);
}
init();