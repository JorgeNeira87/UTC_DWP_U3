usuarios();
function usuarios() {
    $.ajax({
        url: './PHP/Productos.php',
        type: 'GET',
        success: function (response) {
            var tBody = document.getElementById('result');
            for (let i = 0; i < response.length; i++) {
                var th = document.createElement('tr');
                var trNombre = document.createElement('th');
                trNombre.textContent = response[i].Nombre;
                th.appendChild(trNombre);
                var trDescripcion = document.createElement('th');
                trDescripcion.textContent = response[i].Descripcion;
                th.appendChild(trDescripcion);
                var trPrecio = document.createElement('th');
                trPrecio.textContent = response[i].Precio;
                th.appendChild(trPrecio);
                var trTipo = document.createElement('th');
                trTipo.textContent = response[i].Tipo;
                th.appendChild(trTipo);

                tBody.appendChild(th);
            }
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en el ingreso',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
            });
        }
    });
}