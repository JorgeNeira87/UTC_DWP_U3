$('.pantalla-carga').fadeIn();
var productos = new Array();
Promise.all([obtenerPedidos()])
    .then(valores => {

        $('.pantalla-carga').fadeOut();
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
    });

function obtenerPedidos() {
    $.ajax({
        url: './PHP/Pedidos.php',
        type: 'GET',
        success: function (response) {
            var div = document.getElementById("divPedidos");
            for (let i = 0; i < response.length; i++) {

                var divCard = document.createElement('div');
                divCard.classList.add("card", "mx-2", "my-3");

                var divCardFront = document.createElement('div');
                divCardFront.classList.add("front");

                var pedidoNumero = document.createElement('h5');
                pedidoNumero.textContent = "#" + response[i].PedidoId;
                divCardFront.appendChild(pedidoNumero);

                var pedidoEstado = document.createElement('p');
                pedidoEstado.textContent = "Estado: " + response[i].Estado;
                divCardFront.appendChild(pedidoEstado);

                var pedidoTotal = document.createElement('p');
                pedidoTotal.textContent = "Total: $" + response[i].Total;
                divCardFront.appendChild(pedidoTotal);

                divCard.appendChild(divCardFront);

                var divCardBack = document.createElement('div');
                divCardBack.classList.add("back");

                var tableDetalles = document.createElement('table');
                tableDetalles.classList.add("table", "table-borderless");

                var tableHead = document.createElement('thead');
                var tableHeadTr = document.createElement('tr');
                var tableHeadThNombre = document.createElement('th');
                tableHeadThNombre.textContent = "Producto";
                var tableHeadThCantidad = document.createElement('th');
                tableHeadThCantidad.textContent = "#";
                var tableHeadThTotal = document.createElement('th');
                tableHeadThTotal.textContent = "Total";

                tableHeadTr.appendChild(tableHeadThNombre);
                tableHeadTr.appendChild(tableHeadThCantidad);
                tableHeadTr.appendChild(tableHeadThTotal);
                tableHead.appendChild(tableHeadTr);
                tableDetalles.appendChild(tableHead);

                var tableBody = document.createElement('tbody');

                for (let j = 0; j < response[i].productos.length; j++) {
                    var tableBodyTr = document.createElement('tr');
                    var tableBodyThNombre = document.createElement('th');
                    tableBodyThNombre.textContent = response[i].productos[j].Nombre;
                    var tableBodyThCantidad = document.createElement('th');
                    tableBodyThCantidad.textContent = response[i].productos[j].Cantidad;
                    var tableBodyThTotal = document.createElement('th');
                    tableBodyThTotal.textContent = response[i].productos[j].Total;

                    tableBodyTr.appendChild(tableBodyThNombre);
                    tableBodyTr.appendChild(tableBodyThCantidad);
                    tableBodyTr.appendChild(tableBodyThTotal);

                    tableBody.appendChild(tableBodyTr);

                }
                tableDetalles.appendChild(tableBody);

                divCardBack.appendChild(tableDetalles);

                divCard.appendChild(divCardBack);
                div.appendChild(divCard);
            }

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