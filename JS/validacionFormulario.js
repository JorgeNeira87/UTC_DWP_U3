var registro = document.getElementById("registerForm");
var usuarioInput = document.getElementById("usuario");
var correoInput = document.getElementById("correo");
var telefonoInput = document.getElementById("telefono");
var hombreInput = document.getElementById("generoHombre");
var mujerInput = document.getElementById("generoMujer");
var contrasenaInput = document.getElementById("contrasena");

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

// Formato de campo de Contraseña
contrasenaInput.addEventListener("input", function () {
    var valor = this.value;

    if (valor.length < 6) {
        return;
    }

    if (valor.length > 20) {
        valor = valor.substring(0, 20);
    }

    this.value = valor;
});

registro.addEventListener('submit', function(e) {
    e.preventDefault();

    if (usuarioInput.value === "") {
        Swal.fire({
            position: "top-end",
            title: "Ingrese un usuario valido, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else if (correoInput.value === "") {
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
    } else if (!hombreInput.checked && !mujerInput.checked) {
        Swal.fire({
            position: "top-end",
            title: "Selecciones un genero, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else if (contrasenaInput.value === "") {
        Swal.fire({
            position: "top-end",
            title: "Ingrese una contraseña, por favor.",
            color: "#ffffff",
            background: "#ffbe32",
            showConfirmButton: false,
            timer: 1500
        });
    } else {
        menu('Ingreso')
    }

});