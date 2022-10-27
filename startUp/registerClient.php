<!DOCTYPE html>
<html>
	<head>
		<title>Cricket Direct Registration</title>

		<?php session_start(); ?>
        <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
        <script type='module' src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
		<link rel='stylesheet' type='text/css' href='../css/startUp.css'>			
		<link rel='stylesheet' href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">	
		<?php require ('../functions/funcStartUp.php'); ?>
        <script src='../functions/funcStartUp.js' defer></script>
	</head>
	<body>
        <form id='frmRegistration' class='registrationGrid'>
            <header class='frmRegistration'>
                <div class='registrationHeader'>
                    <h1>Cricket Direct</h1>
                </div>
            </header>
            <main>               
                <div class='registrationMain'>
                    <div>
                        <h2>Create Account</h2>
                    </div>
                    <div>
                        <label>First Name:</label>
                    </div>
                    <div>
                        <input type='text' id='clientName' name='clientName' class='form-control'>
                    </div>
                    <div>
                        <label>Last Name:</label>
                    </div>
                    <div>
                        <input type='text' id='clientLastName' name='clientLastName' class='form-control'>
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                    </div>
                    <div>
                        <input type='date' id='clientDoB' name='clientDoB' class='form-control'>
                    </div>
                    <div>
                        <label>Contact Number:</label>
                    </div>
                    <div>
                        <input type='number' id='clientContact' name='clientContact' class='form-control'>
                    </div>
                    <div>
                        <label>Email:</label>
                    </div>
                    <div>
                        <input type='email' id='clientEmail' name='clientEmail' class='form-control'>
                    </div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input type='password' id='clientPassword' name='clientPassword' class='form-control'>
                    </div>
                    <div class='passwordInfo'>
                        <label>&#128712 Passwords must consist of at least 8 characters.</label>
                    </div>
                    <div>
                        <label>Re-enter Password:</label>
                    </div>
                    <div>
                        <input type='password' id='clientReEnterPassword' name='clientReEnterPassword' class='form-control'>
                    </div>
                    <div>
                        <button id='btnRegistationSubmit' name='btnRegistationSubmit' v-on:click="createUser()" class='btnRegistationSubmit'>Continue</button>
                    </div>
                    <div>
                        <p>
                            By continuing, you agree to Cricket Direct's <a>Terms and Conditions</a> and <a>Privacy Notice</a>.
                        </p>
                    </div>
                </div>
                <div class='signInInfo'>
                    <label>--- Already Have An Account? ---</label>
                </div>
                <div class='registrationSignIn'>
                    <button id='btnRegistrationSignIn' name='btnRegistrationSignIn' class='btnRegistrationSignIn'>Sign In to your Cricket Direct Account</button>
                </div>                
            </main>
        </form>	
		<footer class='signInFooter'>
			&copy; Created by Pepega
		</footer>
	</body>
</html>