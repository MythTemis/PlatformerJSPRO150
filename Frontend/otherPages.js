const play = document.getElementById('play');
const login = document.getElementById('login');
const create = document.getElementById('create');
const yes = document.getElementById('yes');
const no = document.getElementById('no');
const logout = document.getElementById('logout');
const submitLogin = document.getElementById('submitLogin');
const submitCreate = document.getElementById('submitCreate');

const handleClick = evt => {
    console.log(evt.target.id);
    switch(evt.target.id){
        case'play':
            window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/index.html';
            break;
        case'yes':
            window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/home.html';
            break;
        case'no':
            console.log(evt.target.id);
            window.close();
            break;
        case'login':
            window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/login.html';
            break;
        case'create':
            window.location.href = 'file:///C:/Users/Ya%20Boi/Documents/GitHub/PlatformerJSPRO150/Frontend/create.html';
            break;
        case'logout':
            break;
        case'submitLogin':
            let username = document.getElementById('username');
            let password = document.getElementById('password');
            let url = `http://lacalhost:3000/login/${username}/${password}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if(data.match == true){
                window.location.href = 'home.html';
            }
            console.log(data);
            break;
        case'submitCreate':
            break;
    }
}

play.addEventListener('click', handleClick);
login.addEventListener('click', handleClick);
create.addEventListener('click', handleClick);
yes.addEventListener('click', handleClick);
no.addEventListener('click', handleClick);