$(document).ready(function () {
    // Datos de clientes
    var clients = [
        {
            comentario: "Tienen un buen café y son lo mejor de la región de México, también sus cafeterías son muy limpias y ordenadas, así sí dan ganas de tomar un buen café.",
            nombre: "Efraín Ruiz",
            imagen: "Imagenes/client1.jpg"
        },
        {
            comentario: "Son una de las mejores cafeterías, sus precios son accesibles, para toda la gente que busca un buen café para tomar, sus instalaciones parecen de primer mundo igual que su café.",
            nombre: "Benjamín Díaz",
            imagen: "Imagenes/client2.jpg"
        },
        {
            comentario: "El ambiente es muy agradable y el café es excepcional. Definitivamente recomiendo esta cafetería a mis amigos.",
            nombre: "Laura Sánchez",
            imagen: "Imagenes/client3.jpg"
        },
        {
            comentario: "Me encanta venir aquí a trabajar, el Wi-Fi es rápido y el café es delicioso. ¡Cinco estrellas!",
            nombre: "Carlos Pérez",
            imagen: "Imagenes/client4.jpg"
        },
        {
            comentario: "La atención al cliente es de primera y los postres son simplemente maravillosos. Muy recomendado.",
            nombre: "María López",
            imagen: "Imagenes/client5.jpg"
        }
    ];

    // Generar elementos del carrusel
    clients.forEach(function (client) {
        var item = `
            <div class="item">
                <div class="box">
                    <div class="img-box">
                        <img src="${client.imagen}" alt="" class="box-img">
                    </div>
                    <div class="detail-box">
                        <p>${client.comentario}</p>
                        <h6>${client.nombre}</h6>
                    </div>
                </div>
            </div>
        `;
        $('#client-carousel').append(item);
    });

    // Inicializar el carrusel
    $(".client_owl-carousel").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        items: 1,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
});