// function eventListeners() {
//     const mobileMenu = document.querySelector('.mobile-menu');

//     mobileMenu.addEventListener('click', navegacionResponsive);
// }

// function navegacionResponsive() {
//     const navegacion = document.querySelector('.navegacion-principal');

//     navegacion.classList.toggle('mostrar')
// }

document.getElementById("mobile-menu").onclick = function(){ 
    const navegacion = document.getElementById('navegacion')

    navegacion.classList.toggle('mostrar')
}

