<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];

    $sql = "SELECT * FROM usuarios WHERE Correo = :correo";
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(':correo', $correo);  // Aquí se cambia de ':Correo' a ':correo'
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $token = bin2hex(random_bytes(50));
        $token_expiracion = date("Y-m-d H:i:s", strtotime('+1 hour'));

        $sql = "UPDATE usuarios SET token_recuperacion = :token, token_expiracion = :token_expiracion WHERE Correo = :correo";
        $stmt = $conexion->prepare($sql);  // Se cambia de $conn a $conexion
        $stmt->bindParam(':token', $token);
        $stmt->bindParam(':token_expiracion', $token_expiracion);
        $stmt->bindParam(':correo', $correo);

        if ($stmt->execute()) {
            $to = $correo;
            $subject = "Recuperación de contraseña";
            $message = '
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body>
        <h5>El CORREO</h5>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:8081/WEBCAFE/?pagina=Restablecer_contrasena&token=' . $token . '">Restablecer contraseña</a></p>
        </body>
        </html>
    ';
            $headers = "From: cafecoffe.support@coffe.com\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-type: text/html; charset=UTF-8\r\n";

            if (mail($to, $subject, $message, $headers)) {
                echo "Correo de recuperación enviado.";
            } else {
                echo "Error al enviar el correo.";
            }
        } else {
            echo "Error: " . implode(", ", $stmt->errorInfo());
        }
    } else {
        echo "El correo no está registrado.";
    }

    $conexion = null;  // Cerrar la conexión
}
