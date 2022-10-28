
let frmHeader = new Vue ({
    el : '#frmHeaderGrid',
    methods : {
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
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})

let frmFooter = new Vue ({
    el : '#frmFooter',
    methods : {
        navigateToAbout : function() {
            window.location.href = 'about.html';
        },
        navigateToContactUs : function() {
            window.location.href = 'contactUs.html';
        }       
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})