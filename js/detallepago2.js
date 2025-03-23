alert("Hola Mundo")
// VARIABLES GLOBALES
let claveCarrito = "productos"; // Clave usada en localStorage
let tablaCarrito = document.querySelector(".cart-table tbody");

// EVENTO AL RECARGAR LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  console.log(JSON.parse(localStorage.getItem("productos")));
});

// FUNCIÓN PARA CARGAR PRODUCTOS DEL LOCALSTORAGE
function cargarProductos() {
  let productosGuardados = JSON.parse(localStorage.getItem(claveCarrito)) || [];

  // Limpiar la tabla antes de agregar productos
  tablaCarrito.innerHTML = "";

  productosGuardados.forEach((producto) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
            <td><img src="${producto.imagen}" width="80"></td>
            <td>${producto.titulo}</td>
            <td>$${parseFloat(producto.precio).toLocaleString("es-CO")}</td>
            <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${
              producto.id
            }"></a></td>
        `;
    tablaCarrito.appendChild(fila);
  }); // <--- La llave y el paréntesis estaban mal colocados
}
