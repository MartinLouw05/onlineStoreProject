<?php include './startUp/header.php'; ?>

    <form method='post' class='mainGrid'>
        <div class='slideshow'>
            <div id='carouselSlideShow' class='carousel slide' data-ride='carousel'>
                <div class='carousel-inner'>
                    <div class='carousel-item active'>
                        <img src='https://i.pinimg.com/originals/bf/4f/6f/bf4f6fc68ef863b97be6a7a86fb6b303.jpg' class='carouselImage'>
                    </div>
                    <div class='carousel-item'>
                        <img src='https://64.media.tumblr.com/fb2290019ab5747efeed8c4b9edf7e9f/tumblr_inline_o5im6rIDC11tm5d9e_1280.jpg' class='carouselImage'>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselSlideShow" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselSlideShow" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
        <div class='headerTitle'>
            <h1>Shop by Category</h1>
        </div>    
        <div class='item'>
            <button id='btnBats' name='btnBats' class='btnBats'>Bats</button>
        </div>
        <div class='item'>
            <button id='btnHelmets' name='btnHelmets' class='btnHelmets'>Batting Helmets</button>
        </div>
        <div class='item'>
            <button id='btnGloves' name='btnGloves' class='btnGloves'>Batting Gloves</button>
        </div>
        <div class='item'>
            <button id='btnArm' name='btnArm' class='btnArm'>Arm Pads</button>
        </div>
        <div class='item'>
            <button id='btnThigh' name='btnThigh' class='btnThigh'>Thigh Pads</button>
        </div>
        <div class='item'>
            <button id='btnPads' name='btnPads' class='btnPads'>Batting Pads</button>
        </div>
        <div class='item'>
            <button id='btnApparel' name='btnApparel' class='btnApparel'>Apparel</button>
        </div>
        <div class='item'>
            <button id='btnFootwear' name='btnFootwear' class='btnFootwear'>Footwear</button>
        </div>
        <div class='item'>
            <button id='btnBalls' name='btnBalls' class='btnBalls'>Balls</button>
        </div>
        <div class='item'>
            <button id='btnBags' name='btnBags' class='btnBags'>Bags</button>
        </div>
        <div class='item'>
            <button id='btnAccessories' name='btnAccessories' class='btnAccessories'>Accessories</button>
        </div>
        <div class='item'>
            <button id='btnOther' name='btnOther' class='btnOther'>Other</button>
        </div>
    </form>

<?php include './startUp/footer.php'; ?>