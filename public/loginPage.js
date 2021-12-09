const submitLogin = document.getElementById('submitLogin');

const cheat = () => {
    window.location.href = 'game';
}

const loginClick = async (evt) => {
    switch(evt.target.id){
        case'submitLogin':
            const form = document.getElementById('loginForm');
            let url = `https://platformerjspro.herokuapp.com/login`;
            form.submit();
            break;
    }
}

submitLogin.addEventListener('click', loginClick);