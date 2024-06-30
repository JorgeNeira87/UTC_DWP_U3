var formulario = document.getElementById("dataForm");
var nombreInput = document.getElementById("nombre");
var correoInput = document.getElementById("correo");
var telefonoInput = document.getElementById("telefono");

$.ajax({
    url: './PHP/Usuario.php',
    type: 'GET',
    success: function (response) {
        console.log(response);
        var foto = document.getElementById("foto");
        var genero = document.getElementById("genero");

        if (response.Foto === "") {
            foto.setAttribute('src', './Imagenes/Porfile.png');
        } else {
            foto.setAttribute('src', response.Foto);
        }
        nombre.textContent = response.Nombre;
        nombreInput.classList.add("bg-transparent", "border", "border-0");
        correoInput.value = response.Correo;
        correoInput.classList.add("bg-transparent", "border", "border-0");
        telefonoInput.value = response.Telefono ? response.Telefono : 'Teléfono no disponible';
        telefonoInput.classList.add("bg-transparent", "border", "border-0");

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

document.getElementById("actualizarBtn").addEventListener("click", function() {
    nombreInput.disabled = false;
    correoInput.disabled = false;
    telefonoInput.disabled = false;
    nombreInput.classList.remove("bg-transparent", "border-0");
    correoInput.classList.remove("bg-transparent", "border-0");
    telefonoInput.classList.remove("bg-transparent", "border-0");
});

formulario.addEventListener('submit', function (e) {
    e.preventDefault(); 

    if (correoInput.value === "") {
        Swal.fire({
            position: "top-end",
            title: "Ingrese un correo electronico, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else if (telefonoInput.value === "" || telefonoInput.value.length > 12) {
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
                nombre: nombreInput.value,
                correo: correoInput.value,
                telefono: telefonoInput.value
            },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Datos actualizados exitosamente',
                    showConfirmButton: false,
                    timer: 1500
                });

                nombreInput.disabled = true;
                correoInput.disabled = true;
                telefonoInput.disabled = true;
                nombreInput.classList.add("bg-transparent", "border-0");
                correoInput.classList.add("bg-transparent", "border-0");
                telefonoInput.classList.add("bg-transparent", "border-0");

                location.reload();
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
                title: 'Error al intentar cerrar la sesion',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
            });
        }
    });
}