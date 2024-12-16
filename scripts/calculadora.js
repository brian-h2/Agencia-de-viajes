export function obtenerValoresCalculadora() {
    renderDetails();
}

document.addEventListener("DOMContentLoaded", () => {
    const botonSaveSelection = document.getElementById("btnSaveSelection");

    if (botonSaveSelection) {
        botonSaveSelection.addEventListener("click", saveSelection);
        renderDetails();
    } else {
        console.error("El botón 'btnSaveSelection' no se encontró.");
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

    const detailContainer = document.getElementById("detalle");
    detailContainer.innerHTML = `
        <h2>${city.city}</h2>
        <img src="${city.img}" alt="${city.city}">
        <p>${city.desc}</p>
        <p><strong>Precio base:</strong> $${city.price}</p>
    `;

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

    // Restaurar selección previa si existe
    const savedHotelPrice = localStorage.getItem("selectedHotelPrice");
    if (savedHotelPrice) {
        const savedHotelInput = Array.from(document.querySelectorAll(".hotel-radio"))
            .find((input) => input.value === savedHotelPrice);
        if (savedHotelInput) {
            savedHotelInput.checked = true;
        }
    }

    document.querySelectorAll(".hotel-radio").forEach((input) => {
        input.addEventListener("change", () => {
            localStorage.setItem("selectedHotelPrice", input.value);
            updateTotal(city.price, parseInt(input.value));
        });
    });

    // Restaurar valores previos de huéspedes y días
    const guestsInput = document.getElementById("guests");
    const daysInput = document.getElementById("days");
    guestsInput.value = localStorage.getItem("guests") || 1; // 
    daysInput.value = localStorage.getItem("days") || 1; // Valor por defecto 1

    guestsInput.addEventListener("input", () => {
        localStorage.setItem("guests", guestsInput.value);
        updateTotal(city.price, parseInt(document.querySelector('input[name="hotel"]:checked')?.value || 0));
    });

    daysInput.addEventListener("input", () => {
        localStorage.setItem("days", daysInput.value);
        updateTotal(city.price, parseInt(document.querySelector('input[name="hotel"]:checked')?.value || 0));
    });

    // Calcular el total inicial
    const selectedHotelPrice = parseInt(savedHotelPrice) || 0;
    updateTotal(city.price, selectedHotelPrice);
}

function updateTotal(basePrice, hotelPrice) {
    const guests = parseInt(document.getElementById("guests").value) || 1;
    const days = parseInt(document.getElementById("days").value) || 1;

    const total = (basePrice + hotelPrice) * guests * days;
    document.getElementById("total-price").innerText = total.toFixed(2);
}

function saveSelection() {
    const selectedHotel = document.querySelector('input[name="hotel"]:checked');
    if (!selectedHotel) {
        alert("Por favor, selecciona un hotel.");
        return;
    }

    const guests = document.getElementById("guests");
    const days = document.getElementById("days");
    
    if (!guests || guests.value.trim() === "" || parseInt(guests.value) <= 0) {
        alert("Por favor, ingresa un número válido de huéspedes.");
        guests.focus(); 
        return;
    }
    
    if (!days || days.value.trim() === "" || parseInt(days.value) <= 0) {
        alert("Por favor, ingresa un número válido de días.");
        days.focus(); 
        return;
    }

    const places = JSON.parse(localStorage.getItem("Places"));
    const cityId = localStorage.getItem("selectedCity");
    const city = places.find((place) => place.id == cityId);

    const total = (parseInt(selectedHotel.value) + city.price) *
        parseInt(document.getElementById("guests").value) *
        parseInt(document.getElementById("days").value);

    localStorage.setItem("city", JSON.stringify(city));
    localStorage.setItem("totalPrice", total);
    window.location.href = "../pages/resumen.html"; // Redirigir a resumen
}
