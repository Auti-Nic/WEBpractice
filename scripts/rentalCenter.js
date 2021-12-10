

function read_json(){
    
    $.ajax({
        url: "cars.json", 
        success: function(data){
            cc = data.car;
            setCarList(cc);
        }
    });
}
function setCarList(data){
    cc_list = data;

}
function displayCart() {
    var tbody = document.getElementById("cartList");

    $.ajax("cars.json").done(function(data){
        var idArray = new Array();
        var x = data.car;
        c_list = x;
        for (var i=0; i<x.length; i++){
            var id = x[i].id;
            idArray.push(id);
        }
        for(var i=0; i<localStorage.length; i++){
            var ckey = localStorage.key(i);
            
            ckey = Number(ckey);

            if(idArray.indexOf(ckey) > -1){
                var car = data.car[ckey];
                var row = getCar(ckey, car);

                tbody.appendChild(row);
            }
        }
    })
}

//create a table row for a car in the shopping cart
function getCar(num, object) {


    var model = object.model;
    var modelyear = object.modelyear;
    var brand = object.brand;
    var priceperday = "$"+object.price;
    var quantity = localStorage.getItem(num);
    var tr = document.createElement("tr");
    tr.id = num;

    var td1 = document.createElement("td");
    var img = createTag("img","small");
    var url = "images/" + model + ".jpg";
    img.setAttribute("src",url);
    td1.appendChild(img);

    var td2 = document.createElement("td");
    var text = modelyear + " - " + brand + " - " + model;
    var td2Text = document.createTextNode(text);
    td2.appendChild(td2Text);

    var td3 = document.createElement('td');
    var price = document.createTextNode(priceperday);
    td3.appendChild(price);

    var td4 = document.createElement("td");
    var days = createTag("input","days");
    days.setAttribute("value",quantity);
    td4.appendChild(days);

    var td5 = document.createElement("td");
    var delBtn = createTag("a","btn");
    addClass(delBtn, "btn-primary");
    addClass(delBtn,"del");
    delBtn.href = "#";
    var btnText = document.createTextNode("Delete");
    delBtn.appendChild(btnText);
    td5.appendChild(delBtn);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    return tr;
}

function delCar(){
    $(document).on("click", ".del", function () {
        var row = $(this).parent().parent();
        var id = row.attr("id");
        row.fadeOut();
        row.remove();
        localStorage.removeItem(id);
    });
}

function checkDays() {
    $(document).on("change",".days",function () {
        var days = $(this).val();
        if (days <= 0 || Math.round(days) != days){
            alert("The minimum rental day is 1 day and the number of rental day should be an integer.");
            $(this).val("1");
        }else{
            var id = $(this).parent().parent().attr("id");
            localStorage.setItem(id,days);
        }
    });
}

function checkout() {
    $("#btn-cart").click(function () {
        var items = $("#cartList").find("tr");
        if (items.length == 0){
            alert("No car has been reserved.");
            $(this).attr("href","index.html");
        }else{
            // var storage = localStorage;
            // var list = "";
            // var price = 0;
            // for(var i = 0; i < storage.length; i++){
            //     var key = storage.key(i);
            //     var val = storage.getItem(key);

            //     list = list + key + "," + val + ";";
            //     alert(cc_list[key]);
            //     price = price + cc_list[key].price* Number(val)

            // }   
            $.ajax({
                url: "cars.json", 
                success: function(data){
                    cc = data.car;
                    setPrice(cc);
                }
            });
            document.getElementById("btn-cart").href += String(localStorage.getItem("price"));

        }
    })
}

function removePrice(){
    localStorage.removeItem("price");
}

function setPrice(data){
    var storage = localStorage;
    var price = 0;
     
    for(var i = 0; i < storage.length;i++){
        var key = Number(storage.key(i));
        var val = Number(storage.getItem(i));

        price = price + data[key].price*val;
    }
    localStorage.setItem("price",price);
}

function checkForm(){
    if(checkBlanks()){
        alert("Please fill all the compulsory fields")
        return false;
    }

    if(checkEmail()){
        alert("Please use a validated email address")
        return false;
    }
    return true;
}

function checkBlanks() {

    var fields = new Array("name","email","address","suburb","state","postcode");

    for(var i = 0; i < fields.length; i++){
        var a_field = document.getElementById(fields[i]);
        if (a_field.value == "" || a_field == null){
            return true;
        }
    }
    return false;
}

function checkEmail() {

    var addr = document.getElementById("email").value;
    var atpos = addr.indexOf("@");
    var dotpos = addr.indexOf(".");

    if(atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= addr.length){
        return true;
    }
    return false;
}

function clearStorage() {
        localStorage.clear();
}



