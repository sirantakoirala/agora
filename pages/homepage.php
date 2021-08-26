<?php
session_start();

if (!$_SESSION['email']) {

    header("Location: ../index.php"); //redirect to the login page to secure the welcome page without login access.  
}

?>

<html>
 <head>
    <meta name="viewport" content="initial-scale = 1.0,maximum-scale = 1.0">
     <title>Agora</title>
     <link href="../styles/main.css" rel="stylesheet">   
 </head>   
    <body>
        <div class="container">
            <header>
               <div class="logo">
                    <img src="../pictures/logo.png" class="logo" >
                </div>
                <h1> Agora </h1>
                <div class ="uicon">
                    <img src="user icon.png" class="uicon" float="left">
                </div>
            </header>
              <section>
                <div class="menu">`
                    <ul>
                        <li> 
                            <a herf="Home.html">Home</a>
                         </li>    
                         <li>
                             <a herf=""> Quizes</a> 
                         </li>
                        <li>
                             <a herf="">My courses</a>   
                         </li>

                         
                                  
                    </ul> 
                 </div>
                </nav>
                 <div class ="feeds">
                
                </div>
            </section>
     
            <h1>Welcome</h1><br>
            <?php
                echo $_SESSION['email'];
            ?>
            <h1><a href="../php/logout.php">Logout here</a> </h1>
     
            <footer>

            </footer>
            
        </div>
        
       
    </body> 
    
</html>
