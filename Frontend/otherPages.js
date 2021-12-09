const play = document.getElementById('play');
const login = document.getElementById('login');
const create = document.getElementById('create');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const logout = document.getElementById('logout');
const submitLogin = document.getElementById('submitLogin');
const submitCreate = document.getElementById('submitCreate');

const homeClick = evt => {
    console.log(evt.target.id);
    switch(evt.target.id){
        case'play':
            window.location.href = 'game.html';
            break;
        case'login':
            window.location.href = 'login.html';
            break;
        case'create':
            window.location.href = 'create.html';
            break;
        case'logout':
            break;
    }
}

const loginClick = async () => {
    let username = document.getElementById('username');
    let password = document.getElementById('password');
    let url = `http://localhost:3000/login/${username}/${password}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    if(data.match == true){
        window.location.href = 'home.html';
    }
    console.log(data);
}

const deathClick = evt => {
    switch(evt.target.id){
        case'yes':
            window.location.href = 'home.html';
            break;
        case'no':
            console.log(evt.target.id);
            window.close();
            break;
    }
}

const createClick = async () => {
    
}

play.addEventListener('click', homeClick);
login.addEventListener('click', homeClick);
create.addEventListener('click', homeClick);
yes.addEventListener('click', deathClick);
no.addEventListener('click', deathClick);
submitLogin.addEventListener('click', loginClick);
submitCreate.addEventListener('click', createClick);