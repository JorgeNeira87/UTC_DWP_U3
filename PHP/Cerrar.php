<?php
try {
    session_start();
    session_destroy();
    echo true;
} catch (\Throwable $th) {
    http_response_code(401);
    echo json_encode(array("error" => $th));
}
?>