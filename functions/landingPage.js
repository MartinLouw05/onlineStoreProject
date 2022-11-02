
let landingPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : [],
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
                    
                    if (response.data.error) {  
                        // handle error                  
                        //alert(response.data.message);
                    }
                    else {
                        // handle success
                        landingPage.displaySignIn = false;
                        landingPage.displayLogOut = true;
                        landingPage.displayUser = true;
                        landingPage.userName = response.data.user;
                        //alert(response.data.message);
                    }
                })
            }
            else {
                //Do Nothing
            }            
        },
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                landingPage.categoryList = response.data.category; 
                landingPage.numberOfCategories = landingPage.categoryList.length;
                landingPage.getBrands();
                //landingPage.createNavigationBody(); 
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
            category = landingPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);   
                    
                    landingPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });                
            }
            //console.log(landingPage.brandList)
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
        navigateToSignIn : function() {
            window.location.href = './startUp/signIn.html';
        },
        navigateToCart : function() {
            window.location.href = './cart/cart.html';
        },
        navigateToProduct : function() {
            window.location.href = './product/product.html';
        },
        navigateToClient : function() {
            window.location.href = './client/client.html';
        },        
        navigateToAbout : function() {
            window.location.href = './company/about.html';
        },
        navigateToContactUs : function() {
            window.location.href = './company/contactUs.html';
        },
        //User Log Out
        userLogOut : function() {
            sessionStorage.clear();
            landingPage.displaySignIn = true;
            landingPage.displayLogOut = false;
            landingPage.displayUser = false;
            window.location.href = 'landingPage.html';
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