$(document).ready(function () {
  setTimeout(function () {
    $('.pantalla-carga').fadeOut();
  }, 2000);

  // Cargar el contenido HTML de un archivo externo
  loadModule();
  secion();
  getYear();

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

function secion() {
  $.ajax({
    url: './PHP/Usuario.php',
    type: 'GET',
    success: function (response) {
      menu("Usuario");
    },
    error: function (xhr, status, error) {
      menu("Ingreso");
    }
  });
}

function menu(modulo) {
  $('#usuarioMenu').load('./Modulos/' + modulo + '.html', function () {
  });
}

function lamagiadelmodal(){
  $.ajax({
    url: "./Modulos/Carrito.html",
    success: function(result){
      $("#modalContainer").html(result);
      $("#paymentModal").modal('show');
    },
    error: function(){
      alert("Error al cargar el contenido del modal.");
    }
  });
  obtenerCarrito();
}

function clearForms(form) {
  var inputs = form.querySelectorAll("input[type='text'], input[type='password'], input[type='email'], input[type='number']");
  inputs.forEach(input => input.value = '');

  var checkboxesAndRadios = form.querySelectorAll("input[type='checkbox'], input[type='radio']");
  checkboxesAndRadios.forEach(input => input.checked = false);

  var textareas = form.querySelectorAll("textarea");
  textareas.forEach(textarea => textarea.value = '');

  var selects = form.querySelectorAll("select");
  selects.forEach(select => select.selectedIndex = 0);
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