<!DOCTYPE html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Hertz-uts Homepage</title>
        <link rel="stylesheet" href="stylesheet.css">

    </head>

    <body>

        <div class="title">
            <p id="hertz">Hertz-uts</p>
            <a href="cartPage.html" class="btn btn-primary" id="btn-cart" >Reservation</a>
        </div>

        <div id="carsDiv">

        </div>

        <!--cdn-->
        <script
                src="https://code.jquery.com/jquery-3.4.1.min.js"
                integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
        <script type="text/javascript" src="scripts/supportiveFunc.js"></script>
        <script type="text/javascript" src="scripts/mainPage.js"></script>

        <script>

            if(!jQuery){
                alert("jQuery not is available.")
            }

            $.ajax("cars.json")
                .done(function (data) {

                    processJson(data);
                    gridDisplay();
                    showDescription();
                    addToCart();

                })
                .fail(function () {
                alert("failed");
            });

        </script>

    </body>
</html>