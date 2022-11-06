<?php

    //CORS
    header('Access-Control-Allow-Origin: *');

    //Database Information
    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "online_store";

    $conn = new mysqli($servername, $username, $password, $dbname);

    //Connection Validation
    if ($conn -> connect_error) {
        die("Connection Failed: " . $conn -> connect_error);
    }

?>