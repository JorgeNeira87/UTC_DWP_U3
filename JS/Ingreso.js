var login = document.getElementById("loginForm");

login.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("entro")

    var usuario = document.getElementById("usuario");
    var contrasena = document.getElementById("contrasena");

    if (usuario.value === "") {
      Swal.fire({
        position: "top-end",
        title: "Ingrese su usuario.",
        color: "#ffffff",
        background: "#ffbe32",
        showConfirmButton: false,
        timer: 1500
      });
    } else if (contrasena.value === "") {
      Swal.fire({
        position: "top-end",
        title: "Ingrese su contraseña.",
        color: "#ffffff",
        background: "#ffbe32",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      $.ajax({
        url: './PHP/Ingreso.php',
        type: 'POST',
        data: {
          usuario: usuario.value,
          contrasena: contrasena.value
        },
        success: function (response) {
          
          clearForms(login);
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
  });