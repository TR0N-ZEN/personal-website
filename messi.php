<?php 

if(isset($_POST['submit'])) {
    $name = $_POST['name'];
    $emailFrom = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mailTo = "webmaster@tr-development.org";
    $headers = "from :".$emailFrom;
    $text = "You have received an e-mail from" .$name .".\n\n" .$message;

    mail($mailTo, $subject, $text, $headers);
    header("Location: index.php");
}