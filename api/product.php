<?php

    include 'connect.php';

    //Variables
    $out = array('error' => false); 
    $crud = 'read';

    if (isset($_GET['crud'])) {
        $crud = $_GET['crud'];
    }

    //Read
    //Get All Products
    if ($crud == 'read') {
        try {
            $sql = "SELECT * FROM product";
            $result = $conn->query($sql);
            $product = array();

            while ($row = $result->fetch_assoc()) {
                array_push($product, $row);
            }

            $out['product'] = $product;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Product Category Selection
    if ($crud == 'searchProduct') {
        try {
            $search = $_POST['search'];
            $search = str_replace(array( '\'', '"', ',' , ';', '<', '>' ), '', $search);
            $search = trim($search);
            $categoryID = $_POST['categoryID'];
            $brandName = $_POST['brandName'];

            if ($search !== "null") {
                $sql = "SELECT * FROM product
                        INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                        INNER JOIN product_thumbnail ON product.product_id = product_thumbnail.product_id
                        WHERE product_name LIKE '%$search%' OR product_brand_name LIKE '%$search%'";
            }
            elseif ($categoryID !== "null" && $brandName !== "null") {
                //Both Criteria Provided
                $sql = "SELECT * FROM product
                        INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                        INNER JOIN product_thumbnail ON product.product_id = product_thumbnail.product_id
                        WHERE product_category_id = '$categoryID' AND product_brand_name = '$brandName'";
            }
            elseif ($categoryID == "null") {
                //No Category Provided
                $sql = "SELECT * FROM product
                        INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                        INNER JOIN product_thumbnail ON product.product_id = product_thumbnail.product_id
                        WHERE product_brand_name = '$brandName'";
            }
            elseif ($brandName == "null") {
                //No Brand Name Provided
                $sql = "SELECT * FROM product
                        INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                        INNER JOIN product_thumbnail ON product.product_id = product_thumbnail.product_id
                        WHERE product_category_id = '$categoryID'";
            }
            else {
                $out['error'] = true;
                $out['message'] = "Something went wrong while Searching for a Product";
            }       

            $result = $conn->query($sql);
            $product = array();

            while ($row = $result->fetch_assoc()) {
                array_push($product, $row);
            }

            $out['product'] = $product;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Selected Product
    if ($crud == 'selectProduct') {
        try {
            $productID = $_POST['productID'];
            
            $sql = "SELECT * FROM product
                    INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                    WHERE product_id = '$productID'";

            $result = $conn->query($sql);

            if ($result) {
                $product = array();

                while ($row = $result->fetch_assoc()) {
                    array_push($product, $row);
                }
    
                $out['product'] = $product;

                //Get Selected Product Thumbnail
                $sql = "SELECT * FROM product_thumbnail
                        WHERE product_id = '$productID'";

                $result = $conn->query($sql);

                if ($result) {
                    $productThumbnail = array();

                    while ($row = $result->fetch_assoc()) {
                        array_push($productThumbnail, $row);
                    }
        
                    $out['productThumbnail'] = $productThumbnail;

                    //Get Selected Product Images
                    $sql = "SELECT * FROM product_image
                            WHERE product_id = '$productID'";

                    $result = $conn->query($sql);

                    if ($result) {
                        $productImage = array();

                        while ($row = $result->fetch_assoc()) {
                            array_push($productImage, $row);
                        }

                        $out['productImage'] = $productImage;
                    }
                    else {
                        $out['error'] = true;
                        $out['message'] = "Something Went Terribly Wrong While Attempting to Retrieve Product Images";
                    }
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Something Went Terribly Wrong While Attempting to Retrieve Product Thumbnail";
                }
            }
            else {
                $out['error'] = true;
                $out['message'] = "Something Went Terribly Wrong While Attempting to Retrieve Product Information";
            }

        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Product by Brand
    if ($crud == 'getBrandProducts') {
        try {
            $brandName = $_POST['brandName'];
            
            $sql = "SELECT * FROM product
                    INNER JOIN product_brand ON product.product_brand_id = product_brand.product_brand_id
                    WHERE product_brand_name = '$brandName'";

            $result = $conn->query($sql);
            $product = array();

            while ($row = $result->fetch_assoc()) {
                array_push($product, $row);
            }

            $out['product'] = $product;
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