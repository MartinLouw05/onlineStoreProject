
let frmSignInGrid = new Vue ({
    el : '#frmSignInGrid',
    methods : {
        navigateToRegistration : function() {
            window.location.href = 'registerClient.html';
        }
    }
})