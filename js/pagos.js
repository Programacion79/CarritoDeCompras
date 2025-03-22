// Selección de elementos
let subtotalElement = document.querySelector(".res-sub-total");
let destinoElement = document.querySelector(".destino");
let valorDomiElement = document.querySelector(".valor-domi");
let promoElement = document.querySelector(".promo");
let totalElement = document.querySelector(".total");

// FUNCIÓN PARA CALCULAR EL TOTAL
function calcularTotal() {
  let subtotal =
    parseFloat(subtotalElement.textContent.replace(/[$,]/g, "")) || 0;
  let promo = parseFloat(promoElement.textContent.replace(/[$,]/g, "")) || 0;
  let valorDomi =
    parseFloat(valorDomiElement.textContent.replace(/[$,]/g, "")) || 0;

  let total = subtotal + valorDomi - promo;
  totalElement.textContent = `$${total.toLocaleString("es-CO")}`;
}

// EVENTO PARA CAMBIAR EL VALOR DEL DOMICILIO SEGÚN EL DESTINO
destinoElement.addEventListener("change", () => {
  let preciosDomicilio = {
    Medellin: 0,
    Bello: 10000,
    Itagui: 15000,
    Envigado: 15000,
    Sabaneta: 15000,
    "La Estrella": 20000,
    Caldas: 20000,
    Copacabana: 20000,
  };

  let destinoSeleccionado = destinoElement.value;
  let nuevoValorDomi = preciosDomicilio[destinoSeleccionado];

  valorDomiElement.textContent = `$${nuevoValorDomi.toLocaleString("es-CO")}`;

  calcularTotal(); // Actualiza el total al cambiar el destino
});

// ACTUALIZAR EL TOTAL AL CARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", calcularTotal);


document.querySelector("#btn-pagar").addEventListener("click", () => {
  let total = parseFloat(totalElement.textContent.replace(/[$,]/g, "")) || 0;

  if (total === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  alert(`Procesando pago de $${total.toLocaleString("es-CO")}...`);

  setTimeout(() => {
    alert("Pago exitoso. Gracias por tu compra.");
    localStorage.removeItem("carrito"); // Vaciar carrito
    totalElement.textContent = "$0"; // Reiniciar total
  }, 2000);
});
