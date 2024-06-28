<?php
require_once 'conexion.php';
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_SESSION['ID'])) {
        $carrito = $_POST['carrito'];
        $total = $_POST['total'];
    
        try {
            $pedido = $conexion->prepare("INSERT INTO pedidos(UsuarioId, Total, Estado) VALUES (:usuario, :total, 'Por pagar')");
            $pedido->bindParam(':usuario', $_SESSION['ID']);
            $pedido->bindParam(':total', $total);
            $pedido->execute();
    
            $pedidoID = $conexion->lastInsertId();
    
            foreach ($carrito as $value) {
                $detalles = $conexion->prepare("INSERT INTO pedidodetalle(PedidoId, ProductoId, Cantidad, Total) VALUES (:usuario, :productoID, :cantidad, :total)");
                $detalles->bindParam(':usuario', $pedidoID);
                $detalles->bindParam(':productoID', $value['id']);
                $detalles->bindParam(':cantidad', $value['cantidad']);
                $detalles->bindParam(':total', $value['precio']);
                $detalles->execute();
            }

            $_SESSION['carrito'] = null;
            $_SESSION['total'] = null;
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
    } else {
        echo "usuario";
    }
} else {
    http_response_code(401);
    echo json_encode(array("error" => "No es solicitud POST"));
}
?>