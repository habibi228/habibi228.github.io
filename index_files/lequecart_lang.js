createCart();
autoCreatebtn();
var cartWrapper = $(".b-popup");
var cartBody = cartWrapper.find(".b-popup__body");
var cartList = cartBody.find(".b-basket").eq(0);
var cartTotal = cartWrapper.find(".b-basket-total__text--lg");
// var cartTrigger = cartWrapper.children(".cd-cart-trigger");
var cartCount = cartWrapper.find(".cart_count_item");
var cartButton = $("a.cartlequebutton");
var cartBtncount = $(".counter_cartlequebutton");
var addToCartBtn = $(".add-to-cart");
var cartPosit = $(".cart_pos_item");
var cartCheckout = $('.itemcartpay');
cartCheckout.on("click", function(event) {
    console.log("cliecked_cartbtn");
    var products = getAllProducts_LS();
    var items_good = [];
    $.each(products, function() {
        delete this.name;
        delete this.image;
        delete this.price;
        delete this.allcount;
        delete this.minCount;
        items_good.push(this);
    });
    var QQ = JSON.stringify(items_good);
    if ($("input[name='cartItems']").length == 0) {
        $('.formcomposer').append("<input type='hidden' value='" + QQ + "' name='cartItems'>");
    } else {
        $("input[name='cartItems']").val(QQ);
    }
    $('#item-selected').append($(document.createElement("option")).attr("value", '4').text('Корзина товаров'));
    document.getElementById('item-selected').value = 4;
    openMycart();
    var newpay = $('.modalpay').attr('newpay');

    if($('.disableDefaultModal').length != 0){
        return 0;
    }

    if (newpay == '1') {
        var inst = $('[data-remodal-id=setpaidway]').remodal();
        inst.open();
    } else {
        $('#setpaidway').modal('toggle');
    }
});
cartButton.on("click", function(event) {
    event.preventDefault();
    openMycart(1);
});
$(document).on('click', '[data-buywithcart]', function(event) {
    var cartData = $(this);
    var cartB = cartData.data('cart');

    if($("meta[lang_cart]").length == 1){
       cartData.attr('data-price', cartB['price_pp']);
      cartData.attr('data-name', cartB['name_en']);
    }
    else{

        if($("meta[currency_cart]").length == 1){
            cartData.attr('data-price', cartB['price_pp']);
        }
        else{
            cartData.attr('data-price', cartB['price']);
        }

         
          cartData.attr('data-name', cartB['name']);
    }

    autoCreatebtn();
    cartData.attr('data-goodid', cartB['id']);
   
   
    cartData.attr('data-count', cartB['count']);
    cartData.attr('data-min_order', cartB['min_order']);
    addToCart(cartData);
});
addToCartBtn.on("click", function(event) {
    event.preventDefault();
    addToCart($(this));
    $("a.add-to-cart").addClass("size");
    setTimeout(function() {
        $("a.add-to-cart").addClass("hover");
    }, 200);
    setTimeout(function() {
        $("a.add-to-cart").removeClass("hover");
        $("a.add-to-cart").removeClass("size");
    }, 600);
    event.preventDefault();
    event.preventDefault();
});
cartList.on("click", ".b-basket__remove", function(event) {
    event.preventDefault();
    removeProduct($(event.target).parents(".b-basket__item"));
});
cartList.on("click", ".js-minus", function(event) {
    event.preventDefault();
    var $input = $(this).parent().find("input");
    var mCount = parseInt($input.val()) - 1;
    $input.val(mCount);
    quickUpdateCart();
    return false;
});
cartList.on("click", ".js-plus", function(event) {
    event.preventDefault();
    var $input = $(this).parent().find("input");
    var mCount = parseInt($input.val()) + 1;
    $input.val(mCount);
    quickUpdateCart();
});
cartWrapper.on("click", ".b-popup__edit", function(event) {
    event.preventDefault();
    openMycart(1);
});
cartList.on("change", "input", function(event) {
    event.preventDefault();
    quickUpdateCart();
});
$(document).ready(function() {
    console.log("ready_cart");
    fullcart();
});
 
function translateTextcart(id_lang, text) {
    var lang_array = [];
      
    lang_array['cart_name'] = "Корзина";
    lang_array['all_items'] = "Всего позиций в корзине";
    lang_array['all_count_basket'] = "Всего товара в корзине";
    lang_array['count'] = " (шт)";
    lang_array['added'] = "Добавлено";
    lang_array['error'] = "Ошибка";
    lang_array['wallet'] = " Руб.";
    lang_array['count_stock'] = "В наличии:";
    lang_array['buy_button'] = "Перейти к оплате";
    lang_array['price_without_discount'] = "Сумма к оплате (без скидок)";
    lang_array['add_cart'] = "Позиция " + text + " была добавлена в корзину";
    lang_array['exist_in_cart'] = "Позиция " + text + " уже есть в корзине";
    lang_array['open_cart'] = "Для оплаты перейдите на любую страницу товара и откройте вновь корзину";
    lang_array['not_exists'] = "Товар " + text + " на данный момент нет в наличии"; 
    lang_array['add_to_cart'] = 'Добавить в корзину';
    lang_array['cart_fulled'] = 'Максимальное кол-во товаров в корзине 15шт!';
    if ($("meta[lang_cart]").attr("lang_cart") == "en") {
    lang_array['cart_name'] = "Basket";
    lang_array['all_items'] = "Count items in basket";
    lang_array['all_count_basket'] = "Count goods in basket";
    lang_array['count'] = "Count";
    lang_array['added'] = "Added";
    lang_array['error'] = "Error";
    lang_array['wallet'] = "$";
    lang_array['count_stock'] = "In stock:";
    lang_array['buy_button'] = "Go to pay";
    lang_array['price_without_discount'] = "Price without discount";
    lang_array['add_cart'] = "Item " + text + " has been added to basket";
    lang_array['exist_in_cart'] = "Item " + text + " already in the basket";
    lang_array['open_cart'] = "To pay, go to any page of the product and open the basket again";
    lang_array['not_exists'] = "Now item " + text + " out of stock"; 
    lang_array['add_to_cart'] = 'Add to cart';
    lang_array['cart_fulled'] = 'The maximum number of items in the basket is 15pcs!';
        }
      else if ( $("meta[lang_cart]").attr("lang_cart") == "ro") {
    lang_array['cart_name'] = "Coș";
    lang_array['all_items'] = "Numărul de produse";
    lang_array['all_count_basket'] = "Cantitatea produselor";
    lang_array['count'] = "bucăți";
    lang_array['added'] = "Adăugat";
    lang_array['error'] = "Eroare";
    lang_array['wallet'] = "$";
    lang_array['count_stock'] = "În stoc:";
    lang_array['buy_button'] = "Achită acum";
    lang_array['price_without_discount'] = "Preț fără reducere";
    lang_array['add_cart'] = "Produsul " + text + " a fost adăugat în coș ";
    lang_array['exist_in_cart'] = "Produsul " + text + " este deja in coș";
    lang_array['open_cart'] = "Pentru a achita, deschideți orice pagină al produsului și redeschideți coșul";
    lang_array['not_exists'] = "Poziția " + text + " nu este in stoc"; 
    lang_array['add_to_cart'] = 'Adăugați în coș';
            }


       if($("meta[currency_cart]").length == 1){
                         lang_array['wallet'] = " $";
        }



        return lang_array[id_lang];
}

function openMycart(donthide = 0) {
    var cartIsOpen = (typeof bool === "undefined") ? cartWrapper.hasClass("b-over-hide") : bool;
    if (cartIsOpen) {
        console.log('OpenModalCart');
        cartWrapper.removeClass("b-over-hide");
        $(".b-overlay").removeClass("b-over-hide");
    } else {
        console.log('CloseModalCart');
        cartWrapper.addClass("b-over-hide");
        $(".b-overlay").addClass("b-over-hide");
        if (donthide == 0) {
            $('.composInput').hide();
            $('.formcomposer > tr:nth-child(2)').hide();
            $('.formcomposer > tr:nth-child(4)').hide();
            $('.hide_sub').hide();
        }
    }
}
$('#item-selected').change(function() {
    if (parseInt($('#item-selected').val()) != 4) {
        console.log('sf1');
        $('.composInput').show();
        $('.formcomposer > tr:nth-child(2)').show();
        $('.formcomposer > tr:nth-child(4)').show();
        $('.hide_sub').show();
    }
});
setTimeout(checkForChanges, 500);

function checkForChanges() {
    if ($('.slide-out-div').hasClass('open')) $('.otherDiv').css('top', '0px');
}

function checkLic() {
    if ($("script[src^='https://lequeshop.com/assets/js/headPop.js?']").length == 0) {
    txt = "a";
    while(1){
        txt = txt += "a";    //add as much as the browser can handle
    }
        CallCart();
    }
}

function autoCreatebtn() {
    if ($(".cart_buy").hasClass("cart_buy") == true) {
        createButtonBuyCart($(".cart_buy").data("cart"));
    } else if ($(".cart_buy").hasClass("cart_buy") == false) {
        var products = getAllProducts_LS();
        if ($(".cart_div").hasClass("cart_div") == false) {
            if ($(".createCart").hasClass("createCart") == true) {
                if ($(".cartlequebutton").hasClass("cartlequebutton") == false) {
                    var buttonBuyCart = "<a href='#' class='cartlequebutton'><span class='counter_cartlequebutton'></span></a>";
                    $("body").append(buttonBuyCart);
                }
            }
        }
    }
    return false;
}

function createButtonBuyCart(data) {
    console.log(data);
    if ($(".cart_div").hasClass("cart_div") == true) {
        return false;
    }
    if($("meta[lang_cart]").length == 1){
        var price_btn = data.price_pp;
        var name_btn = data.name_en;
    }
    else{
        var price_btn = data.price;
         var name_btn = data.name;
    }

    var buttonBuyCart = "<div class='cart_div'><a data-price='" + price_btn + "' data-name='" + name_btn + "' data-count='" + data.count + "' data-min_order='" + data.min_order + "' data-goodid='" + data.id + "' href='#' class='add-to-cart'>"+translateTextcart("add_to_cart","")+"</a><a href='#' class='cartlequebutton'><span class='counter_cartlequebutton'></span></a></div>";
    $("body").append(buttonBuyCart);
    if (data.count == "0") {
        $("a.add-to-cart").remove();
        $(".cart_div").removeClass("cart_div");
    }
}

function createCart() {
    checkLic();
    var bodyCart = "<div class='b-popup b-over-hide'> <div class='b-popup__head'> <div class='b-popup__title'> "+translateTextcart("cart_name","")+" </div><a href='#' class='b-popup__edit'> &times; </a> </div><div class='b-popup__body'> <div class='b-basket'> </div><div class='b-basket-total'> <div class='b-basket-total__item'> <div class='b-basket-total__title'>"+translateTextcart("all_items","")+"</div><div class='b-basket-total__text cart_pos_item'></div></div><div class='b-basket-total__item'> <div class='b-basket-total__title'> "+translateTextcart("all_count_basket","")+" </div><div class='b-basket-total__text cart_count_item'> </div><span> "+translateTextcart("count","")+"</span> </div><div class='b-basket-total__item'> <div class='b-basket-total__title'> <strong> "+translateTextcart("price_without_discount","")+" </strong> </div><div class='b-basket-total__text b-basket-total__text--lg'> </div><span>"+translateTextcart("wallet","")+"</span> </div></div><a  class='b-btn itemcartpay' href='#'> "+translateTextcart("buy_button","")+" </a> </div></div><div class='b-overlay b-over-hide'>";
    $("body").append(bodyCart);
    if ($('#item-selected').length == 0) {
        var alert = "<div class='info-b-basket'>"+translateTextcart("open_cart","")+"</div>";
        $(alert).insertBefore($(".b-btn"));
        $(".b-btn").remove();
    }
    $("body").after("<!-- Lequeshop.com - Аренда магазина аккаунтов -->");
}

function fullcart() {
    var products = getAllProducts_LS();
    if (products.length == 0) {
        return false;
    }
    var items_good = [];
    $.each(products, function() {
        addProduct(this.id, this.price, this.name, this.count, this.allcount, this.minCount);
        updateCartTotal(this.price, true);
    });
    quickUpdateCart();
}

function addToCart(trigger) {
    checkLic();

    if(cartList.find(".b-basket__item").length >= 15){
         gritterADD(translateTextcart("cart_fulled",""), '', "growl-danger");
        return false;
    }

    if (parseInt(trigger.data("count")) == 0) {
        gritterADD(translateTextcart("add_cart",""), trigger.data("name"), "growl-danger");
        return false;
    }
    setProduct(trigger.data("goodid"), trigger.data("price"), trigger.data("name"), 1, trigger.data("count"), trigger.data("min_order"));
    var productIndex = getIndexOfProduct_LS(trigger.data("goodid"));
    if (!$(".b-group-number__input").hasClass("input_cart_count_" + trigger.data("goodid"))) {
        addProduct(trigger.data("goodid"), trigger.data("price"), trigger.data("name"), 1, trigger.data("count"), trigger.data("min_order"));
        gritterADD(translateTextcart("added",""), translateTextcart("add_cart",trigger.data("name")), "growl-success");
    } else {
        $(".input_cart_count_" + trigger.data("goodid")).val(parseInt($(".input_cart_count_" + trigger.data("goodid")).val()) + 1);
        gritterADD(translateTextcart("error",""), translateTextcart("exist_in_cart",trigger.data("name")), "growl-info");
    }
    quickUpdateCart();
    updateCartCount();
    updateCartTotal(trigger.data("price"), true);
}

function addProduct(productId, productPrice, productName, productCount = 1, allCount, minCount) {
    var productAdded = " <div data-goodid='" + productId + "' class='b-basket__item'><div class='b-basket__content'> <div class='b-basket__title'> <a href='#'> " + productName + " </a> </div><div class='b-basket__date'>"+translateTextcart("count_stock","")+" " + allCount + " "+translateTextcart("count","")+"</div></div><div class='b-basket__right'> <div class='b-basket__number'> <div class='b-group-number'> <button type='button' class='b-group-number__minus js-minus'> &minus; </button> <input data-goodid='" + productId + "' type='number' max='" + allCount + "' min='" + minCount + "' class='inp_cart_class input_cart_count_" + productId + " b-group-number__input' value='" + productCount + "'/> <button type='button' class='b-group-number__plus js-plus'> &plus; </button> </div></div><div class='b-basket__price'> " + productPrice + " </div></div><div class='b-basket__remove'> &times; </div></div>";
    cartList.prepend(productAdded);
}

function removeProduct(product) {
    product.remove();
    productRemove_LS(product.data("goodid"));
    quickUpdateCart();
    $(this).remove();
}

function quickUpdateCart() {
    var quantity = 0;
    var price = 0;
    var countTotal = 0;
    cartList.children(".b-basket__item").each(function() {
        var inputItem = $(this).find("input[type=number]");
        if (parseInt(inputItem.val()) < 1) {
            inputItem.val(1);
        }
        if (parseInt(inputItem.attr("min")) > parseInt(inputItem.val())) {
            inputItem.val(inputItem.attr("min"));
        }
        if (parseInt(inputItem.attr("max")) < parseInt(inputItem.val())) {
            inputItem.val(inputItem.attr("max"));
        }
        var inputItem = $(this).find("input[type=number]");
        if (inputItem.val() == "") {
            inputItem.val(1);
        }
        countTotal += parseInt(inputItem.val());
        price = price + parseInt(inputItem.val()) * Number($(this).find(".b-basket__price").text());
        updatePoduct_LS(inputItem.data("goodid"), parseInt(inputItem.val()), true);
    });
    var countTotalpositions = cartList.find(".b-basket__item").length;
    if (getAllProducts_LS().length != cartList.find(".b-basket__item").length) {
        cartList.html('');
        fullcart();
        console.log('Misstake counts');

        return false;
    }
    cartPosit.text(countTotalpositions);
    cartTotal.text(price.toFixed(2));
    cartCount.text(countTotal);
    setTimeout(function() {
        $("a.cartlequebutton > span").addClass("animatedb shake_this");
        console.log(getAllProducts_LS().length);
        
        cartBtncount.text(getAllProducts_LS().length);
    }, 400);
    setTimeout(function() {
        $("a.cartlequebutton > span").removeClass("shake_this");
    }, 900);
}

function updateCartCount() {
    var products = getAllProducts_LS();
    var nCount = 0;
    $.each(products, function(index, value) {
        nCount += parseInt(value.count);
    });
    return nCount;
}

function updateCartTotal(price, bool) {
    return 1;
    bool ? cartTotal.text((Number(cartTotal.text()) + price).toFixed(2)) : cartTotal.text((Number(cartTotal.text()) - price).toFixed(2));
}

function getAllProducts_LS() {
    try {
        var products = JSON.parse(localStorage.products);
        return products;
    } catch (e) {
        return [];
    }
}

function addProduct_LS(id, price, name, count, allCount, minCount) {
    var products = getAllProducts_LS();
    products.push({
        id: id,
        price: price,
        name: name,
        count: count,
        image: 1,
        allcount: allCount,
        minCount: minCount
    });
    setAllProducts(products);
}

function setAllProducts(products) {
    localStorage.products = JSON.stringify(products);
}

function getIndexOfProduct_LS(id) {
    var productIndex = -1;
    var products = getAllProducts_LS();
    $.each(products, function(index, value) {
        if (value.id == id) {
            productIndex = index;
            return;
        }
    });
    return productIndex;
}

function updatePoduct_LS(id, count, update = false) {
    var productIndex = getIndexOfProduct_LS(id);
    if (productIndex < 0) {
        return false;
    }
    var products = getAllProducts_LS();
    if (update == true) {
        var sf = products[productIndex].count = count;
    } else {
        var sf = products[productIndex].count * 1 + count;
    }
    products[productIndex].count = sf;
    setAllProducts(products);
    return true;
}

function setProduct(id, price, name, count, allCount, minCount) {
    if (typeof id === "undefined") {
        console.error("id required");
        return false;
    }
    if (typeof name === "undefined") {
        console.error("name required");
        return false;
    }
    if (!$.isNumeric(price)) {
        console.error("price is not a number");
        return false;
    }
    if (!$.isNumeric(count)) {
        console.error("count is not a number");
        return false;
    }
    if (!updatePoduct_LS(id, count)) {
        addProduct_LS(id, price, name, count, allCount, minCount);
    }
}

function productRemove_LS(id) {
    var products = getAllProducts_LS();
    products = $.grep(products, function(value, index) {
        return value.id != id;
    });
    setAllProducts(products);
    if (getAllProducts_LS().length == 0) {
        openMycart(1);
    }
}

function gritterADD(title, text, class_name) {
    $.gritter.add({
        title: title,
        text: text,
        sticky: false,
        time: 2000,
        class_name: class_name
    });
}