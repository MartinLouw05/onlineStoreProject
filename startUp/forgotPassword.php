<!DOCTYPE html>
<html>
	<head>
		<title>Cricker Direct Password Assistance</title>

		<?php session_start(); ?>
		<link rel='stylesheet' type='text/css' href='../css/landingPage.css'>			
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">	
		<?php require ('../functions/funcStartUp.php'); ?>
	</head>
	<body>
        <form method='post' class='signInGrid'>
            <header class='frmSignIn'>
                <div class='signInHeader'>
                    <h1>Cricket Direct</h1>
                </div>
            </header>
            <main>               
                <div class='signInMain'>
                    <div>
                        <h2>Password Assistance</h2>
                    </div>
                    <div>
                        <p>
                            Please enter the email associated with your account.
                        </p>
                    </div>
                    <div>
                        <label>Email:</label>
                    </div>
                    <div>
                        <input type='email' id='forgotEmail' name='forgotEmail' class='form-control'>
                    </div>
                    <div>
                        <label>Date of Birth:</label>
                    </div>
                    <div>
                        <input type='date' id='forgotDoB' name='forgotDoB' class='form-control'>
                    </div>
                    <div>
                        <button id='btnSignInSubmit' name='btnSignInSubmit' class='btnSignInSubmit'>Continue</button>
                    </div>
                    <div class='forgotInfo'>
                        <label>--- Still Unable to Access your Account? ---</label>
                    </div>
                    <div>
                        <p>
                            If you can't remember your email or you are no longer using the email associated with your account, please contact our <a>Customer Service</a> for assistance with restoring access to your account.
                        </p>
                    </div>
                </div>              
            </main>
        </form>	
		<footer class='signInFooter'>
			&copy; Created by Pepega
		</footer>
	</body>
</html>