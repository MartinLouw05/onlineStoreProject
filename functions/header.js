
let frmHeaderDropdown = new Vue ({
    el : '#headerDropdown',
    data : {
        categoryList : {},
        brandList : {}
    },
    methods : {
        getCategories : function() {
            axios.get('http://localhost/onlineStoreApi/productCategory.php') 
            .then(function (response) {
                // handle success
                this.categoryList = response.data.category;  
                frmHeaderDropdown.createNavigationHeader(this.categoryList); 
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed                
            });
        },
        createNavigationHeader : function(category) {
            for (i = 0; i < category.length; i++) {   
                let newCategory = category[i];

                const newLine = document.createElement('li');
                const newAnchor = document.createElement('a');
                //const newSpan = document.createElement('span');

                newLine.id = newCategory.product_category_id;
                newLine.className = "nav-item dropdown";

                newAnchor.id = "navbarDropdownMenuLink";
                newAnchor.className = "nav-link dropdown-toggle";
                newAnchor.innerHTML = newCategory.product_category_name;
                newAnchor.setAttribute("href", "#");
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
        createNavigationBody : function(category) {
            for (i = 0; i < category.length; i++) {
                let nextCategory = category[i];

                let form_data = new FormData();
                form_data.append("categoryID", nextCategory.product_category_id);                

                axios.post('http://localhost/onlineStoreApi/productBrand.php?crud=readByCategory', form_data) 
                .then(function (response) {
                    // handle success                    
                    this.brandList = response.data.brand;
                    frmHeaderDropdown.createNavigationBodyElement(nextCategory.product_category_id, nextCategory.product_category_name, this.brandList);
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
        createNavigationBodyElement : function(categoryID, categoryName, brand) {

            const newDiv = document.createElement('div');

            newDiv.id = "menu" + categoryName;
            newDiv.setAttribute("brandID" , categoryName);
            newDiv.className = "dropdown-menu";
            newDiv.setAttribute("aria-labelledby", "navbarDropdownMenuLink");

            document.getElementById(categoryID).append(newDiv);

            let brandAll = { product_brand_id : "0", product_brand_name : "All" };
            brand.unshift(brandAll);

            for (i = 0; i < brand.length; i++) {
                let nextBrand = brand[i];                
                
                const newAnchor = document.createElement('a');

                newAnchor.className = "dropdown-item";
                newAnchor.innerHTML = nextBrand.product_brand_name;
                newAnchor.setAttribute("href", "");

                document.getElementById("menu" + categoryName).append(newAnchor);
            }
        }
    },
    //Run the functions on start
    created : function() {
        this.getCategories();
    },
    //Continiously run these functions
    mounted() {
        
    }
})
