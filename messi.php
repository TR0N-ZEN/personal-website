<?php 

$name = $email = $subject = $message = "";

$Errorlist = array(false, false, false, false);

if(isset($_POST["submit"])) {
  if (empty($_POST["name"])) {
    $Errorlist[0] = true;
  } else {
      $name = test_input($_POST["name"]);
      /*
      // check if name only contains letters and whitespace
      if (!preg_match("/^[a-zA-Z]*$/",$name)) {
        $Errorlist[0] = true;
      }
      */
    }
    
  if (empty($_POST["email"])) {
    $Errorlist[1] = true;
  } else {
      $email = test_input($_POST["email"]);
      // check if e-mail address is well-formed
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $Errorlist[1] = true;
      }
    }
    
  if (empty($_POST["subject"])) {
    $Errorlist[2] = true;
  } else {
    $subject = test_input($_POST["subject"]);
    }
    
  if (empty($_POST["message"])) {
    $Errorlist[3] = true;
  } else {
    $message = test_input($_POST["message"]);
    }

  foreach($Errorlist as $Error) {
    if($Error == true) {
      print "<p>Error occured</p>";
    }
  }

  $mailTo = "webmaster@tr-development.org";
  $headers = "from :".$email;
  $text = "You have received an e-mail from" .$name .".\n\n" .$message;

  mail($mailTo, $subject, $text, $headers);
  header("Location: index.php");
}

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>

<form action="messi.php" method="POST">
  <input type="text" name="name" placeholder="NAME"><br>
  <input type="text" name="email" placeholder="YOUR EMAIL"><br>
  <input type="text" name="subject" placeholder="SUBJECT"><br>
  <textarea type="text" name="message" placeholder="YOUR MESSAGE"></textarea><br>
  <button type="submit" name="submit">SEND</button>
</form>