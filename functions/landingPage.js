
let landingPage = new Vue ({
    el : '#app',
    data : {
        categoryList : [],
        numberOfCategories : 0,
        brandList : []
    },
    methods : {
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                landingPage.categoryList = response.data.category; 
                landingPage.numberOfCategories = landingPage.categoryList.length;
                landingPage.getBrands();
                //landingPage.createNavigationBody(); 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed                
            });           
        },
        getBrands : function() {
            category = landingPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);  
                
                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success  
                    let brandAll = { product_brand_name : "All" };
                    response.data.brand.unshift(brandAll);   
                    
                    landingPage.brandList.push(response.data.brand);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });                
            }
            //console.log(landingPage.brandList)
        },
        selectProduct : function(product) {
            localStorage.setItem("selectedCategory", product.product_category_id);
        },
        selectBrand : function(product) {
            localStorage.setItem("selectedBrand", product.product_brand_name);
        },
        createNavigationHeader : function(category) {
            for (i = 0; i < category.length; i++) {   
                let newCategory = category[i];

                const newLine = document.createElement('li');
                const newAnchor = document.createElement('a');
                //const newSpan = document.createElement('span');

                newLine.id = "category" + newCategory.product_category_name;
                newLine.className = "nav-item dropdown";

                newAnchor.id = "navbarDropdownMenuLink";
                newAnchor.className = "nav-link dropdown-toggle";
                newAnchor.innerHTML = newCategory.product_category_name;
                newAnchor.setAttribute("data-toggle", "dropdown");
                newAnchor.setAttribute("aria-haspopup", "true");
                newAnchor.setAttribute("aria-expanded", "false");

                //newSpan.className = "sr-only";
                //newSpan.innerHTML = "(current)";

                newLine.append(newAnchor);
                document.getElementById("navbarDropdown").append(newLine);                
            }  

            frmHeaderDropdown.createNavigationBody(category);  
        },
        createNavigationBody : function() {
            category = landingPage.categoryList;
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);                

                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success       
                    console.log("hi")             
                    landingPage.brandList = response.data.brand;
                    //landingPage.createNavigationBodyElement(nextCategory.product_category_name, landingPage.brandList);
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
        createNavigationBodyElement : function(categoryName, brand) {

            const newDiv = document.createElement('div');

            newDiv.id = "menu" + categoryName;
            newDiv.setAttribute("brandID" , categoryName);
            newDiv.className = "dropdown-menu";
            newDiv.setAttribute("aria-labelledby", "navbarDropdownMenuLink");

            document.getElementById("category" + categoryName).append(newDiv);

            let brandAll = { product_brand_id : "0", product_brand_name : "All" };
            brand.unshift(brandAll);

            for (i = 0; i < brand.length; i++) {
                let nextBrand = brand[i];                
                
                const newAnchor = document.createElement('a');

                newAnchor.id = "menuItem" + categoryName + nextBrand.product_brand_name;
                newAnchor.className = "dropdown-item";
                newAnchor.innerHTML = nextBrand.product_brand_name;
                
                //newAnchor.setAttribute("href", "../product/product.html");
                //newAnchor.setAttribute("onclick", "navigateToProduct();");
                
                document.getElementById("menu" + categoryName).append(newAnchor);
                
            }            
        },
        //Navigation
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
        this.getCategories();
    }
})