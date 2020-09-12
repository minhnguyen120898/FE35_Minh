var cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartNumber(){
    if(cart){
        var sumCart = 0;
        for (var s = 0; s < cart.length; s++) {
            sumCart += cart[s].inCart;
        }
        document.querySelector(".cart .wrapper-badge span").innerHTML = sumCart;
    }

    var sumPrice = 0;
    for (var index1 = 0;  index1 < cart.length;  index1++) {
        sumPrice += cart[index1].price * cart[index1].inCart;
    }
    document.querySelector(".cart__dropdown .justify-flex-end .cart__desc span").innerHTML= sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function rmCartItemsHeader(){
    if(document.querySelectorAll(".cart__item--temporary")){
        document.querySelectorAll(".cart__item--temporary").forEach(function(remove){
            remove.remove();
        });
    }
} 
function displayCartHeader(){
    if(cart){
        rmCartItemsHeader();
        for (var t = 0; t < cart.length; t++) {     
            document.querySelector(".cart .cart__list").innerHTML += `
                        <li class="cart__item cart__item--temporary">
                            <img class="cart-image" src="${cart[t].image}" alt=""/>
                            <div class="cart__desc">
                            <h3>${cart[t].name}</h3>
                            <p><span>${cart[t].inCart}</span> x <span>${cart[t].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</span></p>
                            </div>
                            <div class="cart__close" onclick="deleteCartItems(${cart[t].id})"><i class="fas fa-times"></i></div>
                        </li>`;
        }
    }
}
updateCartNumber();
displayCartHeader();
function deleteCartItems(cartId){
    for(var j = 0; j < cart.length; j++) {
        if (cart[j].id == cartId) {
            cart.splice(j,1);
            localStorage.setItem("cart", JSON.stringify(cart) || []);
            break;
        }
    }
    updateCartNumber();
    displayCartHeader();
}