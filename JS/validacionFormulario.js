// Formato de campo de Numero Telefonico
var telefonoInput = document.getElementById("telefono");

telefonoInput.addEventListener("input", function () {
    var valor = this.value.replace(/\D/g, ''); // Eliminar caracteres que no sean dígitos

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
var correoInput = document.getElementById("correo");

correoInput.addEventListener("input", function () {
    var valor = this.value.replace(/[^\w\.\-@]/g, '');

    var emailFormateado = valor.toLowerCase();

    this.value = emailFormateado;
});

// Formato de campo de Contraseña
var contrasenaInput = document.getElementById("contrasena");
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