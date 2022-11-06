//const { default: axios } = require("axios");

let signInPage = new Vue ({
    el : '#app',
    data : {
        newLogIn : { email : "", password : "" }
    },
    //Functionality
    methods : { 
        checkActiveUser : function() {
            let activeUser = sessionStorage.getItem("user");

            axios.get('http://localhost/onlineStoreApi/authentication.php') 
            .then (function (response) {
                // handle success
                // console.log(response);                
            })
            .catch (function (error) {
                // handle error
                console.log(error);
            })
            .finally (function () {
                // always executed                
            });       
        },
        attemptLogIn : function() {
            let userData = signInPage.toFormData(signInPage.newLogIn);

            axios.post('http://localhost/onlineStoreApi/authentication.php?crud=signIn', userData)
            .then (function(response) {
                // console.log(response);
                signInPage.newLogIn = { email : "", password : "" };

                if (response.data.error) {  
                    // handle error                  
                    alert(response.data.message);
                }
                else {
                    // handle success
                    sessionStorage.setItem("user", response.data.user);
                    alert(response.data.message);
                    window.location.href = '../landingPage.html';
                }
            });
        },
        toFormData : function(userObj) {
            let form_data = new FormData();

            for (let key in userObj) {
                //console.log(key, userObj[key]);
                form_data.append(key, userObj[key]);
            }
            //console.log(form_data);
            return form_data;          
        },
        //Navigation
        navigateToRegistration : function() {
            window.location.href = 'registerClient.html';
        },        
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        },
        navigateToForgotPassword : function() {
            window.location.href = 'forgotPassword.html';
        }
    },
    //Run the functions on start
    created : function() {
        this.checkActiveUser();
    },
    //Continiously run these functions
    mounted() {
        
    }
})