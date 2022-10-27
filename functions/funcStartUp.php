<?php
    session_start();

    //Navigate to Sign In Screen
    /*if (array_key_exists('btnSignIn', $_POST)) {
        header("Location: startUp/signIn.php");
    }*/

    if (array_key_exists('btnRegistrationSignIn', $_POST)) {
        header("Location: signIn.php");
    }

    //Navigate to Create an Account Screen
    if (array_key_exists('btnSignInCreate', $_POST)) {
        header("Location: registerClient.php");
    }

    //Navigate to Forgot Password Screen
    if (array_key_exists('btnForgotPassword', $_POST)) {
        header("Location: forgotPassword.php");
    }

    //Navigate to Cart Screen
    if (array_key_exists('btnCart', $_POST)) {
        header("Location: ./cart/cart.php");
    }

    //Navigate to Account Information Screen
    if (array_key_exists('btnAccInfo', $_POST)) {
        header("Location: ./client/client.php");
    }

    //Navigate to Product Screen
    if (array_key_exists('btnBats', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnHelmets', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnGloves', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnArm', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnThigh', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnPads', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnApparel', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnFootwear', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnBalls', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnBags', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnAccessories', $_POST)) {
        header("Location: ./product/product.php");
    }

    if (array_key_exists('btnOther', $_POST)) {
        header("Location: ./product/product.php");
    }

    //Sign In


    //Create Account


    //Navigate to About Screen
    if (array_key_exists('btnAbout', $_POST)) {
        header("Location: ./company/about.php");
    }

    //Navigate to Contact Us Screen
    if (array_key_exists('btnContactUs', $_POST)) {
        header("Location: ./company/contactUs.php");
    }

?>