let clientInfoPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        brandList : [],
        userName : "",
        displayUser : false,
        displayLogOut : false,
        displaySignIn : true,
        clientInfo : [],
        updateUser : { id : "", name : "", surname : "", dob : "", contact : "", email : "" },
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
                        clientInfoPage.displaySignIn = false;
                        clientInfoPage.displayLogOut = true;
                        clientInfoPage.displayUser = true;
                        clientInfoPage.userName = response.data.user;
                        clientInfoPage.getUserInfo(activeUser);
                        clientInfoPage.getAmountOfItemInCart(activeUser);
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
                    clientInfoPage.amountOfItemsInCart = response.data.cart.length;
                }
            })
        },
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                clientInfoPage.categoryList = response.data.category; 
                clientInfoPage.numberOfCategories = clientInfoPage.categoryList.length;
                clientInfoPage.getBrands();
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
            category = clientInfoPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);
                
                await axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);
                    
                    clientInfoPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });                
            }
            //console.log(clientInfoPage.brandList)
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
        //Get User Info to Fill Form
        getUserInfo : function(userID) {
            let form_data = new FormData();
            form_data.append("user", userID);

            axios.post('http://localhost/onlineStoreApi/client.php?crud=userInfo', form_data)
                .then (function(response) {

                if (response.data.error) {  
                    // handle error                  
                    alert(response.data.message);                    
                }
                else {
                    // handle success
                    //alert(response.data.message);
                    let user = response.data.user[0];
                    clientInfoPage.updateUser = { id : user.client_id, name : user.client_name, surname : user.client_surname, dob : user.client_dob, contact : user.client_contact, email : user.client_email };
                }
            })
        },
        updateUserInfo : function() {           
            let userName = document.getElementById("clientName").value;
            let userSurname = document.getElementById("clientLastName").value;
            let userDob = document.getElementById("clientDoB").value;
            let userContact = document.getElementById("clientContact").value;
            let userEmail = document.getElementById("clientEmail").value;
            let userCurrentPassword = document.getElementById("clientCurrentPassword").value;
            let userPassword = document.getElementById("clientPassword").value;
            let userRePassword = document.getElementById("clientReEnterPassword").value;

            if (userName == "" || userSurname == "" || userDob == "" || userContact == "" || userEmail == "" || userCurrentPassword == "") {
                alert("Please Ensure that All Fields have been Filled");
                event.preventDefault();
            }
            else if (userContact.length !== 10) {
                alert("Please Ensure that your Contact Number is 10 characters");
                event.preventDefault();
            }
            else if (!userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                alert("Please Ensure that your Email Address is in the Correct Format");
                event.preventDefault();
            }
            else if (userPassword) {
                if (userPassword.length < 8) {
                    alert("Please Ensure that your New Password is at least 8 characters");
                    event.preventDefault();
                }
                else if (userPassword !== userRePassword) {
                    alert("Please Ensure that the Entered Passwords Match");  
                    event.preventDefault();              
                }
                else if (userPassword == userRePassword) {
                    this.saveUpdatedUserInfo();
                    event.preventDefault();                
                } 
                else {
                    alert("Something Went Wrong While Attempting to Save the User's Updated Information");
                    event.preventDefault();
                } 
            } 
            else {
                this.saveUpdatedUserInfo();
                event.preventDefault();
            }       
        },
        saveUpdatedUserInfo : function() {
            let userCurrentPassword = document.getElementById("clientCurrentPassword").value;
            let userPassword = document.getElementById("clientPassword").value;

            let userData = clientInfoPage.toFormData(clientInfoPage.updateUser);
            userData.append("password", userCurrentPassword);
            userData.append("newPassword", userPassword);
            
            axios.post('http://localhost/onlineStoreApi/client.php?crud=update', userData)
            .then (function(response) {
                // console.log(response);
                clientInfoPage.updateUser = { id : "", name : "", surname : "", dob : "", contact : "", email : "" };

                if (response.data.error) {
                    // handle error
                    alert(response.data.message);
                    window.location.href = 'clientAccount.html';
                }
                else {
                    // handle success
                    alert(response.data.message);
                    window.location.href = 'clientAccount.html';
                }
            });
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
            window.location.href = 'client.html';
        },
        navigateToAbout : function() {
            window.location.href = '../company/about.html';
        },
        navigateToContactUs : function() {
            window.location.href = '../company/contactUs.html';
        },
        toFormData : function(userObj) {
            let form_data = new FormData();

            for (let key in userObj) {
                form_data.append(key, userObj[key]);
            }

            return form_data;          
        },
        //User Log Out
        userLogOut : function() {
            sessionStorage.clear();
            clientInfoPage.displaySignIn = true;
            clientInfoPage.displayLogOut = false;
            clientInfoPage.displayUser = false;
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
