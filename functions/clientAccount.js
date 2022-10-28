let frmHeader = new Vue ({
    el : '#frmHeaderGrid',
    methods : {
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        },
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
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})

let frmAccInfo = new Vue ({
    el : '#frmAccInfo',
    methods : {
        navigateToSignIn : function() {
            window.location.href = './startUp/signIn.html';
        },
        navigateToCart : function() {
            window.location.href = './cart/cart.html';
        },        
        returnToClient : function() {
            window.location.href = 'client.html';
        },
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})