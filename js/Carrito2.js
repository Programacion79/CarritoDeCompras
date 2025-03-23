// VARIABLES GLOBALES
let d = document;
let btnProducts = d.querySelectorAll(".btn-product");
let contadorCarrito = d.querySelector(".contar-pro");
let listadoCarrito = d.querySelector(".list-cart tbody");
let con = 0;
const claveCarrito = "productos";

// EVENTO PARA AGREGAR PRODUCTOS
btnProducts.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let button = e.target.closest(".btn-product");
    if (!button) return;

    agregarProducto(button);
  });
});

// GUARDAR LOS DATOS EN LOCAL STORAGE
function guardarCarritoEnLocalstorage() {
  let productosCarrito = [];
  let filas = listadoCarrito.querySelectorAll("tr");

  filas.forEach((fila) => {
    let id = fila.getAttribute("data-id");
    let cantidad = parseInt(fila.querySelector(".cantidad").textContent);
    let imagen = fila.querySelector("img").src;
    let titulo = fila.children[2].textContent;
    //let precio = fila.children[3].textContent.split("$")[1];
    // Intentar extraer el precio correctamente
    let precioTexto = fila.children[3].textContent.replace(/\D/g, ""); // Elimina todo excepto números
    let precio = parseFloat(precioTexto) || 0; // Convierte a número y evita NaN

    productosCarrito.push({ id, cantidad, imagen, titulo, precio });
  });

  localStorage.setItem(claveCarrito, JSON.stringify(productosCarrito));
}

// AGREGAR PRODUCTO AL CARRITO
function agregarProducto(button) {
  let producto = {
    cantidad: 1,
    imagen: button.dataset.imagen,
    titulo: button.dataset.titulo,
    precio: parseFloat(button.dataset.precio.replace(".", "")) || 0, // Elimina puntos y convierte en número
    id: button.dataset.id,
  };

  let filas = listadoCarrito.querySelectorAll("tr");
  let encontrado = false;

  filas.forEach((fila) => {
    let idFila = fila.getAttribute("data-id");

    if (idFila === producto.id) {
      let cantidadTd = fila.querySelector(".cantidad");
      let nuevaCantidad = parseInt(cantidadTd.textContent) + 1;
      cantidadTd.textContent = nuevaCantidad;
      encontrado = true;
    }
  });

  if (!encontrado) {
    let fila = document.createElement("tr");
    fila.setAttribute("data-id", producto.id);
    fila.innerHTML = `
      <td class="cantidad">${producto.cantidad}</td>
      <td><img src="${producto.imagen}" width="80"></td>
        <td>${producto.titulo}</td>
        <td>$${producto.precio}</td>
        <td>
          <a href="#" class="borrar-producto fas fa-times-circle"></a>
        </td>
    `;
    listadoCarrito.appendChild(fila);

    fila
      .querySelector(".borrar-producto")
      .addEventListener("click", (event) => {
        event.preventDefault();
        eliminarProducto(fila);
      });
  }

  con++;
  contadorCarrito.textContent = con;

  guardarCarritoEnLocalstorage();
}

// FUNCIÓN PARA ELIMINAR PRODUCTO DEL CARRITO
function eliminarProducto(fila) {
  let cantidadTd = fila.querySelector(".cantidad");
  let cantidadActual = parseInt(cantidadTd.textContent);

  if (cantidadActual > 1) {
    cantidadTd.textContent = cantidadActual - 1;
  } else {
    fila.remove();
  }

    if (con > 0) {
      con--; // Evita que el contador sea negativo
    }
  contadorCarrito.textContent = con;
    actualizarTotalCarrito(); // Si tienes una función para actualizar el total

  guardarCarritoEnLocalstorage();
}

// CARGAR EL CARRITO DESDE LOCAL STORAGE AL INICIAR
function cargarCarritoDesdeLocalStorage() {
  let productosGuardados = JSON.parse(localStorage.getItem(claveCarrito)) || [];

  productosGuardados.forEach((producto) => {
    let fila = d.createElement("tr");
    fila.setAttribute("data-id", producto.id);
    fila.innerHTML = `
    <td class="cantidad">${producto.cantidad}</td>
    <td><img src="${producto.imagen}" width="80"></td>
    <td>${producto.titulo}</td>
    <td>${producto.precio}</td>
    <td>
      <a href="#" class="borrar-producto fas fa-times-circle"></a>
    </td>
    `;
    listadoCarrito.appendChild(fila);

    fila
      .querySelector(".borrar-producto")
      .addEventListener("click", (event) => {
        event.preventDefault();
        eliminarProducto(fila);
      });
  });

  con = productosGuardados.reduce((total, pro) => total + pro.cantidad, 0);
  contadorCarrito.textContent = con;
}

// CARGAMOS EL CARRITO AL INICIAR LA PÁGINA
d.addEventListener("DOMContentLoaded", cargarCarritoDesdeLocalStorage);

//OCULTAR EL CARRITO
contadorCarrito.parentElement.addEventListener("click", ()=>{
  listadoCarrito.parentElement.classList.toggle("ocultar");

});



