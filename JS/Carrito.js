let arrayCarrito = [];
let total = 0.00;

function agregarProducto(producto) {
    let produtoTotal = producto.cantidad * parseFloat(producto.precio);
    producto.precio = parseFloat(produtoTotal);
    arrayCarrito.push(producto);
    total += parseFloat(producto.precio);
    console.log(total)
    actualizarCarrito();
}

function actualizarCarrito() {
    $.ajax({
        url: './PHP/Carrito.php',
        type: 'POST',
        data: {
            carrito: arrayCarrito,
            total: total
        },
        success: function (response) {
            console.log(response);
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el registro',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
            });
        }
    });
}

function obtenerCarrito() {
    $.ajax({
        url: './PHP/Carrito.php',
        type: 'GET',
        success: function (response) {
            console.log(response)
            if (response.carrito === null) {
                let carritoHTML = `<p>Tu carrito esta vacio</p>`
                document.getElementById("listCarrito").innerHTML = carritoHTML;
                document.getElementById("total").innerText = "0.00";
            } else {
                arrayCarrito = response.carrito;
                total =response.total;
                let carritoHTML = `<table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Producto</th>
                            <th scope="col">Total</th>
                        </tr>
                    </thead>
                    <tbody>`;
                response.carrito.forEach(producto => {
                    carritoHTML += `<tr>
                            <th scope="row">${producto.cantidad}</th>
                            <td>${producto.nombre}</td>
                            <td>$${producto.precio}</td>
                        </tr>`;
                });
                carritoHTML += `</tbody>
                    </table>`
                document.getElementById("listCarrito").innerHTML = carritoHTML;
                document.getElementById("total").innerText = response.total;
            }
        },
        error: function (xhr, status, error) {
            // Error
        }
    });
}

function pedir() {
    console.log(arrayCarrito)
    if (arrayCarrito.length > 0 && total > 0) {
        $.ajax({
            url: './PHP/Pedido.php',
            type: 'POST',
            data: {
                carrito: arrayCarrito,
                total: total
            },
            success: function(response) {
                console.log(response);
                if (response === "usuario") {
                    Swal.fire({
                        icon: 'error',
                        title: 'Ups!!',
                        text: 'Por favor, inicie secion.',
                        showConfirmButton: true
                    });
                } else {
                    let carritoHTML = `<p>Tu carrito esta vacio</p>`
                    document.getElementById("listCarrito").innerHTML = carritoHTML;
                    document.getElementById("total").innerText = "0.00";
                    arrayCarrito = [];
                    total = 0.00;
                }
            },
            error: function(xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en el registro',
                    text: 'Por favor, intenta nuevamente.',
                    showConfirmButton: true
                });
            }
        });
    }
}

function pagar() {
    var btnMetodoPaypal = document.getElementById("paypal");
    var btnMetodoCredirCard = document.getElementById("credit_card");
    
    btnMetodoPaypal.classList.remove("visually-hidden")
    btnMetodoCredirCard.classList.remove("visually-hidden")
}

function selectPaymentMethod(method) {

    if (method === 'paypal') {
      $('#paymentForm').load('./Modulos/Paypal.html', function () {
      });
  
    } else if (method === 'credit_card') {
      $('#paymentForm').load('./Modulos/Credito.html', function () {
      });
    }
  }