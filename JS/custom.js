$(document).ready(function () {
  setTimeout(function () {
    $('.pantalla-carga').fadeOut();
  }, 2000);
  menu("Ingreso");

  // Cargar el contenido HTML de un archivo externo
  loadModule();

});

function loadModule() {
  var urlActual = window.location.href;
  var parametros = new URLSearchParams(new URL(urlActual).search);
  var valor = parametros.get('pagina');
  var modulo = "./Modulos/" + valor + ".html";

  if (valor != "Principal") {
    var carrusel = document.getElementsByClassName("slider_section");
    $(carrusel).addClass("d-none");
  } else {
    var carrusel = document.getElementsByClassName("slider_section");
    $(carrusel).removeClass("d-none");
  }

  const moduleLoader = new ModuleLoader('contenido');
  moduleLoader.loadModule(modulo);
}

// to get current year
function getYear() {
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();
  document.querySelector("#displayYear").innerHTML = currentYear;
}

getYear();

function menu(modulo) {
  $('#usuarioMenu').load('./Modulos/' + modulo + '.html', function () {
  });
}

function ingreso() {
  $.ajax({
    url: 'archivo_destino.php',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      clave1: 'valor1',
      clave2: 'valor2'
    }),
    success: function (response) {
      console.log('Respuesta del servidor:', response);
    },
    error: function (xhr, status, error) {
      console.error('Error en la solicitud:', error);
    }
  });
}

function selectPaymentMethod(method) {

  if (method === 'paypal') {
    $('#paymentForm').load('./Modulos/Paypal.html', function () {
    });

  } else if (method === 'credit_card') {
    $('#paymentForm').load('./Modulos/Credito.html', function () {
    });
  }
}

function lamagiadelmodal(){
  var paymentForm = document.getElementById("paymentForm");
  paymentForm.innerHTML="";
}

class ModuleLoader {
  constructor(containerId) {
    this.container = $('#' + containerId);
  }

  loadModule(modulePath) {
    $.ajax({
      url: modulePath,
      dataType: 'html',
      success: (data) => {
        this.container.html(data);
      },
      error: (xhr, status, error) => {
        console.error(`Error loading module: ${modulePath}. Status: ${status}. Error: ${error}`);
      }
    });
  }
}