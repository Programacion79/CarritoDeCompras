alert("Hola Mundo");
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

  //LIMPIAR LA TABLA ANTES DE AGREGAR LOS PRODUCTOS
  tablaCarrito.innerHTML = "";

  //COMPAR SI HAY PRODUCTOS EN EL LOCALSTORAGE
  if(productosGuardados.length > 0){
      productosGuardados.forEach((producto,i) => {
        //CARGAR TABLA
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>
                <div class="d-flex flex-column align-items-start text-center">
                    <button onclick="borrarProducto(${i})" 
                        class="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center rounded-circle shadow-sm mb-1" 
                        style="width: 28px; height: 28px;">
                        <i class="fas fa-trash-alt" style="font-size: 12px;"></i>
                    </button>
                    <img src="${
                      producto.imagen
                    }" class="rounded shadow-sm" width="60" height="60" style="object-fit: cover;">
                    <span class="nombre-producto fw-semibold text-dark mt-1" 
                        style="font-size: 13px; max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${producto.titulo}
                    </span>
                </div>
            </td>
            <td>$${producto.precio}</td>
            <td>
                <div class="quantity quantity-wrap">
                    <div class="decrement" onclick="actualizarCantidad(${i}, -1)">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <input class="number" type="text" name="quantity" value="${producto.cantidad || 1}" maxlength="2" size="1" readonly>
                    <div class="increment" onclick="actualizarCantidad(${i}, 1)">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </td>
            <td>$${(producto.precio * producto.cantidad).toFixed(3)}</td>
            `;
            tablaCarrito.appendChild(fila);
        }); // <--- La llave y el paréntesis estaban mal colocados
    }else{
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td colspan="4">
                <p class="text-center fs-3">No hay productos en el carrito</p>
            </td>
        `;
        tablaCarrito.appendChild(fila);
    }  
}
// FUNCIÓN PARA ACTUALIZAR CANTIDADES DEL PRODUCTO
function actualizarCantidad(pos, cambio) {
  console.log("Actualizando cantidad para posición:", pos, "Cambio:", cambio);

  // OBTENER LOS PRODUCTOS GUARDADOS
  let productosGuardados = JSON.parse(localStorage.getItem(claveCarrito)) || [];

  console.log("Productos cargados desde localStorage:", productosGuardados);

  // VERIFICA SI HAY PRODUCTOS EN EL CARITO
  if (!productosGuardados || productosGuardados.length === 0) {
    console.error("El carrito está vacío. No se puede actualizar la cantidad.");
    return;
  }

  // VERIFICA SI LKA POSICION ESTA VACIA
  if (!productosGuardados[pos]) {
    console.error("No se encontró el producto en la posición:", pos);
    return;
  }

  // PREVIENE QUE LA CANTIDAD SEA MENOR A 1
  if (productosGuardados[pos].cantidad + cambio < 1) {
    console.warn("La cantidad no puede ser menor a 1.");
    return; //
  }

  // ACTUALIZAR LA CANTIDAD
  productosGuardados[pos].cantidad += cambio;

  // GUARDAR CAMBIOS EN EL LOCALSTORAGE
  localStorage.setItem(claveCarrito, JSON.stringify(productosGuardados));

  console.log("Carrito actualizado:", productosGuardados);

  // RECARGAR LA TABLA PARA MOTRAR LOS CAMBIOS O REFLEJARLOS
  cargarProductos();
}

//FUNCION PARA BORRAR PRODUCTOS DEL DETALLE CARRITO
function borrarProducto(pos){
      let productosGuardados =JSON.parse(localStorage.getItem(claveCarrito)) || [];

      //ELIMINAR PRODUCTO
      productosGuardados.splice(pos,1);
      localStorage.setItem(claveCarrito,JSON.stringify(productosGuardados));
      //RECARGAR PRODUCTO
      cargarProductos();
}

//RESUMEN DE LA COMPRA
function resumenCompra(){
    let productosGuardados =JSON.parse(localStorage.getItem(claveCarrito)) || [];

}

