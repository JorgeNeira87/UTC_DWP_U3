var formulario = document.getElementById("dataForm");
var correoInput = document.getElementById("correo");
var telefonoInput = document.getElementById("telefono");
var btnActualizar = document.getElementById("btnActualizar");
var btnGuardar = document.getElementById("btnGuardar");

function cargarDatosUsuario() {
    var urlActual = window.location.href;
    var parametros = new URLSearchParams(new URL(urlActual).search);
    var valor = parametros.get('User');
    $.ajax({
        url: './PHP/Usuario.php',
        type: 'POST',
        data: {
          usuarioID: valor
        },
        success: function (response) {
            var foto = document.getElementById("foto");
            var nombre = document.getElementById("nombre");
            var correo = document.getElementById("correo");
            var telefono = document.getElementById("telefono");
            var genero = document.getElementById("genero");

            if (response.Foto === "") {
                foto.setAttribute('src', './Imagenes/Porfile.png');
            } else {
                foto.setAttribute('src', response.Foto);
            }
            nombre.value = response.Nombre;
            nombre.disabled = true;
            nombre.classList.add("bg-transparent", "border", "border-0");
            correo.value = response.Correo;
            correo.disabled = true; // Inicialmente deshabilitado
            correo.classList.add("bg-transparent", "border", "border-0");
            telefono.value = response.Telefono ? response.Telefono : 'Teléfono no disponible';
            telefono.disabled = true; // Inicialmente deshabilitado
            telefono.classList.add("bg-transparent", "border", "border-0");
            genero.textContent = response.Genero;
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

function cerrar() {
    $.ajax({
        url: './PHP/Cerrar.php',
        type: 'POST',
        success: function (response) {
            menu('Ingreso');
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error en cerrar la secion',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
            });
        }
    });
}

cargarDatosUsuario();

telefonoInput.addEventListener("input", function () {
    var valor = this.value.replace(/\D/g, '');

    var numeroFormateado = '';
    if (valor.length > 0) {
        numeroFormateado = valor.substring(0, 3);
        if (valor.length > 3) {
            numeroFormateado += '-' + valor.substring(3, 6);
            if (valor.length > 6) {
                numeroFormateado += '-' + valor.substring(6, 10);
            }
        }
    }

    this.value = numeroFormateado;
});

correoInput.addEventListener("input", function () {
    var valor = this.value.replace(/[^\w\.\-@]/g, '');

    var emailFormateado = valor.toLowerCase();

    this.value = emailFormateado;
});

btnActualizar.addEventListener('click', function () {
    Swal.fire({
        icon: 'info',
        title: 'Vas a actualizar tus datos',
        text: 'Ahora puedes editar tu correo y teléfono.',
        showConfirmButton: true
    }).then((result) => {
        if (result.isConfirmed) {
            correoInput.disabled = false;
            telefonoInput.disabled = false;
            btnGuardar.disabled = false;
            btnActualizar.disabled = true;
        }
    });
});


formulario.addEventListener('submit', function (e) {
    e.preventDefault();

    if (correoInput.value === "") {
        Swal.fire({
            position: "top-end",
            title: "Ingrese un correo electrónico, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else if (telefonoInput.value === "" || telefonoInput.value.length !== 12) {
        Swal.fire({
            position: "top-end",
            title: "Ingrese un número telefónico válido, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else {

        $.ajax({
            url: './PHP/Actualizar.php',
            type: 'POST',
            data: {
                correo: correoInput.value,
                telefono: telefonoInput.value
            },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Actualización exitosa',
                    showConfirmButton: false,
                    timer: 1500
                });


                cargarDatosUsuario();

                // Deshabilitar campos y botones nuevamente
                correoInput.disabled = true;
                telefonoInput.disabled = true;
                btnGuardar.disabled = true;
                btnActualizar.disabled = false;
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error en la actualización',
                    text: 'Por favor, intenta nuevamente.',
                    showConfirmButton: true
                });
            }
        });
    }
});
