<?php
  require_once 'Conexion.php';

  if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $productos = $conexion->prepare("SELECT ProductoId, Nombre, Descripcion, Precio, Tipo FROM productos");
    $productos->execute();
    $datos = $productos->fetchAll(PDO::FETCH_ASSOC);

    if($productos->rowCount() > 0) {
      header('Content-Type: application/json');
      echo json_encode($datos);
    } else {
      echo "No hay productos existentes";
    }
  } else {
    echo "No es una funcion GET";
  }
?>