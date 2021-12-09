const play = document.getElementById('play');
const logout = document.getElementById('logout');

const homeClick = evt => {
    console.log(evt.target.id);
    switch(evt.target.id){
        case'play':
            window.location.href = 'https://platformerjspro.herokuapp.com/game';
            break;
        case'logout':
            window.location.href = '/';
            break;
    }
}

play.addEventListener('click', homeClick);
logout.addEventListener('click', homeClick);