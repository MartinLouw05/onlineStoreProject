
let frmHeader = new Vue ({
    el : '#frmHeaderGrid',
    methods : {
        navigateToSignIn : function() {
            window.location.href = './startUp/signIn.html';
        },
        navigateToCart : function() {
            window.location.href = './cart/cart.html';
        }
    }
})

let frmMain = new Vue ({
    el : '#frmMainGrid',
    methods : {
        
    }
})
