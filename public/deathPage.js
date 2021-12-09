const yes = document.getElementById('yes');
const no = document.getElementById('no');

const deathClick = evt => {
    switch(evt.target.id){
        case'yes':
            window.location.href = 'home';
            break;
    }
}

yes.addEventListener('click', deathClick);
no.addEventListener('click', deathClick);