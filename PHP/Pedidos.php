<?php
require_once 'Conexion.php';
session_start();
// if ($_SERVER["REQUEST_METHOD"] == "GET") {
    if (isset($_SESSION['ID'])) {
        try {
            $pedidos = $conexion->prepare("SELECT PedidoId, Total, Estado FROM pedidos WHERE UsuarioId = :usuario");
            $pedidos -> bindParam(':usuario', $_SESSION['ID']);
            $pedidos -> execute();   
            $datos = $pedidos->fetchAll(PDO::FETCH_ASSOC);

            foreach ($datos as &$pedido) {
                $productos = $conexion->prepare("SELECT productos.Nombre Nombre, pedidodetalle.Cantidad Cantidad, pedidodetalle.Total Total FROM pedidodetalle INNER JOIN productos ON pedidodetalle.ProductoId = productos.ProductoId WHERE PedidoId = :pedidoId");
                $productos->bindParam(':pedidoId', $pedido['PedidoId']);
                $productos->execute();
                $pedido['productos'] = $productos->fetchAll(PDO::FETCH_ASSOC);
            }
        
            header('Content-Type: application/json');
            echo json_encode($datos);
        } catch (PDOException $e) {
            echo "Error de conexión: " . $e->getMessage();
        }
    } else {
        echo "usuario";
    }
// }
?>
