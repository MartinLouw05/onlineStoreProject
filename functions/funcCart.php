<?php
    session_start();

    //Return to Home Screen
    if (array_key_exists('btnCompanyTitle', $_POST)) {
        header("Location: ../index.php");
    }

    //Navigate to Account Information Screen
    if (array_key_exists('btnAccInfo', $_POST)) {
        header("Location: ../client/client.php");
    }
?>