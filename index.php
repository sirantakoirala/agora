<?php
session_start();
require("./config/db.php");
$conn = connectToDB();

if (isset($_SESSION['authenticated'])) {
  header("Location: ./pages/dashboard.php");
}

if (isset($_POST['login'])) {
  $email  = $_POST['email'];
  $password = $_POST['password'];
  mysqli_real_escape_string($conn, $email);
  mysqli_real_escape_string($conn, $password);
  $query = "SELECT * FROM users WHERE email = '$email'";
  $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
  if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_array($result)) {
      $id = $row['id'];
      $user = $row['username'];
      $pass = $row['password'];
      $email = $row['email'];
      $role = $row['role'];

      if (password_verify($password, $pass)) {
        $_SESSION['id'] = $id;
        $_SESSION['username'] = $user;
        $_SESSION['email']  = $email;
        $_SESSION['role'] = $role;
        $_SESSION['authenticated'] = true;
        header('location: ./pages/dashboard.php');
      } else {
        echo "<script>alert('invalid username/password');
      window.location.href= 'index.php';</script>";
      }
    }
  } else {
    echo "<script>alert('invalid username/password');
      window.location.href= 'index.php';</script>";
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

  <link rel="stylesheet" href="./static/style.css">
  <link href="pictures/logo.png" rel="icon" >
  <title>Agora-Explore Your Knowledge</title>
  </title>
</head>

<body class="registration">
  <div class="container-sm px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
      <div class="row d-flex">
        <div class="col-lg-6">
          <div class="card1 pb-5">
            <div class="row">
             
            </div>
            <div id="mainlogo">
              <img src="./pictures/svg/logo4.svg" class="image" id="mainlogo" style="width: 689px; height: 446px; margin: 1%; margin-top: 10%; ">
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="card2 card border-0 px-4 py-5">
            <div class="row mb-4 px-3">
              <h6 style=" font-family:sans-serif;FONT-SIZE: 36px;">Sign in</h6>

            </div>
            <div class="row px-3 mb-4">
              <div class="line"></div>
              <!-- <small class="or text-center">Login</small> -->
              <div class="line"></div>
            </div>
            <form action="index.php" method="POST">
              <div class="row px-3">
                <label class="mb-1">
                  <h6 style="font-size: 20px; Font-family: sans-serif;">Email Address</h6>
                </label>
                <input class="mb-4" type="text" name="email" placeholder="Enter a valid email address" />
              </div>
              <div class="row px-3">
                <label class="mb-1">
                  <h6  style="font-size: 20px; Font-family: sans-serif;">Password</h6>
                </label>
                <input type="password" name="password" placeholder="Enter password" />
              </div>
              <div class="row px-3 mb-4">
                <!-- <div
                  class="custom-control custom-checkbox custom-control-inline"
                >
                  <input
                    id="chk1"
                    type="checkbox"
                    name="chk"
                    class="custom-control-input"
                  />
                  <label for="chk1" class="custom-control-label text-sm"
                    >Remember me</label
                  >
                </div>
                <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a> -->
              </div>
              <div class="row mb-3 px-3">
                <button type="submit" class="btn-login" name="login" style="width: 28%; border-radius: 8px; font-family: sans-serif; font-size: 20px; background-color: #4A6884; color: azure; height: 39px;">
                  Login
                </button>
              </div>
            </form>
            <div class="row mb-4 px-3">
              <small class="font-weight-bold">Don't have an account?
                <a class="text-danger" href="/qna/register.php">Register</a></small>
            </div>
          </div>
        </div>
      </div>
      <div class="bg" style="background-color:#4A6884;height: 64px">
        <div class="row px-3">
          <small class="footer-text" style="float: right; margin-left: 32%; margin-top: 2%; color:white; font-family: sans-serif; font-size: 18px;">Agora Team © 2021 . All rights reserved.</small>
          <!-- <div class="social-contact ml-4 ml-sm-auto">
              <span class="fa fa-facebook mr-4 text-sm"></span>
              <span class="fa fa-google-plus mr-4 text-sm"></span>
              <span class="fa fa-linkedin mr-4 text-sm"></span>
              <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span>
            </div> -->
        </div>
      </div>
    </div>
  </div>
</body>

</html>
