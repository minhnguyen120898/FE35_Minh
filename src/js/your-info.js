var next = document.getElementById("btn-next");
var nameVal = document.getElementById("uname");
var emailVal = document.getElementById("umail");
var phoneVal = document.getElementById("uphone");
var addressVal = document.getElementById("uaddress");
var typeAddressInputVal;
function fillInfo(){
    var infoLocal = JSON.parse(localStorage.getItem("infoCustomers")) || [];
    if(infoLocal != false){
        nameVal.value = infoLocal[0].name;
        emailVal.value = infoLocal[0].email;
        phoneVal.value = infoLocal[0].phone;
        addressVal.value = infoLocal[0].address;
    }
}
fillInfo();
function checkEnterValue(){
    if(nameVal.value == "" || emailVal.value == "" || phoneVal.value =="" || addressVal.value == ""){
        alert("Vui lòng nhập đầy đủ thông tin!");
    }
    else {
        var infoCustomer = [{
            "name" : nameVal.value,
            "email" : emailVal.value,
            "phone" : phoneVal.value,
            "address": addressVal.value
        }];
        localStorage.setItem("infoCustomers", JSON.stringify(infoCustomer));
        location.replace("./payment.html");
    }
}
next.addEventListener('click',function(){
    if(document.getElementById("ihome").checked){
        typeAddressInputVal = document.getElementById("ihome").value;
    }
    else{
        typeAddressInputVal = document.getElementById("iwork").value;
    }
    checkEnterValue();
});


