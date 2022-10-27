<!DOCTYPE html>
<html>
	<head>
		<title>Cricker Direct Sign In</title>

		<?php session_start(); ?>
        <script type='module' src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
		<link rel='stylesheet' type='text/css' href='../css/startUp.css'>			
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
                        <h2>Sign In</h2>
                    </div>
                    <div>
                        <label>Email:</label>
                    </div>
                    <div>
                        <input type='email' id='signInEmail' name='signInEmail' class='form-control'>
                    </div>
                    <div>
                        <label>Password:</label>
                    </div>
                    <div>
                        <input type='password' id='signInPassword' name='signInPassword' class='form-control'>
                    </div>
                    <div>
                        <button id='btnSignInSubmit' name='btnSignInSubmit' class='btnSignInSubmit'>Continue</button>
                    </div>
                    <div>
                        <p>
                            By continuing, you agree to Cricket Direct's <a>Terms and Conditions</a> and <a>Privacy Notice</a>.
                        </p>
                    </div>
                    <div>
                        <button id='btnForgotPassword' name='btnForgotPassword' class='btnForgotPassword'> &#10148 Forgot your Password?</button>
                    </div>
                </div>
                <div class='registerInfo'>
                    <label>--- Don't Have An Account? ---</label>
                </div>
                <div class='signInRegister'>
                    <button id='btnSignInCreate' name='btnSignInCreate' class='btnSignInCreate'>Create a Cricket Direct Account</button>
                </div>                
            </main>
        </form>	
		<footer class='signInFooter'>
			&copy; Created by Pepega
		</footer>
	</body>
</html>