var http = new XMLHttpRequest();
var oldProduct = document.querySelectorAll(".listpage__product__list li");
function clearOldProducts(){
    oldProduct.forEach(function(remove){
        remove.remove();
    });
}
clearOldProducts();
http.open("GET", "http://localhost:3333/products", true);
http.send();
var products = [];
http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        products = JSON.parse(this.responseText);
        renderListProducts(products);
    }
};
var product = document.querySelector(".listpage__product__list");
// Load products in list page
function renderListProducts(products){
    for(var i = 0; i < products.length; i++){
        product.innerHTML += `<li>
        <div class="listpage__product__box clear">
            <div class="listpage__product__img"><img src="${products[i].image}" alt=""/></div>
            <div class="listpage__product__box__content">
                <h3><strong>${products[i].name}</strong></h3>
            <div class="row">
                <div class="col-12"><i class="fas fa-star rated"></i><i class="fas fa-star rated"></i><i class="fas fa-star rated"></i><i class="fas fa-star rated"></i><i class="far fa-star"></i><span class="text-rate">(12 đánh giá)</span>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                <p class="text-secondary">
                    ${products[i].description}
                </p>
                </div>
                <div class="col-12"><span class="product-price-2">${products[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Đ</span></div>
            </div>
            <div class="row pb-3 mt-2">
                <div class="listpage__product__box__btn pl-2"><button class="btn btn-buyNow" onclick="addToCart(${i})">Mua ngay</button></div>
                <div class="listpage__product__box__btn"><a class="btn btn-detail" href="detail.html">Xem chi tiết                                          </a></div>
            </div>
        </div>
        </div>
      </li>`;
    }
}
// End load products in list page
// update cart number 
var cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(OrderNumber){
    var boolean = false;
    for(var j = 0; j < cart.length;j++){
        if(cart[j].id == products[OrderNumber].id){
            cart[j].inCart += 1;
            boolean = true;
            break;
        }
    }
    if(boolean == false){
        cart.push(products[OrderNumber]);
    }
    alert("Đã thêm vào giỏ hàng");
    localStorage.setItem("cart", JSON.stringify(cart) || []);
    displayCartHeader();
    updateCartNumber();
}
// end update cart number 
