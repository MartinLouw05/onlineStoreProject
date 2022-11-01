
let productInfoPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : [],
        productItem : [],
        brandProductItem : []
    },
    methods : {
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
        getBrands : function() {
            category = productInfoPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
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
        //Get Products for Carousel
        getSameBrandProducts : function(brandName) {
            let form_data = new FormData();
            form_data.append("brandName", brandName);
            
            axios.post('http://localhost/onlineStoreApi/product.php?crud=getBrandProducts', form_data) 
            .then(function (response) {
                // handle success  
                console.log(response)
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
            let productID = product.product_id;

            let productObj = {};
            productObj['productID'] = productID;
            let productArray = [];
            productArray.push(productObj);
            sessionStorage.setItem("userCart", JSON.stringify(productArray));
/*
            let jsonCart = { "product_id" : productID };
            jsonCart = JSON.stringify(jsonCart);
            let userArray = [];
            userArray.push(jsonCart);
            sessionStorage.setItem("userCart", userArray);*/
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
        } 
    },
    //Run the functions on start
    created : function() {
        this.getProductInfo();        
    },
    //Continiously run these functions
    mounted() {
        this.getCategories();
    }
})