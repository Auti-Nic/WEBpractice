var objectArray = [];


function processJson(file){
    var cars = file.car;
    var len = cars.length;

    for(var i = 0; i< len;i++){
        var car = new Object();

        car.id = cars[i].id;
        car.category = cars[i].cat;
        car.availability = cars[i].cat;
        car.brand = cars[i].brand;
        car.model = cars[i].model;
        car.modelyear = cars[i].modelyear;
        car.mileage = cars[i].milage;
        car.fueltype = cars[i].fuletype;
        car.seats = cars[i].seats;
        car.priceperday = "$" + cars[i].price;
        car.description = cars[i].description;

        objectArray.push(car);
    }

}
//create rows, append cards to the row, then append row to index.html
function gridDisplay() {

    var len = objectArray.length;
    var rowNum = Math.ceil(len/4);

    var container = document.createElement("div");
    container.className = "container";

    var carsDiv = document.getElementById("carsDiv");

    for(var i=0; i<rowNum; i++){
        var rowLimit = 4*i+4;
        var cardStart = 4*i;

        var row = document.createElement("div");
        row.className = "row";

        for(var j = cardStart; j < rowLimit; j++){

            var col = document.createElement("div");
            col.className = "col-md-3";

            if(j<len) {
                var card = createCard(j);
                col.appendChild(card);
                row.appendChild(col);
            }
        }
        carsDiv.appendChild(row);
    }
}

// create a bootstrap card for a car object
function createCard(num){

    var card = createTag("div","card");
    card.id = objectArray[num].id;

    var img = createTag("img","card-img-top");
    var imgURL = "images/" + objectArray[num].model + ".jpg";
    img.setAttribute("src",imgURL);
    img.alt = objectArray[num].model;

    var cardBody = createTag("div","card-body");

    //title
    var cardTitle = createTag("h5","card-title");
    var titleText = objectArray[num].brand + "-" + objectArray[num].model + "-" + objectArray[num].modelyear;
    var textNode = document.createTextNode(titleText);
    cardTitle.appendChild(textNode);
    cardBody.appendChild(cardTitle);

    //create <p>
    var mileage = createP("mileage: ", objectArray[num].mileage);
    cardBody.appendChild(mileage);

    var fuelType = createP("fuel_type: ", objectArray[num].fueltype);
    cardBody.appendChild(fuelType);

    var seats = createP("seats: ", objectArray[num].seats);
    cardBody.appendChild(seats);

    var price = createP("price_per_day: ", objectArray[num].priceperday);
    cardBody.appendChild(price);

    var availability = createP("availability: ", objectArray[num].availability);
    cardBody.appendChild(availability);

    var description = createP("description: ", objectArray[num].description);
    description.className = "description";
    description.title = "Description";
    cardBody.appendChild(description);

    var button = createTag("a", "btn");
    var buttonText = document.createTextNode("Add to Cart");
    addClass(button, "btn-primary");
    addClass(button, "addbtn");
    button.setAttribute("href","#");
    button.appendChild(buttonText);
    cardBody.appendChild(button);

    card.appendChild(img);
    card.appendChild(cardBody);
    return card;
}

function showDescription() {

   $(".description").mouseover(function () {
       $(this).css("color","blue");
   })
   .mouseout(function () {
       $(this).css("color","black");
   })
   .click(function () {
       alert($(this).find("span").text());
   });

}


function addToCart() {
    $(document).on("click", ".addbtn", function () {
        var id = $(this).parent().parent().attr("id");
        id = Number(id);
        $.ajax("cars.json").done(function (data) {
            var car = data.car[id];
            var availability = car.availability;
            if (availability == true){
                var check = localStorage.getItem(id);
                console.log(localStorage);
                if(check){
                    alert("This item is already in the shopping cart.");
                }else{
                    localStorage.setItem(id,"1");
                    alert("Add to the cart successfully");
                }
            }else{
                alert("The car is not available now. Please try other cars.")
            }
        }).fail(function () {
            alert("failed!")
        });
    });
};

