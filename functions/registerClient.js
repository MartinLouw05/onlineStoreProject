
let frmRegistration = new Vue ({
    el : '#frmRegistration',
    data : {
        newUser : { name : "", surname : "", dob : "", contact : "", email : "", password : "" }
    },
    //Functionality
    methods : {
        //Navigation
        navigateToSignIn : function() {
            window.location.href = 'signIn.html';
        },
        navigateToLandingPage : function() {
            window.location.href = '../landingPage.html';
        },
        //Validate User Input
        validateUser : function() {           
            let userName = document.getElementById("clientName").value;
            let userSurname = document.getElementById("clientLastName").value;
            let userDob = document.getElementById("clientDoB").value;
            let userContact = document.getElementById("clientContact").value;
            let userEmail = document.getElementById("clientEmail").value;
            let userPassword = document.getElementById("clientPassword").value;
            let userRePassword = document.getElementById("clientReEnterPassword").value;

            if (userName == "" || userSurname == "" || userDob == "" || userContact == "" || userEmail == "" || userPassword == "" || userRePassword == "") {
                alert("Please Ensure that All Fields have been Filled");
                event.preventDefault();
            }
            else if (userContact.length !== 10) {
                alert("Please Ensure that your Contact Number is 10 characters");
                event.preventDefault();
            }
            else if (!userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                alert("Please Ensure that your Email Address is in the Correct Format");
                event.preventDefault();
            }
            else if (userPassword.length < 8) {
                alert("Please Ensure that your Password is at least 8 characters");
                event.preventDefault();
            }
            else if (userPassword !== userRePassword) {
                alert("Please Ensure that the Entered Passwords Match");   
                event.preventDefault();             
            }
            else if (userPassword == userRePassword) {
                this.saveNewUser();
                event.preventDefault();
            }  
            else {
                alert("Something Went Wrong While Attempting to Save the User's Information");
                event.preventDefault();
            }          
        },
        saveNewUser : function() {
            var userData = frmRegistration.toFormData(frmRegistration.newUser);

            axios.post('http://localhost/onlineStoreApi/client.php?crud=create', userData)
            .then (function(response) {
                // console.log(response);
                frmRegistration.newUser = { name : "", surname : "", dob : "", contact : "", email : "", password : "" };

                if (response.data.error) {
                    alert(response.data.message);
                }
                else {
                    alert(response.data.message);
                    window.location.href = "signIn.html";
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
        }
    },
    //Run the functions on start
    created : function() {
        
    },
    //Continiously run these functions
    mounted() {
        
    }
})
