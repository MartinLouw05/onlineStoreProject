
let frmHeader = new Vue ({
    el : '#frmHeaderGrid',
    data : {
        categoryList : {},
        brandList : {}
    },
    methods : {
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
        }
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})

let frmMain = new Vue ({
    el : '#frmMainGrid',
    methods : {
        navigateToProduct : function() {
            window.location.href = './product/product.html';
        }        
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
            window.location.href = './company/about.html';
        },
        navigateToContactUs : function() {
            window.location.href = './company/contactUs.html';
        }       
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})
