<html>  
<head lang="en">  
    <meta charset="UTF-8">  
    <link type="text/css" rel="stylesheet" href="bootstrap-3.2.0-dist\css\bootstrap.css">  
    <title>Registration</title>  
</head>  
<style>  
    .login-panel {  
        margin-top: 150px;  
    }

    fieldset {
        width: 550px;
        margin-left: 400;
    }
    
    .username {
        margin-bottom: 10px;
        margin-left: 77px;
        font-size: 18px;
    }


    .email{
        margin-bottom: 10px;
        margin-left: 77px;
        font-size:18px;
    }

    .password{
        margin-bottom: 10px;
        margin-left: 77px;
        font-size:18px;
    }

    .btn-register {
        margin-left: 77px;
        font-size: 15px;
        margin-left: 112px;
    }
    
    .panel-title{
        font-size: 25px;
    margin-left: 606px;
    margin-bottom: 10px;
    }

    hr {
        width: 900px;
        margin-left: 226px;
    }
    
    .login-panel{
        margin-top: 44px;
    }

    b{
        margin-left: 57px;
        font-size: 15px;
    font-family: sans-serif;
    }

    a {
        margin-left: 33px;
    }


    .iibit-logo{
        height: 50px;
    width: 100px;
    margin-left: 25px;
    margin-top: 6px;
    }

    

</style>  
<body>  
<img src="../pictures/IIBIT.jpg" class="iibit-logo">
            
  
<div class="container"><!-- container class is used to centered  the body of the browser with some decent width-->  
    <div class="row"><!-- row class is used for grid system in Bootstrap-->  
        <div class="col-md-4 col-md-offset-4"><!--col-md-4 is used to create the no of colums in the grid also use for medimum and large devices-->  
            <div class="login-panel panel panel-success">  
                <div class="panel-heading">  
                    <h3 class="panel-title">Registration</h3>  
                </div>  
                <hr> </hr>
                <div class="panel-body">  
                    <form role="form" method="post" action="registration.php">  
                        <fieldset>  
                            <div class="username">  
                                <input class="username" placeholder="Username" name="name" type="text" autofocus>  
                            </div>  
  
                            <div class="email">  
                                <input class="email" placeholder="E-mail" name="email" type="email" autofocus>  
                            </div>  
                            <div class="password">  
                                <input class="password" placeholder="Password" name="pass" type="password" value="">  
                            </div>  
  
                            <div class="btn-register">
                            <input class="btn-register" type="submit" value="Register" name="register" >  
                            </div>
                        </fieldset>  
                    </form>  
                    <center>
                        <b>Already registered ?</b> <br></b>
                        <a href="../index.php">Login here</a></center><!--for centered text-->  
                </div>  
            </div>  
        </div>  
    </div>  
</div>  
  
</body>  
  
</html>  
  
<?php  
  
include("db_conection.php");//make connection here  
if(isset($_POST['register']))  
{  
    $user_name=$_POST['name'];//here getting result from the post array after submitting the form.  
    $user_pass=$_POST['pass'];//same  
    $user_email=$_POST['email'];//same  
  
  
    if($user_name=='')  
    {  
        //javascript use for input checking  
        echo"<script>alert('Please enter the name')</script>";  
exit();//this use if first is not work then other will not show  
    }  
  
    if($user_pass=='')  
    {  
        echo"<script>alert('Please enter the password')</script>";  
exit();  
    }  
  
    if($user_email=='')  
    {  
        echo"<script>alert('Please enter the email')</script>";  
    exit();  
    }  
//here query check weather if user already registered so can't register again.  
    $check_email_query="select * from users WHERE user_email='$user_email'";  
    $run_query=mysqli_query($dbcon,$check_email_query);  
  
    if(mysqli_num_rows($run_query)>0)  
    {  
echo "<script>alert('Email $user_email is already exist in our database, Please try another one!')</script>";  
exit();  
    }  
//insert the user into the database.  
    $insert_user="insert into users (user_name,user_pass,user_email) VALUE ('$user_name','$user_pass','$user_email')";  
    if(mysqli_query($dbcon,$insert_user))  
    {  
        echo"<script>window.open('../pages/homepage.php','_self')</script>";  
    }  
} 
?> 
