<?php
require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $correo = $_POST['correo'];
    
     $sql = "SELECT * FROM Usuarios WHERE correo = '$correo'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $token = bin2hex(random_bytes(50)); 
        $token_expiracion = date("Y-m-d H:i:s", strtotime('+1 hour')); 
        
        $sql = "UPDATE Usuarios SET token_recuperacion = '$token', token_expiracion = '$token_expiracion' WHERE correo = '$correo'";
        
        if ($conn->query($sql) === TRUE) {

            $to = $correo;
            $subject = "Recuperación de contraseña";
            $message = "Haz clic en el siguiente enlace para restablecer tu contraseña: http://localhost:8081/email/restablecer_contrase%C3%B1a.php?token=$token";
            $headers = "From: no-reply@tudominio.com\r\n";
            
            if (mail($to, $subject, $message, $headers)) {
                echo "Correo de recuperación enviado.";
            } else {
                echo "Error al enviar el correo.";
            }
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "El correo no está registrado.";
    }
    
    $conn->close();
}
?>
