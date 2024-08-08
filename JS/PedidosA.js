pedidos();
function pedidos() {
    $.ajax({
        url: './PHP/PedidosA.php',
        type: 'GET',
        success: function (response) {
            var tBody = document.getElementById('result');
            for (let i = 0; i < response.length; i++) {
                var th = document.createElement('tr');
                var trID = document.createElement('th');
                trID.textContent = response[i].PedidoId;
                th.appendChild(trID);
                var trUsuario = document.createElement('th');
                trUsuario.textContent = response[i].Nombre;
                th.appendChild(trUsuario);
                var trTotal = document.createElement('th');
                trTotal.textContent = response[i].Total;
                th.appendChild(trTotal);
                var trContrasena = document.createElement('th');
                trContrasena.textContent = response[i].Estado;
                th.appendChild(trContrasena);

                tBody.appendChild(th);
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