<?php

    session_start();

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
    else {
        echo "<script> console.log('Connection Successful'); </script>";
    }

?>