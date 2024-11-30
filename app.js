import { obtenerValoresCalculadora } from "./scripts/calculadora.js";

async function loadPlaces() {
    try {
        const response = await fetch('../data/place.json');
        const places = await response.json();

        localStorage.setItem("Places", JSON.stringify(places)); // Guarda como JSON

        const container = document.getElementById('cards-container');
        if (!container) {
            console.error('No se encontró el contenedor con ID "cards-container".');
            return;
        }

        places.forEach((place) => {
            console.log(place);
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${place.img}" alt="${place.city}">
                <h2>${place.city}</h2>
                <p>${place.desc}</p>
                <p><strong>Precio:</strong> $${place.price}</p>
                <div class="hotels">
                    <h3>Hoteles disponibles:</h3>
                    <ul>
                        ${place.hotels
                            .map(
                                (hotel) =>
                                    `<li>${hotel.name} - $${hotel.price}</li>`
                            )
                            .join('')}
                    </ul>
                </div>
                <button class="select-city-btn" data-id="${place.id}">Seleccionar Destino</button>
            `;

            container.appendChild(card);
        });

        document.querySelectorAll('.select-city-btn').forEach((button) => {
            button.addEventListener('click', (event) => {
                const cityId = event.target.dataset.id;
                localStorage.setItem("selectedCity", cityId);
                window.location.href = 'pages/destino.html';
                obtenerValoresCalculadora(cityId);
            });
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
}

loadPlaces();





