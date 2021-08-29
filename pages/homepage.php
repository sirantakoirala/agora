<?php
session_start();

if (!$_SESSION['email']) {

    header("Location: ../index.php"); //redirect to the login page to secure the welcome page without login access.  
}

?>

<!DOCTYPE html>
<html>
 <head>
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
     <title> Agora</title>
     <link href="../styles/main.css" rel="stylesheet">   
     <link href="../pictures/logo.png" rel="icon">
 </head>   

 

  <style>
  .agora {
    margin-left: 41px;
    font-size: 45;
    font-size: 40px;
    font-family: serif;
  }
  
  </style>
        


    
        
    <body>
    

        <div class="container">
            <header>
               <div class="logo">
                    <img src="../pictures/logo5.png" class="logo" >
                </div>
                <div clas="agora">
                <h1 class="agora"> Agora </h1>
                </div>
                <div class ="uicon">
                    <img src="../pictures/uicon.png" class="uicon" float="left">
                    
                </div>
                <p class="welcome">Welcome</p><br>
                <p class="display-email"><?php
                echo $_SESSION['email'];
             ?> </p>

        <a class="logout" href="../php/logout.php">Logout here</a> 

            
            </header>


              <section>
             
              
                <div class="sidebar">
                    <nav>
                        <ul>
                        <li> 
                            <a href="">Quizes</a>
                         </li>    
                         <li>
                             <a href=""> Answers history</a> 
                         </li>
                        <li>
                             <a href="">Question History</a>   
                         </li>
                        </nav>
                        </ul> 
                 </div>
                 <div class="Askquestion"> 
                     <h2>Ask Question</h2> <br>
                 </div>
                    <div class="textarea_container">
                     <textarea id="Ask Question" name="Ask Question" rows="5" cols="100"></textarea>
                     <button>Post</button>
                 
               </section>
               
             
            

            <footer>

            </footer>
            
        
       
    </body> 
    
</html>

