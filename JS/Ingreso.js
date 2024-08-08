var login = document.getElementById("loginForm");

login.addEventListener('submit', function (e) {
  e.preventDefault();

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
        if (parseInt(response.Rol) === 1) { //admin
          ParametrosUrl(response.ID, response.Rol);
          Administrador();
        }
        else if (parseInt(response.Rol) === 2) { //user
          console.log('Entro al rol de usuario')
          ParametrosUrl(response.ID, response.Rol);
          menu('Usuario');
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
});