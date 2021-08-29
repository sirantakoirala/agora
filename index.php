<?php
session_start(); //session starts here  

?>

<html>

<head lang="en">
    <meta charset="UTF-8">
    <link type="text/css" rel="stylesheet" href="bootstrap-3.2.0-dist\css\bootstrap.css">
    <title>Login</title>
</head>
<style>

    .iibit-logo{
        height: 50px;
    width: 100px;
    margin-left: 25px;
    margin-top: 6px;
}
    


    .panel-margin-area{
        margin-top: 21px;

    }
    .login-panel {
        margin-top: 150px;
    }


  .panel-heading{
    margin-left: 250px;
  }  

.panel-title{
    font-size: 32px;
   
    margin-bottom: 10px;
    
    margin-left: 384px;

 
}

hr{
    width: 1000;
    margin-top: 13px
    
}
.email {

    margin-left: 95px;
    padding-bottom: 10px;
    width: 65%;
    font-size: 18px;
    Font-family: sans-serif;
}


.password {
    margin-left: 95px;
    padding-bottom: 10px;
    width: 65%;
    font-size: 18px;
    Font-family: sans-serif;
}



.login {
    padding-bottom: 10px;
  
    margin-left: 134px;

    width: 107px;
    font-size: 18px;
    Font-family: sans-serif;
}

p a{ 
    margin-left: 271px;
    font-size: 18px;
    Font-family: sans-serif;
}

fieldset{
   
    float: center;
    position: relative;
    margin-left: 350;
    margin-right: -324px;
    width: 650;
}
</style>

<body>
    <div class="iibit-logo">
    <img src="Pictures/IIBIT.jpg" class="iibit-logo">
    </div>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="panel-margin-area">
                    <div class="panel-heading">
                        <h3 class="panel-title">Sign In</h3>
                       
                    </div>
                    <hr> </hr>
                    <div class="panel-body">
                        <form role="form" method="post" action="index.php">
                                   
                        <fieldset>
                     <div class="email">
                        <input class="email" placeholder="E-mail"  name="email" type="email" autofocus>
                     </div>
                     <div class="password">
                        <input class="password" placeholder="Password" name="pass" type="password" value="">
                    </div>
                    <div class="login"> 
                        <input class="login" type="submit" value="login" name="login" width="90">
                    </div>           
                         <p><a href="php/Registration.php">Register here!</a></p>
                              

                                <!-- Change this to a button or input when using this as a form -->
                                <!--  <a href="index.html" class="btn btn-lg btn-success btn-block">Login</a> -->
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

<?php

include("php/db_conection.php");

if (isset($_POST['login'])) {
    $user_email = $_POST['email'];
    $user_pass = $_POST['pass'];

    $check_user = "select * from users WHERE user_email='$user_email'AND user_pass='$user_pass'";

    $run = mysqli_query($dbcon, $check_user);

    if (mysqli_num_rows($run)) {
        echo "<script>window.open('pages/homepage.php','_self')</script>";

        $_SESSION['email'] = $user_email; //here session is used and value of $user_email store in $_SESSION.  

    } else {
        echo "<script>alert('Email or password is incorrect!')</script>";
    }
}
?>
