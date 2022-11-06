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
            $sql = "SELECT * FROM queries";
            $result = $conn->query($sql);
            $queries = array();

            while ($row = $result->fetch_assoc()) {
                array_push($queries, $row);
            }

            $out['queries'] = $queries;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Create Query
    if ($crud == 'create') {
        try {
            $email = $_POST['email'];
            $email = filter_var($email, FILTER_SANITIZE_EMAIL);
            $desc = $_POST['description'];
            $desc = htmlentities($desc);
            
            $sql = "INSERT INTO queries (query_email, query_desc)
                    VALUES ('$email', '$desc')";
                    
            $query = $conn->query($sql);
        
            if ($query) {
                $out['message'] = "Query Successfully Created";
            }
            else {
                $out['error'] = true;
                $out['message'] = "Failed to Create Query";
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