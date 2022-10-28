//const { default: axios } = require("axios");

let frmSignInGrid = new Vue ({
    el : '#frmForgotPasswordGrid',
    //Functionality
    methods : {    
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        }, 
        getAllClients : function() {
            axios.get('http://localhost/onlineStoreApi/client.php') 
            .then(function (response) {
                // handle success
                console.log(response);
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
    //Run the functions on start
    created : function() {
        this.getAllClients();
    },
    //Continiously run these functions
    mounted() {
        
    }
})