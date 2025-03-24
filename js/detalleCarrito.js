//alert("Hola Mundo");
// VARIABLES GLOBALES
let claveCarrito = "productos"; // Clave usada en localStorage
let tablaCarrito = document.querySelector(".cart-table tbody");
let resumenSubTotal = document.querySelector(".res-sub-total");
let resumenDescuento = document.querySelector(".promo");
let resumenTotal= document.querySelector(".total");
let destino = document.querySelector(".destino");
let resumenDomicilio = document.querySelector(".valor-domi");


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
                    <span class="nombre-producto fw-semibold text-dark mt-1 justify-content-lg-end" 
                        style="font-size: 13px; max-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${producto.titulo}
                    </span>
                </div>
            </td>
            <td>${producto.precio.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}</td>
            <td>
                <div class="quantity quantity-wrap">
                    <div class="decrement" onclick="actualizarCantidad(${i}, -1)">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <input class="number" type="text" name="quantity" value="${
                      producto.cantidad || 1
                    }" maxlength="2" size="1" readonly>
                    <div class="increment" onclick="actualizarCantidad(${i}, 1)">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </td>
            <td>${(producto.precio * producto.cantidad).toLocaleString("es-CO", {style: "currency",currency: "COP",maximumFractionDigits: 0,})}</td>`;tablaCarrito.appendChild(fila);
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
    //EJECUTAR EL RESUMEN DE LA COMPRA
    resumenCompra();
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
  let productosGuardados = JSON.parse(localStorage.getItem(claveCarrito)) || [];
  let subtotal = 0; //ACUMILA EL SUBTOTAL DE LOS PRODUCTOS
  //RECORRER CADA PRODUCTO Y ACUMULAMOS EN EL SUBTOTAL
  productosGuardados.forEach((producto) => {
    //let precio = parseFloat(producto.precio) || 0;
    let precio = parseFloat(producto.precio) || 1; //CONVERTIR PRECIO A NÚMERO
    let cantidad = parseInt(producto.cantidad) || 0; // ASEGURAR QUE LA CANTIDAD ES UN NÚMERO
    //let domicilio = Number(this.value); // Conve
    //let domicilio = parseInt(producto.domicilio) || 0; // ASEGURAR QUE LA CANTIDAD ES UN NÚMERO
    subtotal += precio * cantidad;
  });
//CALCULAR EL VALOR DEL DOMICILIO
  let domicilio = 0;
  switch (destino.value) {
    case "Medellin":
    default:
      domicilio;
      break;
    case "Bello":
      domicilio = 10000;
      break;
    case "Copacabana":
    case "Caldas":
    case "La Estrella":
      domicilio = 20000;
      break;
    case "Envigado":
    case "Itagui":
    case "Sabaneta":
      domicilio = 15000;
      break;
  }
//CALCULAR DESCUENTO,DEL 10% SI LA COMPRA ES MAYOR A 100.000
let descuento = subtotal > 100000 ? subtotal * 0.1 : 0;

// CALCULA El TOTAL APAGAR DE LA COMPRA 
let totalApagar = subtotal - descuento + domicilio;
console.log("valor domicilio"+ domicilio);

console.log(subtotal.toFixed(2));
//MOSTRAR LOS CALCULOS
//resumenSubTotal.textContent = subtotal.toFixed(2);
resumenSubTotal.innerHTML = `<span class="simbolo-pesos">$</span>${subtotal.toLocaleString("es-CO")}`;
console.log(subtotal.toFixed(2));
//resumenDescuento.textContent = descuento.toFixed(2);
resumenDescuento.innerHTML = `<span class="simbolo-pesos">$</span>${descuento.toLocaleString("es-CO")}`;
//resumenTotal.textContent = totalApagar.toFixed(2);
//console.log(totalApagar.toFixed(2));
resumenTotal.innerHTML = `<span class="simbolo-pesos">$</span>${totalApagar.toLocaleString("es-CO")}`;
//RESUMEN DEL DOMICILIO
//resumenDomicilio.innerHTML =domicilio > 0? `<span class="simbolo-pesos">$</span>${domicilio.toLocaleString("es-CO")}`: "Gratis";
resumenDomicilio.textContent =
  domicilio > 0 ? `$${Number(domicilio).toLocaleString("es-CO")}` : "Gratis";
// GUARDAR CAMBIOS EN EL LOCALSTORAGE
localStorage.setItem(claveCarrito, JSON.stringify(productosGuardados));
    
console.log(cargarProductos);
}
//actualizar el evento de la compra

//DISPARADOR DEL EVENTO DESTINO
destino.addEventListener("change",()=>{
  //let domicilio = Number(this.value); // Convertir a número
  resumenCompra();
});