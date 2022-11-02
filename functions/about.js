
let aboutPage = new Vue ({
    el : '#app',
    data : {
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
                        aboutPage.displaySignIn = false;
                        aboutPage.displayLogOut = true;
                        aboutPage.displayUser = true;
                        aboutPage.userName = response.data.user;
                        //alert(response.data.message);
                    }
                })
            }
            else {
                //Do Nothing
            }            
        },
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
        }
    },
    //Run the functions on start
    created : function() {
        this.getActiveUser();
    },
    //Continiously run these functions
    mounted() {
        
    }
})
