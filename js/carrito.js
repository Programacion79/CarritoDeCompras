class Carrito {
  // Añadir producto al carrito
  comprarProducto(e) {
    e.preventDefault();
    // Delegado para agregar al carrito
    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement.parentElement;
      // Enviamos el producto seleccionado para tomar sus datos
      this.leerDatosProducto(producto);
    }
  }

  // Leer datos del producto
  leerDatosProducto(producto) {
    const infoProducto = {
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h4").textContent,
      precio: producto.querySelector(".precio span").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };

    let productosLS = this.obtenerProductosLocalStorage();

    const existe = productosLS.some(
      (productoLS) => productoLS.id === infoProducto.id
    );

    if (existe) {
      Swal.fire({
        icon: "info",
        title: "Oops...",
        text: "El producto ya está agregado",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      this.insertarCarrito(infoProducto);
    }
  }

  // Muestra producto seleccionado en carrito
  insertarCarrito(producto) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>
            <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }

  // Eliminar el producto del carrito en el DOM
  eliminarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      const productoID = e.target.getAttribute("data-id");
      this.eliminarProductoLocalStorage(productoID);
      this.calcularTotal();
    }
  }

  // Elimina todos los productos
  vaciarCarrito(e) {
    e.preventDefault();
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    this.vaciarLocalStorage();
    return false;
  }

  // Almacenar en el LS
  guardarProductosLocalStorage(producto) {
    let productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  // Comprobar que hay elementos en el LS
  obtenerProductosLocalStorage() {
    return localStorage.getItem("productos")
      ? JSON.parse(localStorage.getItem("productos"))
      : [];
  }

  // Mostrar los productos guardados en el LS
  leerLocalStorage() {
    let productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((producto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>
            `;
      listaProductos.appendChild(row);
    });
  }

  // Mostrar los productos guardados en el LS en compra.html
  leerLocalStorageCompra() {
    let productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach((producto) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <input type="number" class="form-control cantidad" min="1" value=${
                      producto.cantidad
                    }>
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${
                      producto.id
                    }"></a>
                </td>
            `;
      listaCompra.appendChild(row);
    });
  }

  // Eliminar producto por ID del LS
  eliminarProductoLocalStorage(productoID) {
    let productosLS = this.obtenerProductosLocalStorage();
    productosLS = productosLS.filter(
      (productoLS) => productoLS.id !== productoID
    );
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  // Eliminar todos los datos del LS
  vaciarLocalStorage() {
    localStorage.removeItem("productos");
  }

  // Procesar pedido
  procesarPedido(e) {
    e.preventDefault();
    if (this.obtenerProductosLocalStorage().length === 0) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El carrito está vacío, agrega algún producto",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      location.href = "compra.html";
    }
  }

  // Calcular montos
  calcularTotal() {
    let productosLS = this.obtenerProductosLocalStorage();
    let total = 0,
      igv = 0,
      subtotal = 0;
    productosLS.forEach((producto) => {
      total += Number(producto.precio * producto.cantidad);
    });

    igv = parseFloat(total * 0.18).toFixed(2);
    subtotal = parseFloat(total - igv).toFixed(2);

    document.getElementById("subtotal").innerHTML = "S/. " + subtotal;
    document.getElementById("igv").innerHTML = "S/. " + igv;
    document.getElementById("total").value = "S/. " + total.toFixed(2);
  }

  obtenerEvento(e) {
    e.preventDefault();
    if (e.target.classList.contains("cantidad")) {
      const producto = e.target.parentElement.parentElement;
      const id = producto.querySelector("a").getAttribute("data-id");
      const cantidad = e.target.value;
      let productosLS = this.obtenerProductosLocalStorage();
      productosLS = productosLS.map((productoLS) => {
        if (productoLS.id === id) {
          productoLS.cantidad = cantidad;
          const actualizarMontos = producto.querySelector("#subtotales");
          actualizarMontos.innerHTML = Number(cantidad * productoLS.precio);
        }
        return productoLS;
      });
      localStorage.setItem("productos", JSON.stringify(productosLS));
    }
  }
}
