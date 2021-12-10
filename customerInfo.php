<?php
session_start();
$carsArray = $_SESSION['cars'];
// $list = $_GET['data'];


if(!empty($list)){
    $cars = filter(explode(";",$list));
    
    foreach ($cars as $a){
        $id = substr($a,0,2);
        $days = substr($a,3,1);
        $new_car = getCarDetail($id,$days);
        if(is_array($carsArray)){
            $carsArray[$id] = $new_car;
        }else{
            $carsArray = array();
            $carsArray[$id]=$new_car;
        }
    }}
$_SESSION['cars'] = $carsArray;

$total = 0;
foreach ($carsArray as $id=>$field){
    $days = (int)$field['days'];
    $price =(float)$field['price'];
    $total = $total + $days*$price;
}
$_SESSION['total']=$total;


function getCarDetail($id, $quantity){
    $doc = file_get_contents("cars.json");
    $data = json_decode($doc, true);
    $a_car = $data->car;

    $brand = $a_car -> brand;
    $model = $a_car -> move_uploaded_file;
    $modelyear = $a_car -> modelyear;
    $fuelType = $a_car -> fuletype;
    $mileage = $a_car -> milage;
    $seats = $a_car -> seats;
    $price = $a_car -> price;
    $description = $a_car -> description;
    $days = $quantity;
    $title = $brand."-".$model."-".$modelyear;

    $carDetail = array("id"=>$id, "title"=>$title, "mileage"=>$mileage, "seats"=>$seats,
        "fueltype"=>$fuelType, "price"=>$price, "days"=>$days, "description"=>$description);
    return $carDetail;
}

function filter($array){
    for($i=0;$i<count($array);$i++){
        if($array[$i]==null){
            unset($array[$i]);
        }
    }
    return $array;
}
?>
<html>
    <head>
        <title>Customer Form</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <link rel="stylesheet" href="stylesheet.css">
    </head>
    <body>
        <div class="title" id="rentalTitle">
            <p>Car Rental Center</p>
        </div>

            <form action="mail.php" method="POST" onsubmit="return checkForm()">

                <h3>Contact Details</h3>

                <div class="form-group">
                    Please fill in all your details. &nbsp;
                    <span style="color: red">*</span>&nbsp;indicates required field.
                </div>

                <div class="form-group">
                    <label for="Name">Full Name <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="name">
                </div>

                <div class="form-group">
                    <label for="Email">Email <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="email" name="email" placeholder="uts@example.com">
                </div>

                <div class="form-group">
                    <label for="address">Address <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="address" name="address" placeholder="123 Maroubra Pde">
                </div>

                <div class="form-group">
                    <label for="suburb">Suburb <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="suburb" name="suburb" placeholder="Maroubra">
                </div>

                <div class="form-group">
                    <label for="state">State <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="state" name="state" placeholder="NSW">
                </div>

                <div class="form-group">
                    <label for="postcode">Post Code <span style="color: red">*</span></label>
                    <input type="text" class="form-control" id="postcode" name="postcode" placeholder="0000">
                </div>

                <div class="form-group">
                    <label for="payment">Payment Type <span style="color: red">*</span></label>
                    <select id="payment" class="form-control">
                        <option value="Visa">Visa</option>
                        <option value="MasterCard">MasterCard</option>
                        <option value="AmericanExpress">AmericanExpress</option>
                        <option value="UnionPay">UnionPay</option>
                        <option value="JBC">JBC</option>
                    </select>
                </div>

                <div>
                    Total amount: <?php echo " $".$_GET['amount']?>
                    <button type="submit" class="btn btn-primary" id="subInfo" onclick="clearStorage()">Booking</button>
                    <a href="index.php" class="btn btn-primary" target="_blank" onclick="clearStorage()">Continue Selection</a>
                </div>

            </form>


        <script
                src="https://code.jquery.com/jquery-3.4.1.min.js"
                integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                crossorigin="anonymous"></script>
        <script
                src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
                integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
                crossorigin="anonymous"></script>

        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="scripts/rentalCenter.js"></script>

    </body>
</html>
