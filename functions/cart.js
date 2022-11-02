
let cartPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : [],
        cartItem : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true
    },
    methods : {
        getActiveUser : function() {
            let activeUser = sessionStorage.getItem("user");

            if (activeUser) {
                let form_data = new FormData();
                form_data.append("user", activeUser);

                axios.post('http://localhost/onlineStoreApi/authentication.php?crud=activeUser', form_data)
                    .then (function(response) {
                    console.log(response.data.user);
                    
                    if (response.data.error) {  
                        // handle error                  
                        //alert(response.data.message);
                    }
                    else {
                        // handle success
                        cartPage.displaySignIn = false;
                        cartPage.displayLogOut = true;
                        cartPage.displayUser = true;
                        cartPage.userName = response.data.user;
                        //alert(response.data.message);
                    }
                })
            }
            else {
                //Do Nothing
            }            
        },
        //Create Dropdown
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                cartPage.categoryList = response.data.category; 
                cartPage.numberOfCategories = cartPage.categoryList.length;
                cartPage.getBrands();
                //cartPage.createNavigationBody(); 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed                
            });           
        },
        getBrands : function() {
            category = cartPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);   
                    
                    cartPage.brandList.push(response.data.brand);
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
            let selectedProduct = JSON.parse(sessionStorage.getItem("userCart"));  

            if (selectedProduct) {
                console.log(selectedProduct);
            
                let form_data = new FormData();
                form_data.append("productID", selectedProduct[0].productID);
                
                axios.post('http://localhost/onlineStoreApi/product.php?crud=selectProduct', form_data) 
                .then(function (response) {
                    // handle success  
                    cartPage.cartItem = response.data.product;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                }); 
            }
            else {
                //Do Nothing
            }
        },
        //Remove Item from Cart
        removeFromCart : function(product) {
            console.log(product)
        },
        //User Product Selection
        selectCategory : function(category) {
            sessionStorage.setItem("selectedCategory", category.product_category_id);
            sessionStorage.removeItem("selectedBrand");
        },
        selectBrand : function(category, brand) {
            sessionStorage.setItem("selectedCategory", category.product_category_id);
            sessionStorage.setItem("selectedBrand", brand.product_brand_name);
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
            cartPage.displaySignIn = true;
            cartPage.displayLogOut = false;
            cartPage.displayUser = false;
            window.location.href = '../landingPage.html';
        }
    },
    //Run the functions on start
    created : function() {
        this.getActiveUser();
        this.getProductInfo();        
    },
    //Continiously run these functions
    mounted() {
        this.getCategories();
    }
})