
let productInfoPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : [],
        productItem : [],
        productThumbnail : [],
        productImage : [],
        brandProductItem : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true,
        amountOfItemsInCart : 0
    },
    methods : {
        getActiveUser : function() {
            let activeUser = sessionStorage.getItem("user");

            if (activeUser) {
                let form_data = new FormData();
                form_data.append("user", activeUser);

                axios.post('http://localhost/onlineStoreApi/authentication.php?crud=activeUser', form_data)
                    .then (function(response) {
                    
                    if (response.data.error) {  
                        // handle error                  
                        //alert(response.data.message);
                    }
                    else {
                        // handle success
                        productInfoPage.displaySignIn = false;
                        productInfoPage.displayLogOut = true;
                        productInfoPage.displayUser = true;
                        productInfoPage.userName = response.data.user;
                        productInfoPage.getAmountOfItemInCart(activeUser);
                        //alert(response.data.message);
                    }
                })
            }
            else {
                //Do Nothing
            }            
        },
        getAmountOfItemInCart : function(activeUser) {
            let form_data = new FormData();
            form_data.append("clientID", activeUser);

            axios.post('http://localhost/onlineStoreApi/cart.php?crud=getClientCart', form_data)
                .then (function(response) {
                
                if (response.data.error) {  
                    // handle error                                                   
                    // console.log(response.data.message);
                }
                else {
                    // handle success
                    productInfoPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        //Create Dropdown
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                productInfoPage.categoryList = response.data.category; 
                productInfoPage.numberOfCategories = productInfoPage.categoryList.length;
                productInfoPage.getBrands();
                //productInfoPage.createNavigationBody(); 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed                
            });           
        },
        getBrands : async function() {
            category = productInfoPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);   
                    
                    productInfoPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });                
            }
        },
        //Get Product Information
        getProductInfo : function() {
            let selectedProduct = sessionStorage.getItem("selectedProduct");  
            
            let form_data = new FormData();
            form_data.append("productID", selectedProduct);
            
            axios.post('http://localhost/onlineStoreApi/product.php?crud=selectProduct', form_data) 
            .then(function (response) {
                // handle success
                productInfoPage.productItem = response.data.product;
                productInfoPage.productThumbnail = response.data.productThumbnail;
                productInfoPage.productImage = response.data.productImage;
                productInfoPage.getSameBrandProducts(response.data.product[0].product_brand_name);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            }); 
        },
        //Change Main Image Display
        changeImage : function(image) {
            let mainImageDisplay = document.getElementById("mainImageDisplay");
            mainImageDisplay.src = image;
        },
        //Get Products for Carousel
        getSameBrandProducts : function(brandName) {
            let form_data = new FormData();
            form_data.append("brandName", brandName);
            
            axios.post('http://localhost/onlineStoreApi/product.php?crud=getBrandProducts', form_data) 
            .then(function (response) {
                // handle success  
                // console.log(response)
                productInfoPage.brandProductItem = response.data.product;
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            }); 
        },
        //Add Item to Cart
        addItemToCart : function(product) {
            let activeUser = sessionStorage.getItem("user");

            if (activeUser) {
                this.addItemToCartActiveUser(activeUser, product);
            }
            else {
                this.navigateToSignIn();
            }
        },
        addItemToCartActiveUser : function(user, product) {
            let userID = user;
            
            let form_data = new FormData();
            form_data.append("clientID", userID);
            form_data.append("productID", product.product_id);
            form_data.append("quantity", 1);

            axios.post('http://localhost/onlineStoreApi/cart.php?crud=addToCart', form_data)
            .then (function(response) {
                // console.log(response);

                if (response.data.error) {
                    console.log(response.data.message);
                }
                else {
                    console.log(response.data.message);
                    productInfoPage.navigateToCart();
                }
            });
        },
        //User Search
        performSearch : function() {
            let search = document.getElementById("searchItem").value;

            if (search) {
                sessionStorage.setItem("search", search);
                sessionStorage.removeItem("selectedBrand");
                sessionStorage.removeItem("selectedCategory");

                this.navigateToProduct();
            }
            else {
                alert("Search Field is Empty.  Please Try Again");
            }           
        },
        //User Product Selection
        selectCategory : function(category) {
            sessionStorage.setItem("selectedCategory", category.product_category_id);
            sessionStorage.removeItem("selectedBrand");
            sessionStorage.removeItem("search");
        },
        selectBrand : function(category, brand) {
            sessionStorage.setItem("selectedCategory", category.product_category_id);
            sessionStorage.setItem("selectedBrand", brand.product_brand_name);
            sessionStorage.removeItem("search");
        },
        //Navigation
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        },
        navigateToSignIn : function() {
            window.location.href = '../startUp/signIn.html';
        },
        navigateToCart : function() {
            window.location.href = '../cart/cart.html';
        },
        navigateToProduct : function() {
            window.location.href = '../product/product.html';
        },
        navigateToClient : function() {
            window.location.href = '../client/client.html';
        },        
        navigateToAbout : function() {
            window.location.href = '../company/about.html';
        },
        navigateToContactUs : function() {
            window.location.href = '../company/contactUs.html';
        },
        //User Log Out
        userLogOut : function() {
            sessionStorage.clear();
            productInfoPage.displaySignIn = true;
            productInfoPage.displayLogOut = false;
            productInfoPage.displayUser = false;
            window.location.href = '../landingPage.html';
        },
        scrollTop : function() {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    },
    //Run the functions on start
    created : function() {
        this.getActiveUser();        
    },
    //Continiously run these functions
    mounted() {
        this.getProductInfo();
        this.getCategories();
    }
})