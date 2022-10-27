<?php include '../client/clientHeader.php'; ?>

    <form method='post' class='frmClient'>
        <div class='clientGrid'>
            <div class='gridAcc'>
                <div><h4>Account Information <a>&#128100</a></h4></div>
                <div><button id='btnPersonalInfo' name='btnPersonalInfo' class='clientBtn'>Personal Information</button></div>
                <div><button class='clientBtn'>Delivery Information</button></div>
            </div>
            <div class='gridOrders'>
                <div><h4>Orders and Returns <a>&#128722</a></h4></div>
                <div><button id='btnCart' name='btnCart' class='clientBtn'>Shopping Cart</button></div>
                <div><button class='clientBtn'>Orders</button></div>
                <div><button class='clientBtn'>Invoices</button></div>
                <div><button class='clientBtn'>Returns</button></div>
            </div>
            <div class='gridBilling'>
                <div><h4>Billing Information <a>&#128179</a></h4></div>
                <div><button class='clientBtn'>Credit Information</button></div>
                <div><button class='clientBtn'>Refunds</button></div>
                <div><button class='clientBtn'>Redeem Gift Voucher</button></div>
            </div>
            <div class='gridWishlist'>
                <div><h4>Wishlist <a>&#127873</a></h4></div>
                <div><button class='clientBtn'>My Wishlist</button></div>
            </div>
            <div class='gridSupport'>
                <div><h4>Contact Us <a>&#128712</a></h4></div>
                <div><button id='btnAbout' name='btnAbout' class='clientBtn'>Contact Information</button></div>
                <div><button id='btnContactUs' name='btnContactUs' class='clientBtn'>About Us</button></div>
            </div>
        </div>
    </form>

<?php include '../client/clientFooter.php'; ?>