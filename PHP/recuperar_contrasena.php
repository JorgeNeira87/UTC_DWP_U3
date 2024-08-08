<?php

use function PHPSTORM_META\type;

require 'conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $datos = $_POST['dato'];
    $type = $_POST['type'];
    
    if ($type === "telefono") {
        $sql = "SELECT * FROM usuarios WHERE Telefono = :telefono";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':telefono', $datos);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $token = bin2hex(random_bytes(25));
            $token_expiracion = date("Y-m-d H:i:s", strtotime('+1 hour'));

            $sql = "UPDATE usuarios SET token_recuperacion = :token, token_expiracion = :token_expiracion WHERE Telefono = :telefono";
            $stmt = $conexion->prepare($sql); 
            $stmt->bindParam(':token', $token);
            $stmt->bindParam(':token_expiracion', $token_expiracion);
            $stmt->bindParam(':telefono', $datos);
            $stmt->execute();

            //Aqui va la estructura del WhatsApp
            // TOKEN QUE NOS DA FACEBOOK
            $tokenFacebook = 'EAARXv2ETPWgBOwnymObPAqjEYiKeg1rDd53og72rvC9AgZBPPfNlNN4jJITxc1EZBu7643eGrzFYKZBFIIABdctlfzQWgSaBZAjNbPKRoGFZBhSrgLhkANL5hzXO0VvSoZCANWmgAHY2oNjM3NAgOAKPZASxP5h8yVoTdzEiYFRPkF0ZBwXZBI7B7pPHXtARN7i6qywZDZD';

            $url_completa = 'http://localhost:8081/UTC_DWP_U3/?pagina=Restablecer_contrasena&token=' . $token;

            // URL A DONDE SE MANDARA EL MENSAJE
            $url = 'https://graph.facebook.com/v19.0/406970275822933/messages';

            // CONFIGURACION DEL MENSAJE
            $mensaje = json_encode([
                "messaging_product" => "whatsapp",
                "to" => $datos,
                "type" => "template",
                "template" => [
                    "name" => "cafe_cafe",
                    "language" => ["code" => "EN_US"],
                    "components" => [
                        [
                            "type" => "body",
                            "parameters" => [
                                ["type" => "text", "text" => "Cafe Cafe"],
                                ["type" => "text", "text" => "contraseña"],
                                ["type" => "text", "text" => "Gracias por visitarnos"]
                            ]
                        ],
                        [
                            "type" => "button",
                            "index" => "0",
                            "sub_type" => "url",
                            "index" => "0",
                            "parameters" => [
                                ["type" => "payload", "payload" => $url_completa]
                            ]
                        ]
                    ]
                ]
            ]);

            // DECLARAMOS LAS CABECERAS
            $header = array("Authorization: Bearer " . $tokenFacebook, "Content-Type: application/json",);

            // INICIAMOS EL CURL
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL, $url);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $mensaje);
            curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

            // OBTENEMOS LA RESPUESTA DEL ENVIO DE INFORMACION
            $response = json_decode(curl_exec($curl), true);

            // IMPRIMIMOS LA RESPUESTA 
            print_r($response);

            // OBTENEMOS EL CODIGO DE LA RESPUESTA
            $status_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            // CERRAMOS EL CURL
            curl_close($curl);

            // CERRAR LA CONEXIÓN A LA BASE DE DATOS
            $conexion = null;
            //Aqui va la estructura del WhatsApp

        } else {
            echo "El telefono no está registrado.";
            echo $datos;
        }
    } elseif ($type === "correo") {
        $sql = "SELECT * FROM usuarios WHERE Correo = :correo";
        $stmt = $conexion->prepare($sql);
        $stmt->bindParam(':correo', $datos);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $token = bin2hex(random_bytes(50));
            $token_expiracion = date("Y-m-d H:i:s", strtotime('+1 hour'));

            $sql = "UPDATE usuarios SET token_recuperacion = :token, token_expiracion = :token_expiracion WHERE Correo = :correo";
            $stmt = $conexion->prepare($sql);  // Se cambia de $conn a $conexion
            $stmt->bindParam(':token', $token);
            $stmt->bindParam(':token_expiracion', $token_expiracion);
            $stmt->bindParam(':correo', $datos);

            if ($stmt->execute()) {
                $to = $datos;
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
            <p>Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:8081/UTC_DWP_U2/?pagina=Restablecer_contrasena&token=' . $token . '">Restablecer contraseña</a></p>
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
    }
    $conexion = null;  // Cerrar la conexión
}
else{
    echo"no es post";
}
