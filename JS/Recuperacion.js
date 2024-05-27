var recuperacion = document.getElementById("recuperacionForm");
var correoInput = document.getElementById("correo");

// Formato de campo de Correo Electronico
correoInput.addEventListener("input", function () {
    var valor = this.value.replace(/[^\w\.\-@]/g, '');

    var emailFormateado = valor.toLowerCase();

    this.value = emailFormateado;
});


recuperacion.addEventListener('submit', function(e) {
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
    } else {
        $.ajax({
            url: './PHP/recuperar_contrasena.php',
            type: 'POST',
            data: {
                correo: correoInput.value
            },
            success: function(response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Correo enviado',
                    showConfirmButton: false,
                    timer: 1500
                });
                console.log(response)
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

});