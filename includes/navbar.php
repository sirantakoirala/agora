<?php
session_start();
include('../config/db.php');
if (isset($_SESSION['authenticated'])) {
} else {
  echo "<script>alert('you need to login first');
    window.location.href='../index.php';</script>";
}

?>
<style>


.dropdown {
  position: relative;
  display: inline-block;
  float: right;
  margin-top: -2%;
}

.dropbtn {
  background-color: #4A6884;;
  color: white;
  padding: 16px;
  font-size: 16px;
 
  border: none;
    padding: 0;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {  background-color: #4A6884;
}
  </style>

<header>
  <div id="logo">
          <img src="../pictures/svg/logo3.svg" id="logo">
      </div>
      <div id="uicon">
      <img src="../pictures/svg/uicon.svg" id="uicon">
</div>
<div id= "Welcome">
<h1 style="font-size: 20px; float: right; color: azure; margin-top: -35px; margin-right: 134px;">Welcome, <?php echo $_SESSION["username"] ?></h1>
</div>   
<div class="dropdown">
  <button class="dropbtn"><img src="../pictures/svg/dropdown.svg" ></button>
  <div class="dropdown-content">
    <a href="#">Profile</a>
    <a href="/qna/logout.php">Logout</a>
    
  </div>
</div>

 


     
    
    

   