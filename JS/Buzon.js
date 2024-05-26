var buzon = document.getElementById("buzonForm");

buzon.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("entro")

    var sugerenciaInput = document.getElementById("sugerencia");

    if (sugerencia.value === "") {
      Swal.fire({
        position: "top-end",
        title: "Ingrese una sugerencia, por favor.",
        color: "#ffffff",
        background: "#ffbe32",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
        $.ajax({
            url: './PHP/Sugerencias.php',
            type: 'POST',
            data: {
                sugerencia: sugerenciaInput.value,
            },
            success: function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Gracias por su apoyo',
                    showConfirmButton: false,
                    timer: 2500
                });
              clearForms(buzon);
            },
            error: function (xhr, status, error) {
              Swal.fire({
                icon: 'error',
                title: 'Error en el envio',
                text: 'Por favor, intenta nuevamente.',
                showConfirmButton: true
              });
            }
          });
    }
  });
