<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $_SESSION['carrito'] = $_POST['carrito'];
    $_SESSION['total'] = $_POST['total'];
    echo true;
} else {
    $datos = array(
        "carrito" => $_SESSION['carrito'],
        "total" => $_SESSION['total']
    );
    header('Content-Type: application/json');
    echo json_encode($datos); 
}


?>