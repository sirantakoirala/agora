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

<body>
    <?php include("../includes/navbar.php") ?>
    <?php
    $conn = connectToDB();
    $topic_id = $_GET["topic_id"];


    // require("../config/db.php");
    if (isset($_POST["addPost"])) {
        $post = $_POST["post"];
        $userId =  $_SESSION['id'];

        $query = "INSERT INTO `posts`(`post_id`, `post_content`, `post_date`, `post_topic`, `post_by`) VALUES (default,'$post',default,$topic_id,'$userId')";
        $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
        header("Location: ./posts.php?topic_id=$topic_id");
    }

    ?>

    <main style="padding-top: 70px;">
        <div class="container">

            <h1>Post Page</h1>

            <?php

            $query = "SELECT * FROM topics  WHERE topic_id=$topic_id";
            $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_array($result)) {
                    $topic_subject = $row['topic_subject'];

            ?>
                    <div class="alert alert-dark" role="alert">
                        <?php echo $topic_subject ?>
                    </div>


            <?php }
            } ?>
            
             <form method="POST" action="./posts.php?topic_id=<?php echo $topic_id ?>">
                <div class="form-row">
                    <input type="text" class="form-control is-valid" name="post" id="post" placeholder="Add a post" required>

                </div><br>

                <div class="form-row">
                    <div class="col-md-4 mb-3"> <button class="btn btn-success" type="submit" name="addPost">Add a Post</button></div>

                </div>

            </form>

            



            <?php




            $query = "SELECT p.*,u.username FROM users u JOIN posts p on p.post_by = u.id JOIN topics t ON t.topic_id = p.post_topic WHERE t.topic_id = $topic_id";
            $result = mysqli_query($conn, $query) or die(mysqli_error($conn));
            if (mysqli_num_rows($result) > 0) {
                while ($row = mysqli_fetch_array($result)) {

                    $user = $row["username"];
                    $post_content = $row["post_content"];
                    $id = $row["topic_id"] ?? "";
                    $date = $row["post_date"];
            ?>

                    <div class="card border-primary mb-3" style="max-width:100%; margin:20px 0;">
                        <div class="card-header border-success">
                            <h1><?php echo $post_content; ?></h1>
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
