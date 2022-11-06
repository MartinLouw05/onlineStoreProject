<?php

    include 'connect.php';

    //Variables
    $out = array('error' => false); 
    $crud = 'read';

    if (isset($_GET['crud'])) {
        $crud = $_GET['crud'];
    }

    //Read
    if ($crud == 'read') {
        try {
            if (isset($_SESSION['user'])) {
                $out['message'] = "Client Currently Logged In";
            }
            else {
                $out['error'] = true;
                $out['message'] = "No Client is Currently Logged In";
            }
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Active User
    if ($crud == 'activeUser') { 
        try {
            $clientID = $_POST['user'];

            $sql = "SELECT client_name, client_surname FROM client
                    WHERE client_id = '$clientID'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) { 
                $row = $result->fetch_array();

                $out['user'] = $row['client_name'];
            }
            else {
                $out['error'] = true;
                $out['message'] = "Failed to Retrieve User Information";
            }
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Sign In
    if ($crud == 'signIn') {
        try {
            $email = $_POST['email'];
            $password = $_POST['password']; 

            $sql = "SELECT * FROM client
                    WHERE client_email = '$email'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $row = $result->fetch_array();
                
                if (password_verify($password, $row['client_password'])) {
                    $out['user'] = $row['client_id'];
                    $out['message'] = "Login Successful";
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Login Failed. Email or Password is Incorrect. Please Try Again";
                }
            }
            else {
                $out['error'] = true;
                $out['message'] = "Login Failed. Email or Password is Incorrect. Please Try Again";
            }
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Forgot Password
    if ($crud == 'forgotPassword') {
        try {
            $email = $_POST['email'];
            $dob = $_POST['dob']; 

            $sql = "SELECT * FROM client
                    WHERE client_email = '$email' AND client_dob = '$dob'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $out['message'] = "An Email has been sent to $email. Please Check Your Inbox";                
            }
            else {
                $out['error'] = true;
                $out['message'] = "User Authentication Failed. Please Try Again";
            }
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Request Response
    $conn->close();

    header("Content-type: application/json");
    echo json_encode($out);
    die();

?>