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
            $sql = "SELECT * FROM product_brand";
            $result = $conn->query($sql);
            $brand = array();

            while ($row = $result->fetch_assoc()) {
                array_push($brand, $row);
            }

            $out['brand'] = $brand;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Selected Brand
    if ($crud == 'readByCategory') {
        try {
            $categoryID = $_POST['categoryID'];

            $sql = "SELECT DISTINCT product_brand_name FROM product_brand
                    INNER JOIN product ON product_brand.product_brand_id = product.product_brand_id
                    WHERE product_category_id = $categoryID
                    ORDER BY product_brand_name ASC";

            $result = $conn->query($sql);
            $brand = array();

            while ($row = $result->fetch_assoc()) {
                array_push($brand, $row);
            }

            $out['brand'] = $brand;
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