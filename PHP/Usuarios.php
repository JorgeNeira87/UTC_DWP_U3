<?php
  session_start();
  require_once 'Conexion.php';
  if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $usuarios = $conexion->prepare("SELECT UsuarioId, Nombre, Foto, Correo, Telefono, Genero, Contrasena, rol FROM usuarios");
    $usuarios->execute();
    $datos = $usuarios->fetchAll(PDO::FETCH_ASSOC);

    if($usuarios->rowCount() > 0) {
      header('Content-Type: application/json');
      echo json_encode($datos);
    } else {
      echo "No hay usuarios existentes";
    }
  } else {
    echo "No es una funcion GET";
  }
?>