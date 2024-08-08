$(document).ready(function () {
  setTimeout(function () {
    $('.pantalla-carga').fadeOut();
  }, 2000);
  var urlActual = window.location.href;
  var parametros = new URLSearchParams(new URL(urlActual).search);
  var valor = parametros.get('Administrador');
  if (valor != null) {
    Administrador();
  }

  // Cargar el contenido HTML de un archivo externo
  loadModule();
  secion();
  getYear();

});
function ParametrosUrl(UserID, Name) {
  var urlActual = new URL(window.location.href);

  var params = urlActual.searchParams;
  params.set('User', UserID);
  if (Name === "1") {
    params.set('Administrador', 'true');
  } else if (Name === "2") {
    params.set('pagina', 'Principal');
  } else {
    params.set('pagina', Name);
  }
  window.location.href = urlActual.toString();

}
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
  var urlActual = window.location.href;
  var parametros = new URLSearchParams(new URL(urlActual).search);
  var valor = parametros.get('User');
  $.ajax({
    url: './PHP/Usuario.php',
    type: 'POST',
    data: {
      usuarioID: valor
    },
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

function lamagiadelmodal() {
  $.ajax({
    url: "./Modulos/Carrito.html",
    success: function (result) {
      $("#modalContainer").html(result);
      $("#paymentModal").modal('show');
    },
    error: function () {
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

function Administrador() {
  var menu_navegacion = document.getElementById('navegacion_menu');
  menu_navegacion.innerHTML = '';
  var li_principal = document.createElement('li');
  li_principal.className = 'nav-item';
  var a_principal = document.createElement('a');
  a_principal.className = 'nav-link';
  a_principal.setAttribute('role', 'button');
  a_principal.onclick = function () { ParametrosUrl('Principal'); };
  a_principal.textContent = 'Principal';
  li_principal.appendChild(a_principal);
  menu_navegacion.appendChild(li_principal);


  var li_productos = document.createElement('li');
  li_productos.className = 'nav-item';
  var a_productos = document.createElement('a');
  a_productos.className = 'nav-link';
  a_productos.setAttribute('role', 'button');
  a_productos.onclick = function () { ParametrosUrl('Productos'); };
  a_productos.textContent = 'Productos';
  li_productos.appendChild(a_productos);
  menu_navegacion.appendChild(li_productos);


  var li_usuarios = document.createElement('li');
  li_usuarios.className = 'nav-item';
  var a_usuarios = document.createElement('a');
  a_usuarios.className = 'nav-link';
  a_usuarios.setAttribute('role', 'button');
  a_usuarios.onclick = function () {
    ParametrosUrl('Usuarios');
  };
  a_usuarios.textContent = 'Usuarios';
  li_usuarios.appendChild(a_usuarios);
  menu_navegacion.appendChild(li_usuarios);


  var li_pedidos = document.createElement('li');
  li_pedidos.className = 'nav-item';
  var a_pedidos = document.createElement('a');
  a_pedidos.className = 'nav-link';
  a_pedidos.setAttribute('role', 'button');
  a_pedidos.onclick = function () { ParametrosUrl('Pedidos'); };
  a_pedidos.textContent = 'Pedidos';
  li_pedidos.appendChild(a_pedidos);
  menu_navegacion.appendChild(li_pedidos);
}