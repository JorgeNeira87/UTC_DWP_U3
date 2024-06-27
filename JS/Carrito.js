let carrito = [];
let total = 0;

function agregarProducto(producto) {
    carrito.push(producto);
    total += parseFloat(producto.precio);
    actualizarCarrito();
}

function actualizarCarrito() {
    let carritoHTML = "";


    carrito.forEach(producto => {
        carritoHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
    });
    console.log(total);
    $.ajax({
        url: './PHP/Carrito.php',
        type: 'POST',
        data: {
            carrito: carrito,
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
    let carritoHTML = "";
    $.ajax({
        url: './PHP/Carrito.php',
        type: 'GET',
        success: function (response) {
            console.log(response);
            response.carrito.forEach(producto => {
                carritoHTML += `<p>${producto.nombre} - $${producto.precio}</p>`;
            });
            document.getElementById("listCarrito").innerHTML = carritoHTML;
            document.getElementById("total").innerText = response.total;

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