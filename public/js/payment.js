// load data from localstorage 
var payment_info = document.querySelector(".payment__content__info");
var infoCustomers = JSON.parse(localStorage.getItem("infoCustomers")) || [];
function showInfo(){
    infoCustomers.forEach(element => {
        payment_info.innerHTML += `
                <div class="payment__content__info__wrap">    
                    <p>Tên khách hàng: <span> ${element.name}</span></p>
                    <p>Số điện thoại: <span>${element.phone}</span></p>
                    <p>Địa chỉ:<span> ${element.address}</span></p>
                    <p>Email:<span> ${element.email}</span></p>
                </div>`;
    });
}
showInfo();
function rmCartItemsTable(){
    var itemsTable = document.querySelectorAll(".payment__content__items");
    itemsTable.forEach(function(e){
        e.remove();
    });
}
rmCartItemsTable();
function updateItemsToTable(){
    if(cart){
        rmCartItemsTable();
        var tbody = document.querySelector(".payment__content__cart ul");
        for (let index = 0; index < cart.length; index++) {
            tbody.innerHTML += `
                    <li class="payment__content__items">
                        <div>
                            <h5>${cart[index].name}</h5>
                            <p><span>${cart[index].inCart}</span> x <span>${cart[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></span></p>
                        </div>
                    </li>`;         
        }
    }
}
updateItemsToTable();
function showAllPrice(){
    var all=0;
    for (let index = 0; index < cart.length; index++) {
        all += (cart[index].inCart * cart[index].price);
    }
    document.getElementById("payment__content__money").innerHTML += all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"<sup>đ</sup>";
}
showAllPrice();
var btn_pre = document.getElementById("btn-pre");
var btn_done = document.getElementById("btn-done");
btn_pre.addEventListener('click',function(){
    location.replace("./your-info.html");
});
btn_done.addEventListener('click',function(){
    localStorage.removeItem("cart");
    location.replace("./index.html");
    alert("Thanh toán thành công!")
});