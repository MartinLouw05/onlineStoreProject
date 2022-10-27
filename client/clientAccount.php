<?php include '../client/clientHeader.php'; ?>

    <form method='post' class='frmAccInfo'>
        <div class='accInfo'>
            <div>
                <h2>Account Information</h2>
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
                <input type='password' id='clientPassword' name='clientPassword' title='&#128712 Passwords must consist of at least 8 characters' class='form-control'>
            </div>
            <div>
                <label>Re-enter Password:</label>
            </div>
            <div>
                <input type='password' id='clientReEnterPassword' name='clientReEnterPassword' class='form-control'>
            </div>
            <div>
                <button id='btnUpdateSubmit' name='btnUpdateSubmit' class='btnUpdateSubmit'>Update Account Information</button>
                <button id='btnCancelSubmit' name='btnCancelSubmit' class='btnCancelSubmit'>Return to Previous Screen</button>
            </div>
        </div>
    </form>

<?php include '../client/clientFooter.php'; ?>