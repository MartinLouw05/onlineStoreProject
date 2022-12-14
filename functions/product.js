
//Product Class
class Product {
    constructor(id, image, name, brand, description, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.price = price;
    }    
}

let productPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : [],
        productList : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true,
        amountOfItemsInCart : 0,
        noProduct : true
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
                        productPage.displaySignIn = false;
                        productPage.displayLogOut = true;
                        productPage.displayUser = true;
                        productPage.userName = response.data.user;
                        productPage.getAmountOfItemInCart(activeUser);
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
                    productPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        //Create Dropdown
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                productPage.categoryList = response.data.category;
                productPage.numberOfCategories = productPage.categoryList.length;
                productPage.getBrands(); 
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
            productPage.brandList = [];
            category = productPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);   
                    
                    productPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
            }

            if (productPage.brandList.length == category.length) {
                // Dropdown Created Correctly
            }
            else {
                productPage.getBrands();                
            }
        },
        //Get Product Information
        getProducts : function() {
            let search = sessionStorage.getItem("search");
            let selectedCategory = sessionStorage.getItem("selectedCategory");            
            let selectedBrand = sessionStorage.getItem("selectedBrand");            

            let form_data = new FormData();

            if (selectedBrand == "All") {
                form_data.append("categoryID", selectedCategory);
                form_data.append("brandName", "null");
                form_data.append("search", "null");
            }
            else if (search) {
                form_data.append("categoryID", "null");
                form_data.append("brandName", "null");
                form_data.append("search", search);
            }
            else {
                form_data.append("categoryID", selectedCategory);
                form_data.append("brandName", selectedBrand);
                form_data.append("search", "null");
            }
            
            axios.post('http://localhost/onlineStoreApi/product.php?crud=searchProduct', form_data) 
            .then(function (response) {
                // handle success  
                // console.log(response);
                //productPage.productList = response.data.product;
                let productAmount = response.data.product.length;

                if (productAmount == 0) {
                    productPage.noProduct = false;
                }
                else {
                    for (i = 0; i < productAmount; i++) {
                        let myTest = new Product(response.data.product[i].product_id, response.data.product[i].product_thumbnail_image, response.data.product[i].product_name, response.data.product[i].product_brand_name, response.data.product[i].product_description, response.data.product[i].product_price);
                        productPage.productList.push(myTest);
                    }
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
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
        selectedProduct : function(product) {
            sessionStorage.setItem("selectedProduct", product.id);
        },
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
        navigateToSelectedProduct : function() {
            window.location.href = '../product/productInfo.html';
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
            productPage.displaySignIn = true;
            productPage.displayLogOut = false;
            productPage.displayUser = false;
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
        this.getProducts();
        this.getCategories();        
    }
})