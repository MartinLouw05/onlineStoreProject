<?php
    session_start();

    //Return to Home Screen
    if (array_key_exists('btnCompanyTitle', $_POST)) {
        header("Location: ../index.php");
    }

    //Navigate to Shopping Cart Screen
    if (array_key_exists('btnCart', $_POST)) {
        header("Location: ../cart/cart.php");
    }



?>