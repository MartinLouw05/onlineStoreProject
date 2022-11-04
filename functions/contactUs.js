
let contactUsPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        brandList : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true,
        capeTownOffice : "2nd Floor, Trevor Building \n45 Rautenbach Road \nBelville \nCape Town \n8010",
        userQuery : { email : "", description : "" },
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
                        contactUsPage.displaySignIn = false;
                        contactUsPage.displayLogOut = true;
                        contactUsPage.displayUser = true;
                        contactUsPage.userName = response.data.user;
                        contactUsPage.getAmountOfItemInCart(activeUser);
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
                    contactUsPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                contactUsPage.categoryList = response.data.category; 
                contactUsPage.numberOfCategories = contactUsPage.categoryList.length;
                contactUsPage.getBrands();
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
            category = contactUsPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);
                    
                    contactUsPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });                
            }
            //console.log(contactUsPage.brandList)
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
        //User Query
        createQuery : function() {
            let userEmail = document.getElementById("userEmail").value;
            let userDesc = document.getElementById("userDesc").value;

            if (userEmail == "" || userDesc == "") {
                alert("Please Ensure that all Field are Filled");
                event.preventDefault();
            }
            else if (!userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                alert("Please Ensure that your Email Address is in the Correct Format");
                event.preventDefault();
            }
            else {
                var userData = contactUsPage.toFormData(contactUsPage.userQuery);

                axios.post('http://localhost/onlineStoreApi/queries.php?crud=create', userData)
                .then (function(response) {
                    contactUsPage.userQuery = { email : "", description : "" };
    
                    if (response.data.error) {
                        // handle error
                        alert(response.data.message);
                        event.preventDefault();
                    }
                    else {
                        // handle success
                        alert(response.data.message);
                        event.preventDefault();
                        window.location.href = 'contactUs.html';
                    }
                });
            }
        },
        toFormData : function(userObj) {
            let form_data = new FormData();

            for (let key in userObj) {
                form_data.append(key, userObj[key]);
            }
            return form_data;          
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
            contactUsPage.displaySignIn = true;
            contactUsPage.displayLogOut = false;
            contactUsPage.displayUser = false;
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
