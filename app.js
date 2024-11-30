// Almacenar la ciudad seleccionada
function seleccionarCiudad(ciudad, precioBase) {
    sessionStorage.setItem("ciudad", ciudad);
    sessionStorage.setItem("precioBase", precioBase);
    window.location.href = "pages/destino.html";
}

// Calcular el total
function calcularTotal() {
    const precioBase = parseFloat(sessionStorage.getItem("precioBase"));
    const precioHotel = parseFloat(document.querySelector('input[name="hotel"]:checked').value);
    const personas = parseInt(document.getElementById("personas").value);
    const noches = parseInt(document.getElementById("noches").value);
    const total = (precioBase + precioHotel) * personas * noches;
    document.getElementById("total").textContent = `Total: $${total}`;
    sessionStorage.setItem("total", total);
}

// Continuar al resumen
function continuar() {
    window.location.href = "pages/resumen.html";
}

// Mostrar resumen
document.addEventListener("DOMContentLoaded", () => {
    const ciudad = sessionStorage.getItem("ciudad");
    const total = sessionStorage.getItem("total");
    if (document.getElementById("resumen-datos")) {
        document.getElementById("resumen-datos").textContent = `Ciudad: ${ciudad}, Total: $${total}`;
    }
});

// Cancelar viaje
document.getElementById("cancelar")?.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "../index.html";
});
