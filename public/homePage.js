const play = document.getElementById('play');
const login = document.getElementById('login');
const logout = document.getElementById('logout');

const homeClick = evt => {
    console.log(evt.target.id);
    switch(evt.target.id){
        case'play':
            window.location.href = 'game';
            break;
        case'login':
            window.location.href = 'login';
            break;
        case'logout':
            window.location.href = 'home';
            break;
    }
}

play.addEventListener('click', homeClick);
login.addEventListener('click', homeClick);
logout.addEventListener('click', homeClick);