
let frmHeader = new Vue ({
    el : '#frmHeaderGrid',
    data : {
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
        },
        getBrands : function() {
            axios.get('http://localhost/onlineStoreApi/productBrand.php') 
            .then(function (response) {
                // handle success
                console.log(response);
                this.brandList = response.data.brand;
                console.log(this.brandList);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
        },
        createNavigationHeader : function() {
            
        },
        createNavigation : function() {
            let form_data = new FormData();
            form_data.append( "categoryID", "1");

            axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
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
        this.getBrands();
        this.createNavigation();
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
