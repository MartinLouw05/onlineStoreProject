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
            $sql = "SELECT * FROM client_cart";

            $result = $conn->query($sql);
            $cart = array();

            while ($row = $result->fetch_assoc()) {
                array_push($cart, $row);
            }

            $out['cart'] = $cart;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Client Cart
    if ($crud == 'getClientCart') {
        try {
            $clientID = $_POST['clientID'];

            $sql = "SELECT * FROM client_cart
                    INNER JOIN product ON client_cart.product_id = product.product_id
                    INNER JOIN product_thumbnail ON product.product_id = product_thumbnail.product_id
                    WHERE client_id = '$clientID'";
            
            $result = $conn->query($sql);
            $cart = array();

            while ($row = $result->fetch_assoc()) {
                array_push($cart, $row);
            }

            $out['cart'] = $cart;            
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Get Client Cart Content
    if ($crud == 'getClientCartContent') {
        try {
            $clientID = $_POST['clientID'];

            $sql = "SELECT * FROM client_cart
                    INNER JOIN product ON client_cart_inventory.product_id = product.product_id
                    WHERE client_id = '$clientID'";

            $result = $conn->query($sql);
            $cart = array();

            while ($row = $result->fetch_assoc()) {
                array_push($cart, $row);
            }

            $out['cart'] = $cart;
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Add To Cart
    if ($crud == 'addToCart') {
        try {
            $clientID = $_POST['clientID'];
            $productID = $_POST['productID'];
            $productQuantity = $_POST['quantity'];

            //Check for Duplicate Item
            $sql = "SELECT * FROM client_cart
                    WHERE client_id = '$clientID' AND product_id = '$productID'";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {               
                //Get Product Quantity
                $sql = "SELECT client_cart_quantity FROM client_cart
                        WHERE client_id = '$clientID' AND product_id = '$productID'";
                
                $result = $conn->query($sql);            
                $cartQuantity = array();
    
                while ($row = $result->fetch_assoc()) {
                    array_push($cartQuantity, $row);
                }
    
                $oldQuantity = $cartQuantity[0];
                $oldQuantity = $oldQuantity['client_cart_quantity'];

                //Sum of the Quantities
                $quantityArray = array($oldQuantity, $productQuantity);
                $newQuantity = array_sum($quantityArray);
               
                $sql = "UPDATE client_cart
                        SET client_cart_quantity = '$newQuantity'
                        WHERE client_id = '$clientID' AND product_id = '$productID'";

                $result = $conn->query($sql);

                if ($result) { 
                    $out['message'] = "Product Quantity Successfully Updated";
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Failed to Update Product Quantity";
                }
            }
            else {
                $sql = "INSERT INTO client_cart (client_id, product_id, client_cart_quantity)
                        VALUES ('$clientID', '$productID', '$productQuantity')";

                $query = $conn->query($sql);
                        
                if ($query) {
                    $out['message'] = "Product Successfully Added to Cart";
                }
                else {
                    $out['error'] = true;
                    $out['message'] = "Failed to Add Product to Cart.  Please Try Again";
                }
            }           
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Update Quantity
    if ($crud == 'updateQuantity') {
        try {
            $clientID = $_POST['clientID'];
            $productID = $_POST['productID'];
            $quantity = $_POST['quantity'];

            $sql = "UPDATE client_cart
                    SET client_cart_quantity = '$quantity'
                    WHERE client_id = '$clientID' AND product_id = '$productID'";
            
            $result = $conn->query($sql);

            if ($result) { 
                $out['message'] = "Quantity Updated";
            }
            else {
                $out['error'] = true;
                $out['message'] = "Failed to Update Quantity";
            }
        }
        catch (Exception $e) {
            $out['error'] = true;
            $out['message'] = "Something Went Terribly Wrong";
        }
    }

    //Delete
    if ($crud == 'delete') {
        try {
            $clientID = $_POST['clientID'];
            $productID = $_POST['productID'];

            $sql = "DELETE FROM client_cart
                    WHERE client_id = '$clientID' AND product_id = '$productID'";

            $query = $conn->query($sql);
                    
            if ($query) {
                $out['message'] = "Product Successfully Removed from your Cart";
            }
            else {
                $out['error'] = true;
                $out['message'] = "Failed to Remove Product from your Cart.  Please Try Again";
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