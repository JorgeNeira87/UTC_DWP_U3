var recuperacion = document.getElementById("recuperacionForm");
var correoInput = document.getElementById("correo");
var telefonoInput = document.getElementById("numero");
var typeInput = document.getElementById("type");
let tipo = "";

function seleccionarOpcion(opcion) {
    var telefonoCheckbox = document.getElementById("telefonoCheckbox");
    var correoCheckbox = document.getElementById("correoCheckbox");
    var whatsappDiv = document.getElementById("whatsappDiv");
    var correoDiv = document.getElementById("correoDiv");
    tipo = opcion;

    if (opcion === "telefono") {
      correoCheckbox.checked = false;
      whatsappDiv.style.display = "block";
      correoDiv.style.display = "none";
      document.getElementById("numero").required = true;
      document.getElementById("correo").required = false;
    } else if (opcion === "correo") {
      telefonoCheckbox.checked = false;
      whatsappDiv.style.display = "none";
      correoDiv.style.display = "block";
      document.getElementById("numero").required = false;
      document.getElementById("correo").required = true;
    }
  }

// Formato de campo de Correo Electronico
correoInput.addEventListener("input", function () {
    var valor = this.value.replace(/[^\w\.\-@]/g, '');

    var emailFormateado = valor.toLowerCase();

    this.value = emailFormateado;
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

recuperacion.addEventListener('submit', function(e) {
    e.preventDefault();

    if(tipo === "telefono"){
        if (telefonoInput.value === "") {
            Swal.fire({
                position: "top-end",
                title: "Ingrese un numero telefonico, por favor.",
                color: "#ffffff",
                background: "#ffbe32",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let arrayDatos = {
                dato: "52-" +telefonoInput.value,
                type: tipo
            }
            restaurar(arrayDatos);
        }
    } else if(tipo === "correo"){
        if (correoInput.value === "") {
            Swal.fire({
                position: "top-end",
                title: "Ingrese un correo electronico, por favor.",
                color: "#ffffff",
                background: "#ffbe32",
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            let arrayDatos = {
                dato: correoInput.value,
                type: tipo
            }
            restaurar(arrayDatos);
        }
    } 

});

function restaurar(array) {
    $.ajax({
        url: './PHP/recuperar_contrasena.php',
        type: 'POST',
        data: array,
        success: function(response) {
            Swal.fire({
                icon: 'success',
                title: 'Correo enviado',
                showConfirmButton: false,
                timer: 1500
            });
            menu('Ingreso')
        },
        error: function(xhr, status, error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocurrio un error durante el proceso de recperación',
                text: 'Por favor, intenta nuevamente el proceso.',
                showConfirmButton: true
            });
        }
    });
}