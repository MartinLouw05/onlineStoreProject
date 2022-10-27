<?php
    session_start();

    //Navigate to Cart Screen
    if (array_key_exists('btnCart', $_POST)) {
        header("Location: ../cart/cart.php");
    }

    //Navigate to Selected Product's Information Screen
    if (array_key_exists('gridProductItem', $_POST)) {
        //$_SESSION['productID'] = $_POST['gridProductItem'];
        header("Location: productInfo.php");
    }

    //Navigate to Account Information Screen
    if (array_key_exists('btnAccInfo', $_POST)) {
        header("Location: ../client/client.php");
    }

?>