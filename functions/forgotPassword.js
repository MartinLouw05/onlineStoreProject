//const { default: axios } = require("axios");

let forgotPasswordPage = new Vue ({
    el : '#app',
    data : { 
        newInstance : { email : "", dob : "" }
    },
    //Functionality
    methods : {  
        validateUserData : function() {
            var userData = forgotPasswordPage.toFormData(forgotPasswordPage.newInstance);

            axios.post('http://localhost/onlineStoreApi/authentication.php?crud=forgotPassword', userData)
            .then (function(response) {
                forgotPasswordPage.newInstance = { email : "", dob : "" };

                if (response.data.error) {  
                    // handle error                  
                    alert(response.data.message);
                }
                else {
                    // handle success
                    alert(response.data.message);
                    window.location.href = '../startUp/signIn.html';
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
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        }
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})