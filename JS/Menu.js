$('.pantalla-carga').fadeIn();
var productos = new Array();
Promise.all([obtenerProductos()])
    .then(valores => {
        productos = valores[0];
        cargarProductos(productos);
        $('.pantalla-carga').fadeOut();

        $('.filters_menu li').click(function () {
            $('.filters_menu li').removeClass('active');
            $(this).addClass('active');

            var data = $(this).attr('data-filter');
            $grid.isotope({
                filter: data
            })
        });

        var $grid = $(".grid").isotope({
            itemSelector: ".all",
            percentPosition: false,
            masonry: {
                columnWidth: ".all"
            }
        })
    })
    .catch(error => {
        console.error("Ocurrió un error:", error);
    });
    
async function obtenerProductos() {
    try {
        
        const response = await $.ajax({
            url: './PHP/Menu.php',
            type: 'GET',
            contentType: 'application/json'
        });

        return response;
        
    } catch (error) {

        console.error('Error en la solicitud:', error);
        throw error;
    }
}
function cargarProductos(arrayProductos) {
    
    try {
        var menu = document.getElementById("menuDiv");
        var div = document.createElement("div");
        div.classList.add("row", "p-b-1");
        
    for (let i = 0; i < arrayProductos.length; i++) {
            var divFiltro = document.createElement("div");
            divFiltro.classList.add(arrayProductos[i].Tipo, "col-4", "mb-1", "all");

            var divCard = document.createElement("div");
            divCard.classList.add("p-1", "card", "bg-dark", "rounded");
            divCard.style.minHeight = "80vh";

            var img = document.createElement("img");
            img.classList.add("rounded-bottom", "bg-white", "mh-100", "img-fluid");
            img.src = "Imagenes/" + arrayProductos[i].Nombre + ".png";
            img.style.height = "40vh";
            divCard.appendChild(img);

            var divCardBody = document.createElement("div");
            divCardBody.classList.add("card-body", "position-relative");

            var hNombre = document.createElement("h5");
            hNombre.classList.add("card-title", "text-white");
            hNombre.textContent = arrayProductos[i].Nombre;
            divCardBody.appendChild(hNombre);

            var pDescripcion = document.createElement("p");
            pDescripcion.classList.add("card-text", "text-white");
            pDescripcion.textContent = arrayProductos[i].Descripcion;
            divCardBody.appendChild(pDescripcion);

            var hPrecio = document.createElement("h6");
            hPrecio.classList.add("card-subtitle", "text-white");
            hPrecio.textContent = "$" + arrayProductos[i].Precio;
            divCardBody.appendChild(hPrecio);

            var btnCart = document.createElement("buttom");
            btnCart.classList.add("btn", "btn-warning", "position-absolute", "bottom-0", "end-0");
            btnCart.id = arrayProductos[i].ProductoId;
            btnCart.setAttribute("data-bs-toggle", "modal");
            btnCart.setAttribute("data-bs-target", "#moproducto");
            btnCart.onclick = function () {
                idToModal(this);

            };

            var iCart = document.createElement("i");
            iCart.classList.add("bi", "bi-cart-fill");
            btnCart.appendChild(iCart);

            divCardBody.appendChild(btnCart);

            divCard.appendChild(divCardBody);

            divFiltro.appendChild(divCard);
            div.appendChild(divFiltro);
        }
        menu.appendChild(div);

    } catch (error) {
        console.error('Error en la solicitud:', error);
        throw error;
    }
}

function idToModal(Producto) {
    var ProductoId = Producto.id;
    console.log(ProductoId);
    console.log(productos);
    for(let i = 0; i < productos.length; i++){
        if(productos[i].ProductoId == ProductoId){
            console.log(productos[i]);
            var ModalContent = document.getElementById("productoMBody");
            ModalContent.innerHTML = "";

            var ModalHeader = document.createElement("div");
            ModalHeader.classList.add("modal-header", "border-bottom-0");

            var hNombre = document.createElement("h5");
            hNombre.className = "modal-title";
            hNombre.textContent = productos[i].Nombre;
            ModalHeader.appendChild(hNombre);

            var btnClose = document.createElement("button");
            btnClose.className = "btn-close";
            btnClose.setAttribute("data-bs-dismiss", "modal");
            btnClose.setAttribute("aria-label", "Close");
            ModalHeader.appendChild(btnClose);

            ModalContent.appendChild(ModalHeader);

            var ModalBody = document.createElement("div");
            ModalBody.className = "modal-body";

            var pDescripcion = document.createElement("p");
            pDescripcion.textContent = productos[i].Descripcion;
            ModalBody.appendChild(pDescripcion);

            ModalContent.appendChild(ModalBody);

            var ModalFooter = document.createElement("div");
            ModalFooter.classList.add("modal-footer", "border-top-0");

            var divInput = document.createElement("div");
            divInput.classList.add("input-group", "w-50");

            var btnDecremento = document.createElement("button");
            btnDecremento.classList.add("btn", "btn-secondary");
            btnDecremento.textContent = "-";
            btnDecremento.onclick = function() {
                decrementar();
            };
            divInput.appendChild(btnDecremento);

            var InputCantidad = document.createElement("input");
            InputCantidad.className = "form-control";
            InputCantidad.type = "number";
            InputCantidad.disabled = true;
            InputCantidad.value = 1;
            InputCantidad.id = "cantidad";
            divInput.appendChild(InputCantidad);

            var btnIncremento = document.createElement("button");
            btnIncremento.classList.add("btn", "btn-secondary");
            btnIncremento.textContent = "+";
            btnIncremento.onclick = function() {
                incrementar();
            };
            divInput.appendChild(btnIncremento);

            ModalFooter.appendChild(divInput);

            var btnCart = document.createElement("buttom");
            btnCart.classList.add("btn", "btn-success");

            var iCart = document.createElement("i");
            iCart.classList.add("bi", "bi-cart-fill");
            btnCart.appendChild(iCart);

            ModalFooter.appendChild(btnCart);

            ModalContent.appendChild(ModalFooter);

            break;
        }
    }
}

function incrementar() {
    var valor = document.getElementById("cantidad").value;
    valor++;
    document.getElementById("cantidad").value = valor;
}

function decrementar() {
    var valor = document.getElementById("cantidad").value;
    if (valor > 1) {
        valor--;
        document.getElementById("cantidad").value = valor;
    }
}