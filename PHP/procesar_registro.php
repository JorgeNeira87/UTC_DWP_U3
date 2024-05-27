<?php
require 'conexion.php';

// Verifica si las claves existen en el array $_POST antes de usarlas
if (isset($_POST['correo'], $_POST['telefono'], $_POST['contraseña'], $_POST['nombre'])) {
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $contraseña = $_POST['contraseña'];
    $nombre = $_POST['nombre'];

    $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

    // Inserta los datos en la base de datos usando una consulta preparada
    $sql = "INSERT INTO usuarios (Correo, Telefono, Contrasena, Nombre) VALUES (:correo, :telefono, :hashed_password, :nombre)";
    $stmt = $conn->prepare($sql);

    // Vincula los parámetros
    $stmt->bindParam(':correo', $correo);
    $stmt->bindParam(':telefono', $telefono);
    $stmt->bindParam(':hashed_password', $hashed_password);
    $stmt->bindParam(':nombre', $nombre);

    // Ejecuta la consulta
    if ($stmt->execute()) {
        echo "Registro exitoso";
    } else {
        echo "Error: " . implode(", ", $stmt->errorInfo());
    }
} else {
    echo "Faltan datos en el formulario.";
}

// Cierra la conexión (opcional, ya que PDO cierra la conexión automáticamente cuando el script termina)
$conn = null;
?>
