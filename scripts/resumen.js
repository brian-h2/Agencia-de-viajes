// Renderizar resumen
// Mostrar el destino y el precio total cuando la página de resumen se cargue
// Mostrar el destino y el precio total cuando la página de resumen se cargue
document.addEventListener("DOMContentLoaded", () => {
    // Obtener la ciudad seleccionada desde el localStorage
    const selectedCity = JSON.parse(localStorage.getItem('city'));
    const cityPrice = localStorage.getItem('totalPrice');

    // Si no se encuentra la ciudad seleccionada, redirigir al inicio
    if (!selectedCity || !cityPrice) {
        alert("No se ha seleccionado un destino.");
        window.location.href = '../index.html'; // Redirigir a la página inicial
        return;
    }

    // Calcular el precio total (precio base + precio del hotel)

    // Mostrar los detalles del destino y el precio total en la página
    const resumenContainer = document.getElementById('summary-details');
    if (resumenContainer) {
        resumenContainer.innerHTML = `
            <h3>Destino Seleccionado: ${selectedCity.city}</h3>
            <img src="${selectedCity.img}" alt="${selectedCity.city}" style="width: 100%; max-width: 300px;">
            <p>${selectedCity.desc}</p>
            <p><strong>Precio base:</strong> $${cityPrice}</p>
        `;
    }

    // Mostrar el precio total
    const totalPriceContainer = document.getElementById('total-price');
    totalPriceContainer.innerHTML = `<strong>Total (con hotel):</strong> $${totalPrice}`;
});





// Función para cancelar el viaje
function cancelTrip() {
    localStorage.clear(); // Vaciar datos de localStorage
    window.location.href = '../index.html'; // Redirigir al inicio
}
