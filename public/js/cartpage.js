function rmCartItemsTable(){
    var itemsTable = document.querySelectorAll(".cartpage .cartpage__content__items");
    itemsTable.forEach(function(e){
        e.remove();
    });
}
rmCartItemsTable();
function delCartItems(cartId){
    for(var j = 0; j < cart.length; j++) {
        if (cart[j].id == cartId) {
            cart.splice(j,1);
            localStorage.setItem("cart", JSON.stringify(cart) || []);
            break;
        }
    }
    updateCartNumber();
    displayCartHeader();
    updateItemsToTable();
    updatePriceAll();
}
function chooseQuatity(id,cb){
    for (let index = 0; index < cart.length; index++) {
        if(cart[index].id == id){
            cart[index].inCart = cb.value;
        }
        localStorage.setItem("cart", JSON.stringify(cart) || []);
        displayCartHeader();
        updateCartNumber();
        updatePriceAll();
    }
}
function updateItemsToTable(){
    if(cart){
        rmCartItemsTable();
        var tbody = document.querySelector(".cartpage__content table tbody");
        for (let index = 0; index < cart.length; index++) {
            tbody.innerHTML += `<tr class="cartpage__content__items">
                    <td>${index+1}</td>
                    <td class="cartpage__img"><img src="${cart[index].image}" alt=""/></td>
                    <td><span>MÁY KHOAN CẮT ĐA NĂNG CNC</span></td>
                    <td><span>${cart[index].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></span></td>
                    <td>
                    <input class="cartpage__count" type="number" name="" min="1" value="${cart[index].inCart}" onchange="chooseQuatity(${cart[index].id},this)"/>
                    </td>
                    <td> <span>${(cart[index].price*cart[index].inCart).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}<sup>đ</sup></span></td>
                    <td> <i class="fas fa-times cartpage__close" onclick="delCartItems(${cart[index].id})"></i></td>
                </tr>`;         
        }
    }
}
updateItemsToTable();
function updatePriceAll(){
    var allPrice = document.getElementById("cartpage__payment__all");
    var vat = document.getElementById("cartpage__payment__vat");
    var payPrice = document.getElementById("cartpage__payment__pay");

    if(cart){
        var all=0;
        for (let index = 0; index < cart.length; index++) {
            all += (cart[index].inCart * cart[index].price);
        }
        allPrice.innerHTML = all.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"<sup>đ</sup>";
        vat.innerHTML = (all/100*10).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"<sup>đ</sup>";
        payPrice.innerHTML = (all + (all/100*10)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")+"<sup>đ</sup>";
    }
}
updatePriceAll();