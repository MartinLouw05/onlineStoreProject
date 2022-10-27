<?php include '../cart/cartHeader.php'; ?>

    <form method='post' class='frmCart'>
        
        <div class='cartArea'>
            <div class='cartTitle'>
                <h2>Shopping Cart</h2>
            </div>
            <div class='cartTitlePrice'>
                <h3>Price</h3>
            </div>

            <div class='cartGrid'>
                <div class='cartImage'>
                    <img src='https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png' class='productImage'>
                </div>
                <div class='cartDesc'>
                    <div><h4>Placeholder Product Name</h4></div>
                    <div>Available Stock: </div>
                    <div>
                        <select title='Quantity'>
                            <option value='1' selected>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </select>
                    </div>
                    <div class='purchaseInfo'>&#128712 Purchase limit of 5 per customer.</div>
                </div>
                <div class='cartPrice'>
                    <div>R14.99</div>
                    <div>
                        <button id='btnRemoveProduct' name='btnRemoveProduct' class='btnRemoveProduct'>&#128465</button>
                    </div> 
                    <div class='removeInfo'>Remove</div>                  
                </div>
            </div>

            <hr>

            <div class='cartGrid'>
                <div class='cartImage'>
                    <img src='https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png' class='productImage'>
                </div>
                <div class='cartDesc'>
                    <div><h4>Placeholder Product Name</h4></div>
                    <div>Available Stock: </div>
                    <div> 
                        <select title='Quantity'>
                            <option selected>1</option>
                            <option>2</option>
                        </select>
                    </div>
                    <div class='purchaseInfo'>&#128712 Purchase limit of 5 per customer.</div>
                </div>
                <div class='cartPrice'>
                    <div>R14.99</div>
                    <div>
                        <button id='btnRemoveProduct' name='btnRemoveProduct' class='btnRemoveProduct'>&#128465</button>
                    </div> 
                    <div class='removeInfo'>Remove</div>                 
                </div>
            </div>

            <hr>

            <div class='cartTotal'>
                <div>Subtotal: R14.99</div>
                <div>
                    <button id='btnCheckout' name='btnCheckout' class='btnCheckout'>Proceed to Checkout</button>
                </div>                
            </div>
        </div>    
        
        <div class='shoppingDisclaimer'>
            &#9888 Availability and Pricing of products sold by Cricket Direct are subject to change.  The Cart only reflects the most recent price of each product. &#9888
        </div>
    </form>

<?php include '../cart/cartFooter.php'; ?>