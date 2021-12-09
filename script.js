



const login = async () => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let url = `https://platformerjspro.herokuapp.com/login/${username}/${password}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    if(data.match == true) {
        window.location.href = 'game.html';
    }
    console.log(data);
}