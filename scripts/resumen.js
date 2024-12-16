document.addEventListener("DOMContentLoaded", () => {

    const selectedCity = JSON.parse(localStorage.getItem('city'));
    const cityPrice = localStorage.getItem('totalPrice');

    if (selectedCity == '' || cityPrice == '') {
        alert("No se ha seleccionado un destino.");
        window.location.href = '../index.html'; // Redirigir a la página inicial
        return;
    }

    const resumenContainer = document.getElementById('summary-details');
    if (resumenContainer) {
        resumenContainer.innerHTML = `
            <h3>Destino Seleccionado: ${selectedCity.city}</h3>
            <img src="${selectedCity.img}" className="image-resumen" alt="${selectedCity.city}" style="width: 100%; max-width: 300px;">
            <p>${selectedCity.desc}</p>
            <p><strong>Precio base:</strong> $${cityPrice}</p>
        `;
    }

    const totalPriceContainer = document.getElementById('total-price');
    totalPriceContainer.innerHTML = `<strong>Total (con hotel):</strong> $${totalPrice}`;
});

function index() {
    const name = document.querySelector('input[name="name"]');
    const email = document.querySelector('input[name="email"]');
    const phone = document.querySelector('input[name="phone"]');
    const surname = document.querySelector('input[name="surname"]');


    if (!name.value.trim()) {
        alert("Por favor, ingresa tu nombre completo.");
        name.focus(); 
        return;
    }

    if (!surname.value.trim()) {
        alert("Por favor, ingresa tu nombre completo.");
        surname.focus(); 
        return;
    }

    if (!email.value.trim()) {
        alert("Por favor, ingresa tu correo electrónico.");
        email.focus(); 
        return;
    }

    if (!phone.value.trim()) {
        alert("Por favor, ingresa tu número de teléfono.");
        phone.focus(); 
        return;
    }
    
        localStorage.clear();
        window.location.href = '../index.html';
}
    

function cancelTrip() {
    localStorage.clear(); 
    window.location.href = '../index.html'; 
}
