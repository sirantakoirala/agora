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
     <link href="stylish.css" rel="stylesheet">   
 </head>   
    
        


    
        
    <body>
    

        <div class="container">
            <header>
               <div class="logo">
                    <img src="logo.png" class="logo" >
                </div>
                <h1> Agora </h1>
                <div class ="uicon">
                    <img src="user icon.png" class="uicon" float="left">
                </div>
            </header>
              <section>
              <h1>Welcome</h1><br>
             <?php
                echo $_SESSION['email'];
             ?>
            <h1><a href="../php/logout.php">Logout here</a> </h1>
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
