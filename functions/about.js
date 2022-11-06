
let aboutPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        brandList : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true,
        amountOfItemsInCart : 0,
        developerName : "Martin Louw",
        developerDesc : "Bachelor of Commerce - Informatics - Information Sciences \nStudied at the University of Pretoria \n\nI finished my matric in 2013 at Centurion High School, after which I was accepted in 2014 at the University of Pretoria to study towards a Bachelor of Commerce: Financial Science.  At the end of my second year, I realized that my passion was not Accounting.  I changed my study field to Bachelor of Commerce: Informatics.  I took a gap year in 2019 to become a better and more engaged student and obtained my Bachelor of Commerce: Informatics qualification in November 2020, the graduation ceremony took place in May 2021. \nI am able to work independently, or as part of a team.  I am a hard worker and take responsibility for the tasks assigned to me.",
        companyDesc : "Welcome to Cricket Direct. \nHere we attempt to provide players with the best equipment found on the market today. \nWe are passionate about the sport and will do our best to provide players with support on any queries or uncertainties that they might experience.\n \nThis website is created as a project and is not an actual company.  This project has no affiliation with any other companies of the similar design or naming."
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
                        aboutPage.displaySignIn = false;
                        aboutPage.displayLogOut = true;
                        aboutPage.displayUser = true;
                        aboutPage.userName = response.data.user;
                        aboutPage.getAmountOfItemInCart(activeUser);
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
                    aboutPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                aboutPage.categoryList = response.data.category; 
                aboutPage.numberOfCategories = aboutPage.categoryList.length;
                aboutPage.getBrands();
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
            category = aboutPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);
                    
                    aboutPage.brandList.push(response.data.brand);
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
            window.location.href = 'about.html';
        },
        navigateToContactUs : function() {
            window.location.href = 'contactUs.html';
        },
        //User Log Out
        userLogOut : function() {
            sessionStorage.clear();
            aboutPage.displaySignIn = true;
            aboutPage.displayLogOut = false;
            aboutPage.displayUser = false;
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
