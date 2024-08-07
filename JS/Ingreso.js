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
        if (parseInt(response) === 1) { //admin
          // Obtener la URL actual
          var urlActual = new URL(window.location.href);

          // Crear un objeto URLSearchParams a partir de la URL
          var params = urlActual.searchParams;

          // Agregar o actualizar el parámetro deseado
          params.set('Administrador', 'true'); // Cambia 'miVariable' y 'miValor' por la variable y el valor que desees

          // Actualizar la URL del navegador sin recargar la página
          history.pushState(null, '', urlActual.toString());
          Administrador();
          
        }
        else if (parseInt(response) === 2) { //user
          menu('Usuario')
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