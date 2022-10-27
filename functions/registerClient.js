//const { default: axios } = require("axios");

//User Class
class User {
    constructor(name, surname, dob, contact, email, password) {
        this._name = name;
        this._surname = surname;
        this._dob = dob;
        this._contact = contact;
        this._email = email;
        this._password = password;
    }

    get name() {
        return this._name;
    }
    set name(text) {
        if (typeof text == "string") {
            this._name = text;
        }
        else {
            //Value is not of type string
        }
    }

    get surname() {
        return this._surname;
    }
    set surname(text) {
        if (typeof text == "string") {
            this._surname = text;
        }
        else {
            //Value is not of type string
        }
    }

    get dob() {
        return this._dob;
    }
    set dob(text) {
        if (typeof text == "string") {
            this._dob = text;
        }
        else {
            //Value is not of type string
        }
    }

    get contact() {
        return this._contact;
    }
    set contact(text) {
        if (isNaN(text)) {
            //Value is not of type number
        }
        else {      
            this._contact = text;
        }
    }

    get email() {
        return this._email;
    }
    set email(text) {
        if (typeof text == "string") {
            this._email = text;
        }
        else {
            //Value is not of type string
        }
    }

    get password() {
        return this._password;
    }
    set password(text) {
        if (typeof text == "string") {
            this._password = text;
        }
        else {
            //Value is not of type string
        }
    }

    //Create New User
    createNewUser(data) {
        /*axios.post('http://localhost:3000/users', {
                name : data.name,
                surname : data.surname,
                dateOfBirth : data.dob,
                contact : data.contact,
                email : data.email,
                password : data.password
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });*/
    }
}

//Create New User
let frmRegistration = new Vue ({
    el : '#frmRegistration',
    data : {
        newUser : { name : "", surname : "", dob : "", contact : "", email : "", password : "" }
    },
    //Functionality
    methods : {
        navigateToSignIn : function() {
            window.location.href = 'signIn.html';
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
            }
            else if (userContact.length !== 10) {
                alert("Please Ensure that your Contact Number is 10 characters");
            }
            else if (!userEmail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                alert("Please Ensure that your Email Address is in the Correct Format");
            }
            else if (userPassword.length < 8) {
                alert("Please Ensure that your Password is at least 8 characters");
            }
            else if (userPassword == userRePassword) {
                this.saveNewUser();
                event.preventDefault();
            }
            else {
                alert("Please Ensure that the Entered Passwords Match");
            }            
        },
        saveNewUser : function() {
            var userData = frmRegistration.toFormData(frmRegistration.newUser);

            axios.post('http://localhost/onlineStoreApi/client.php?crud=create', userData)
            .then(function(response){
                console.log(response);
                frmRegistration.newUser = { name : "", surname : "", dob : "", contact : "", email : "", password : "" };

                if (response.data.error) {
                    alert(response.data.message);
                }
                else {
                    alert(response.data.message);
                }
            });
        },
        toFormData : function(userObj) {
            var form_data = new FormData();
            for (var key in userObj) {
                console.log(key, userObj[key]);
                form_data.append(key, userObj[key]);
            }
            console.log(form_data);
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

//import axios from 'axios';
//const axios = require('axios').default;

//Navigation Variables
let btnBats = document.getElementById('btnBats');
let btnSignIn = document.getElementById('btnSignIn');

function test() {
axios.get('http://localhost:3000/users')
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

function test1() {
    axios.post('http://localhost:3000/users', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
