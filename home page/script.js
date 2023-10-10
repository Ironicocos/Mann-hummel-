document.addEventListener("DOMContentLoaded", function(){
    const openPopUp = document.getElementById("openPopUp");
    const closePopUp = document.getElementById("closePopUp");
    const modal = document.getElementById("myModal");

    openPopUp.addEventListener("click", function(){
        modal.style.display = "block";
    });
    closePopUp.addEventListener("click", function(){
        modal.style.display = "none";
    });
    window.addEventListener("submit", function(event){
        event.preventDefault();
        window.location.reload();
    });
    window.addEventListener("click", function(event){
        if (event.target === modal){
            modal.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function(){
    const loginData = document.getElementById("loginData");
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function(event){
        event.preventDefault();
        const username = document.getElementById("username").value;
        const rolElement = document.getElementById("rol");
        const rol = rolElement.options[rolElement.selectedIndex].value;
        const userData = {
        username: username,
        rol: rol,
    }
    const jsonData = JSON.stringify(userData);
    localStorage.setItem("loginData", jsonData);
    })
    const jsonData = localStorage.getItem("loginData");
    if (jsonData) {
        const userData = JSON.parse(jsonData);
        const texto = document.createTextNode(`Has ingresado como ${userData.username}, con el rol de ${userData.rol}.`);
        loginData.appendChild(texto);
        alert("¡Advertencia! Ya estás loggeado con un usuario");
    } else {
        console.log("No se encontraron datos de inicio de sesión.")
    }
})

const memberButton = document.getElementById('memberList');
let isShown = false;
function toggleList (){
    if (isShown){
        document.getElementById('list').style.display = 'none'
        document.getElementById('list').style.width = '0px'

        isShown = false;
    }
    else{    
        document.getElementById('list').style.display = 'block'
        document.getElementById('list').style.width = '250px'
        isShown = true;
    }
}

function logOut(){
    localStorage.clear();
    window.location.reload();
}
