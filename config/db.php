<?php


function connectToDB()
 {
 $dbhost = "localhost";
 $dbuser = "root";
 $dbpass = "";
 $db = "agora";
 
 $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$db) or die("Connect failed: %s\n". $conn -> error);
 
 return $conn;
 }
 
function closeDB($conn)
 {
 $conn -> close();
 }
