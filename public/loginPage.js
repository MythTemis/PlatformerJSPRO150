const submitLogin = document.getElementById('submitLogin');

const loginClick = async evt => {
    switch(evt.target.id){
        case'submitLogin':
            let username = document.getElementById('username');
            let password = document.getElementById('password');
            let url = `http://platformerjspro.herokuapp.com/login/${username}/${password}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            if(data.match == true){
                window.location.href = 'home';
            }
            console.log(data);
            break;
    }
}

submitLogin.addEventListener('click', loginClick);