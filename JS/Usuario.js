var formulario = document.getElementById("dataForm");
var correoInput = document.getElementById("correo");
var telefonoInput = document.getElementById("telefono");

$.ajax({
    url: './PHP/Usuario.php',
    type: 'GET',
    success: function (response) {
        console.log(response);
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
        nombre.textContent = response.Nombre;
        correo.textContent = response.Correo;
        telefono.textContent = response.Telefono;
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

// Formato de campo de Numero Telefonico
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

// Formato de campo de Correo Electronico
correoInput.addEventListener("input", function () {
    var valor = this.value.replace(/[^\w\.\-@]/g, '');

    var emailFormateado = valor.toLowerCase();

    this.value = emailFormateado;
});

function actualizar() {
    formulario.addEventListener('submit', function (e) {
        if (correoInput.value === "") {
            Swal.fire({
                position: "top-end",
                title: "Ingrese un correo electronico, por favor.",
                color: "#ffffff",
                background: "#ffbe32",
                showConfirmButton: false,
                timer: 1500
            });
        } else if (telefonoInput.value === "" || telefonoInput.length > 10) {
            Swal.fire({
                position: "top-end",
                title: "Ingrese un numero telefonico valido, por favor.",
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
                        title: 'Registro exitoso',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    menu('Ingreso')
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
    });
}

function cerrar() {
    $.ajax({
        url: './PHP/Cerrar.php',
        type: 'GET',
        success: function (response) {
            menu('Ingreso');
        },
        error: function (xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al intentar cerrar la secion',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
            });
        }
    });
}