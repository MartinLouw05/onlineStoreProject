
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
        displaySignIn : true,
        cartTotal : 0,
        amountOfItemsInCart : 0,
        items : true
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
                        cartPage.displaySignIn = false;
                        cartPage.displayLogOut = true;
                        cartPage.displayUser = true;
                        cartPage.userName = response.data.user;
                        cartPage.getAmountOfItemInCart(activeUser);
                        cartPage.getActiveUserCart(activeUser);
                        //alert(response.data.message);
                    }
                })
            }
            else {
                this.items = false;
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
                    cartPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        //Get Active User Cart
        getActiveUserCart : function(activeUser) {
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
                    cartPage.cartItem = response.data.cart;

                    for (i = 0; i < response.data.cart.length; i++) {
                        cartPage.cartTotal = parseInt(cartPage.cartTotal) + (parseInt(response.data.cart[i].product_price) * parseInt(response.data.cart[i].client_cart_quantity));
                    }
                }
            })
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
        getBrands : async function() {
            category = cartPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
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
        //Remove Item from Cart
        removeFromCart : function(product) {
            let clientID = sessionStorage.getItem("user");
            
            let form_data = new FormData();
            form_data.append("clientID", clientID);
            form_data.append("productID", product.product_id);

            axios.post('http://localhost/onlineStoreApi/cart.php?crud=delete', form_data)
            .then (function(response) {
            
            if (response.data.error) {  
                // handle error                                    
                alert(response.data.message);
            }
            else {
                // handle success
                alert(response.data.message);
                window.location.href = 'cart.html';
            }
        })
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
            cartPage.displaySignIn = true;
            cartPage.displayLogOut = false;
            cartPage.displayUser = false;
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
        this.getCategories();
    }
})