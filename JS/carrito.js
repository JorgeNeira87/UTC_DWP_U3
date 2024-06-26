let carrito = [];
let total = 0;

function agregarProducto(producto) {
  carrito.push(producto);
  total+=parseFloat(producto.precio);
  actualizarCarrito();
}

function actualizarCarrito() {
  let carritoHTML = "";
  

  carrito.forEach(producto => {
    carritoHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
  });
console.log(total);
  document.getElementById("carrito").innerHTML = carritoHTML;
  document.getElementById("total").innerText = total;
}

// Añadimos el evento para el botón de pago
function mostrarOpcionesDePago() {
  let opcionesPagoHTML = `
    <h3>Total a pagar: $<span id="total">${total}</span></h3>
    <label for="metodoPago">Seleccione un método de pago:</label>
    <select id="metodoPago">
      <option value="tarjeta">Tarjeta de crédito/débito</option>
      <option value="paypal">PayPal</option>
      <option value="transferencia">Transferencia bancaria</option>
    </select>
    <button onclick="realizarPago()">Pagar</button>
  `;
  document.getElementById("opcionesPago").innerHTML = opcionesPagoHTML;
}

function realizarPago() {
  let metodoPago = document.getElementById("metodoPago").value;
  alert(`Ha seleccionado ${metodoPago} como método de pago. Gracias por su compra!`);
  // Aquí puedes añadir lógica adicional para procesar el pago
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
  mostrarOpcionesDePago();
});

