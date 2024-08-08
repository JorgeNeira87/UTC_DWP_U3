usuarios();
function usuarios() {
    $.ajax({
        url: './PHP/Usuarios.php',
        type: 'GET',
        success: function (response) {
            var tBody = document.getElementById('result');
            for (let i = 0; i < response.length; i++) {
                var th = document.createElement('tr');
                var trNombre = document.createElement('th');
                trNombre.textContent = response[i].Nombre;
                th.appendChild(trNombre);
                var trCorreo = document.createElement('th');
                trCorreo.textContent = response[i].Correo;
                th.appendChild(trCorreo);
                var trTelefono = document.createElement('th');
                trTelefono.textContent = response[i].Telefono;
                th.appendChild(trTelefono);
                var trContrasena = document.createElement('th');
                trContrasena.textContent = response[i].Contrasena;
                th.appendChild(trContrasena);
                var trRol = document.createElement('th');
                trRol.textContent = response[i].rol;
                th.appendChild(trRol);

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