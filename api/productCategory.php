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
            $sql = "SELECT * FROM product_category";
            $result = $conn->query($sql);
            $category = array();

            while ($row = $result->fetch_assoc()) {
                array_push($category, $row);
            }

            $out['category'] = $category;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Selected Brand Products
    if ($crud == 'getBrandProducts') {
        try {

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