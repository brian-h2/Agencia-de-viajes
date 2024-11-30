export function obtenerValoresCalculadora(cityId) {
    renderDetails();
}

document.addEventListener("DOMContentLoaded", () => {
    const botonSaveSelection = document.getElementById("btnSaveSelection");

    if (botonSaveSelection) {
        botonSaveSelection.addEventListener("click", saveSelection);
        renderDetails();
    } else {
        console.error("El botón 'btn-save-selection' no se encontró.");
    }
});

function renderDetails() {
    const places = JSON.parse(localStorage.getItem("Places"));
    const cityId = localStorage.getItem("selectedCity");
    const city = places.find((place) => place.id == cityId);

    if (!city) {
        alert("Ciudad no encontrada");
        window.location.href = "index.html";
        return;
    }

    // Mostrar detalles de la ciudad
    const detailContainer = document.getElementById("detalle");
    detailContainer.innerHTML = `
        <h2>${city.city}</h2>
        <img src="${city.img}" alt="${city.city}">
        <p>${city.desc}</p>
        <p><strong>Precio base:</strong> $${city.price}</p>
    `;

    // Renderizar opciones de hoteles
    const hotelOptions = document.getElementById("hotel-options");
    hotelOptions.innerHTML = city.hotels
        .map(
            (hotel) => `
        <div>
            <input type="radio" name="hotel" value="${hotel.price}" class="hotel-radio">
            <label>${hotel.name} - $${hotel.price}</label>
        </div>
    `
        )
        .join("");

    // Añadir listener dinámico a cada opción de hotel
    document.querySelectorAll(".hotel-radio").forEach((input) => {
        input.addEventListener("change", () => {
            updateTotal(city.price, parseInt(input.value));
        });
    });
}

function updateTotal(basePrice, hotelPrice) {
    const guests = parseInt(document.getElementById("guests").value);
    const days = parseInt(document.getElementById("days").value);

    // Cálculo total: (precio base + precio del hotel) * número de huespedes * número de días
    const total = (basePrice + hotelPrice) * guests * days;

    // Mostrar el precio total
    document.getElementById("total-price").innerText = total.toFixed(2);
}

function saveSelection() {
    const selectedHotel = document.querySelector('input[name="hotel"]:checked');
    if (!selectedHotel) {
        alert("Por favor, selecciona un hotel.");
        return;
    }

    const places = JSON.parse(localStorage.getItem("Places"));
    const cityId = localStorage.getItem("selectedCity");
    const city = places.find((place) => place.id == cityId);

    const total = (parseInt(selectedHotel.value) + city.price) * parseInt(document.getElementById("guests").value) * parseInt(document.getElementById("days").value);
    localStorage.setItem("city", JSON.stringify(city))
    localStorage.setItem("totalPrice", total);
    window.location.href = "../pages/resumen.html"; // Redirigir a resumen
}

