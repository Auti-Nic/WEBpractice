<?php
session_start();
//$carArray = $_SESSION['cars'];

$to = $_REQUEST['email'];
$subject = "Booking Confirmation";
$from = "HerzUts@example.com";
$headers = "From: $from";

$txt = "Thank you for renting cars from Hertz-UTS, the total cost is $"
    .$_SESSION['total']
    ."\n\nDetails are as follow:";

foreach ($_SESSION['cars'] as $id=>$field){
    $items = $items."\n\nModel: ".$field['title']
        ."\nmileage: ".$field['mileage']
        ."\nfuel type: $".$field['fueltype']
        ."\nseats: ".$field['seats']
        ."\nprice per day: ".$field['price']
        ."\nrent days: ".$field['days']
        ."\ndescription: ".$field['description'];

}

$txt =$txt.$items;

mail($to, $subject, $txt, $headers);

echo "Your booking confirmation has been sent to ".$to;

session_destroy();
?>