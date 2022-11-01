
let landingPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : []
    },
    methods : {
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
        } 
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        this.getCategories();
    }
})