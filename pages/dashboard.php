<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Dashboard</title>
  <link href="../styles/main1.css" rel="stylesheet"> 
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
</head>
<style>
    h1 {
      text-decoration: none;
    color: black
    }
  </style>

<body>
  <?php include("../includes/navbar.php") ?>
  <?php
  $conn = connectToDB();

  // require("../config/db.php");
  if (isset($_POST["addTopic"])) {
    $topic = $_POST["topic"];
    $userId =  $_SESSION['id'];

    $query = "INSERT INTO `topics`(`topic_id`, `topic_subject`, `topic_date`, `topic_by`) VALUES (default,'$topic',default,'$userId')";
    $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
    header("Location: ./dashboard.php");
  }

  ?>
  
  
  <main style="padding-top: 70px; padding-top: 70px; margin-left: 10%;    margin-top: -1%;">

 

      
      <div class="sidebar_1">
         <nav>
             <ul>
                <li> 
                    <a href="../php/quizes.php">Quizes</a>
                 </li>    
                <li>
                    <a href=""> Answers history</a> 
                 </li>
                <li>
                    <a href="">Question History</a>   
                </li>
                </ul> 
          </nav>
                        
     </div>
   
    </div>
    <div class="container">
      

      <form method="POST" action="./dashboard.php">
        <div class="form-row">
          <div class="col-md-4 mb-3"> <label for="topic" style="font-size: 45px; margin-top: -47px;">Ask Question</label>
            <input type="text" class="form-control is-valid" name="topic" id="topic" placeholder="Add a topic" style="height: 81px; width: 176%; border-color: black; border-radius: 10px;">

          </div>

        </div>
        <div class="form-row">
          <div class="col-md-4 mb-3"> <button class="btn btn-success" type="submit" name="addTopic" style= "float: right; margin-right: -74%; margin-top: -13px; background-color: #4a6884; border-color: black">Add topic</button></div>

        </div>
      </form>
     


      <?php
      function console_log($output, $with_script_tags = true)
      {
        $js_code = 'console.log(' . json_encode($output, JSON_HEX_TAG) .
          ');';
        if ($with_script_tags) {
          $js_code = '<script>' . $js_code . '</script>';
        }
        echo $js_code;
      }


      $query = "SELECT t.*,u.username FROM topics t JOIN users u ON u.id = t.topic_by";
      $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
      if (mysqli_num_rows($result) > 0) {
        while ($row = mysqli_fetch_array($result)) {
          $topic_subject = $row['topic_subject'];
          $user = $row["username"];
          $id = $row["topic_id"] ?? "";
          $date = $row["topic_date"];
      ?>

          <div class="outerborder" style=" max-width:100%; margin:20px 0;border-color:black; border: solid 1px; border-radius: 28px;" > 
            <div class="divider" style="padding: .75rem 1.25rem; margin-bottom: 0;background-color: rgba(0,0,0,.03); border-bottom: 1px solid rgba(0,0,0,.125); border-color: black;" >
              <h1><a href="/qna/pages/posts.php?topic_id='<?php echo $id; ?>'"><?php echo $topic_subject;  ?></a></h1>
            </div>
            <div class="card-body text-primary">
              <h5 class="card-title">Created By: <?php echo $user ?></h5>
              <p class="card-text">Created on: <?php echo $date ?>.</p>
            </div>
          </div>



      <?php         }
      };
      ?>
    </div>
  </main>
</body>

</html>
