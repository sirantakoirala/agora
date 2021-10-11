<?php
session_start();
require("./config/db.php");
$conn = connectToDB();

if (isset($_SESSION['authenticated'])) {
  header("Location: /agora/pages/dashboard.php");
}

if (isset($_POST['register'])) {


  $email  = $_POST['email'];
  $confirmPass = $_POST['confirmPassword'];
  $pass = $_POST['password'];
  $username = $_POST['username'];
  if ($email == "" || $pass == "" || $username == "") {
    echo "<script>alert('Fields should not be empty');window.location.href='register.php'</script> ";

    exit();
  }
  if ($pass != $confirmPass) {
    echo "<script>alert('Password doesnt match');window.location.href='register.php'</script> ";
    exit();
  }

  // Validate password strength
  $uppercase = preg_match('@[A-Z]@', $pass);
  $lowercase = preg_match('@[a-z]@', $pass);
  $number    = preg_match('@[0-9]@', $pass);
  $specialChars = preg_match('@[^\w]@', $pass);

  if (!$uppercase || !$lowercase || !$number || !$specialChars || strlen($pass) < 8) {
    echo "<script>alert('Password should be at least 8 characters in length and should include at least one upper case letter, one number, and one special character.'); window.location.href='register.php';</script>";
    exit();
  }



  $checkEmailQuery = "SELECT email from users where email = '$email'";
  $emailResult = mysqli_query($conn, $checkEmailQuery) or die(mysqli_error($conn));
  if (mysqli_num_rows($emailResult) == 1) {
    echo "<script>alert('Email already in use.');
  window.location.href='register.php';</script>";
    exit();
  }
  //   if(!valid_pass($pass)){
  //     echo "<script>alert('Password doesnt meet the requirement contain at least (1) upper case letter ,contain at least (1) lower case letter ,contain at least (1) number or special character,contain at least (8) characters in length');window.location.href='register.php'</script> ";
  //     exit();

  //   }

  $password = password_hash("$pass", PASSWORD_DEFAULT);

  mysqli_real_escape_string($conn, $username);
  mysqli_real_escape_string($conn, $password);
  mysqli_real_escape_string($conn, $email);
  $query = "INSERT INTO `users`(`id`, `username`, `email`, `password`, `role`) VALUES (DEFAULT,'$username','$email','$password','student')";
  $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
  if (mysqli_affected_rows($conn) > 0) {
    echo "<script>alert('SUCCESSFULLY REGISTERED');
    window.location.href='register.php';</script>";
  } else {
    echo "<script>alert('Error Occured');</script>";
  }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous" />
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <link rel="stylesheet" href="./static/style.css" />
  <title>Agora - Register Yourself</title>
</head>

<body class="registration">

  <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
           
            <div class="reglogo">
              <img src="./pictures/svg/logo4.svg" class="reglogo" style="margin: 10%; margin-left: 32%">
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">
            <div class="row mb-4 px-3">
              <h6 style=" font-family:sans-serif;FONT-SIZE: 36px;">Sign Up </h6>

            </div>
            <div class="row px-3 mb-4">
              <div class="line"></div>
              <!-- <small class="or text-center">Login</small> -->
              <div class="line"></div>
            </div>
            <form action="register.php" method="POST">
              <div class="row px-3">
                <label class="ufield">
                  <h6 style="font-size: 30px; Font-family: sans-serif;">Username</h6>
                </label>
                <input class="ufield" type="text" name="username" placeholder="Enter your Username" style="height: 78px; font-size: 30px;">
              </div>
              <div class="row px-3">
                <label class="fnfield">
                  <h6 style="font-size: 30px; Font-family: sans-serif;">First name</h6>
                </label>
                <input class="fnfield" type="text" name="fname" placeholder="Enter your first name" style="height: 78px; font-size: 30px;">
              </div>
              <div class="row px-3">
                <label class="lnfield">
                  <h6 style="font-size: 30px; Font-family: sans-serif;">Last name</h6>
                </label>
                <input class="lnfield" type="text" name="lname" placeholder="Enter your last name" style="height: 78px; font-size: 30px;">
              </div>
              <div class="row px-3">
                <label class="efield">
                  <h6 style="font-size: 30px; Font-family: sans-serif;">Email Address</h6>
                </label>
                <input class="enfield" type="email" name="email" placeholder="Enter a valid email address" style="height: 78px; font-size: 30px;">
              </div>
              <div class="row px-3">
                <label class="pwfield">
                  <h6 style="font-size:30px; Font-family: sans-serif;">Password</h6>
                </label>
                <input class="pwfield" type="password" name="password" placeholder="Enter password" style="height: 78px; font-size: 30px;">
              </div>

              <div class="row px-3">
                <label class="cpwfield">
                  <h6 style="font-size: 30px; Font-family: sans-serif;">Confirm Password</h6>
                </label>
                <input class="cpwfield" type="password" name="confirmPassword" placeholder="confirm password" style="height: 78px; font-size: 30px;">
              </div>





              <div class="row px-3 mb-4">

              </div>
              <div class="registerbutt">
                <button type="submit" class="registerbutt" name="register" style="width: 24%;; border-radius: 8px; font-family: sans-serif; font-size: 25px; background-color: #4A6884; color: azure; height: 51px;">
                  Register
                </button>
              </div>
            </form><br>
            <div class="alreadyhaveacc">
              <small class="alreadyhaveacc" style="font-family: sans-serif; font-size: 24px;">Already have an account?
                <a class="text-danger" href="/qna/">Login</a></small>
            </div>
          </div>
        </div>
      </div>
      <div class="bg" style="background-color:#4A6884;    background-color: #4A6884;height: 89px;">
        <div class="row px-3">
          <small lass="footer-text" style="float: right; margin-left: 41%; margin-top: 1%;; color:white; font-family: sans-serif; font-size: 25px;">Agora Team © 2021.All rights reserved</small>
          <div class="social-contact ml-4 ml-sm-auto">
            <span class="fa fa-facebook mr-4 text-sm"></span>
            <span class="fa fa-google-plus mr-4 text-sm"></span>
            <span class="fa fa-linkedin mr-4 text-sm"></span>
            <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>
