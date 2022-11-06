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
            $sql = "SELECT * FROM client";
            $result = $conn->query($sql);
            $client = array();

            while ($row = $result->fetch_assoc()) {
                array_push($client, $row);
            }

            $out['client'] = $client;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Create
    if ($crud == 'create') {
        try {
            $name = $_POST['name'];
            $surname = $_POST['surname'];
            $dob = $_POST['dob'];
            $contact = $_POST['contact'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $password = password_hash($password, PASSWORD_DEFAULT);  
            
            $sql = "SELECT client_email FROM client
                    WHERE client_email = '$email'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) { 
                $out['error'] = true;
                $out['message'] = "Failed to Create Account. The entered Email is already linked to another Account";
            }
            else {
                $sql = "INSERT INTO client (client_name, client_surname, client_dob, client_email, client_contact, client_password)
                VALUES ('$name', '$surname', '$dob', '$email', '$contact', '$password')";
                
                $query = $conn->query($sql);
            
                if ($query) {   
                    $out['message'] = "Account Successfully Created.  Please Attempt to Sign In";
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Failed to Create Account";
                }
            }           
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Failed to Create Account.";
        }    
        
        //Use this when using POSTMAN for testing
        /*
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body, true);

        $name = $data['name'];
        $surname = $data['surname'];
        $dob = $data['dob'];
        $contact = $data['contact'];
        $email = $data['email'];
        $password = $data['password'];
        $password = password_hash($password, PASSWORD_DEFAULT);
        */
    }

    //Get User Information
    if ($crud == 'userInfo') { 
        try {
            $clientID = $_POST['user'];

            $sql = "SELECT client_id, client_name, client_surname, client_dob, client_contact, client_email FROM client
                    WHERE client_id = '$clientID'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) { 
                $user = array();

                while ($row = $result->fetch_assoc()) {
                    array_push($user, $row);
                }

                $out['user'] = $user;
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

    //Update
    if ($crud == 'update') { 
        try {
            $id = $_POST['id'];
            $name = $_POST['name'];
            $surname = $_POST['surname'];
            $dob = $_POST['dob'];
            $contact = $_POST['contact'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $newPassword = $_POST['newPassword']; 

            $sql = "SELECT client_email FROM client
                    WHERE client_id != '$id' AND client_email = '$email'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) { 
                $out['error'] = true;
                $out['message'] = "Failed to Update User Information.  The entered Email is already Linked to another Account.";
            }
            else {
                $sql = "SELECT * FROM client
                WHERE client_id = '$id'";

                $result = $conn->query($sql);

                if ($result->num_rows > 0) {
                    $row = $result->fetch_array();
                    
                    if (password_verify($password, $row['client_password'])) {
                        //Password Matches
                        //Continue to Update User

                        if ($newPassword) {
                            $newPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                            $sql = "UPDATE client
                                    SET client_name = '$name', client_surname = '$surname', client_dob = '$dob', client_contact = '$contact', client_email = '$email', client_password = '$newPassword'
                                    WHERE client_id = '$id'";
                        }
                        else {
                            $sql = "UPDATE client
                                    SET client_name = '$name', client_surname = '$surname', client_dob = '$dob', client_contact = '$contact', client_email = '$email'
                                    WHERE client_id = '$id'";
                        }

                        $result = $conn->query($sql);

                        if ($result) { 
                            $out['message'] = "Client Information Updated Successfully";
                        }
                        else {
                            $out['error'] = true;
                            $out['message'] = "Failed to Update User Information";
                        }
                    }
                    else {
                        $out['error'] = true;
                        $out['message'] = "Failed to Update User Information";
                    }
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Failed to Update User Information";
                }
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