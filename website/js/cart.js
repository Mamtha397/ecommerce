getProduct();

function getProduct(){
    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    let totalPrice = 0;

    let newHTML = "";
    for(let i=0;i<values.length;i++){
        let price = values[i].split("|")[2]
        totalPrice +=parseInt(price);
        let name = values[i].split("|")[0]
        let image = values[i].split("|")[1]
        newHTML+=`<tr>
        <td class="product__thumbnail">
            <a href="#">
                <img src="${image}" alt="">
            </a>
        </td>
        <td class="product__name">
            <a href="#">${name}</a>
            <br><br>
        </td>
        <td class="product__price">
            <div class="price">
                <span class="new__price">$ ${price}</span>
            </div>
        </td>
        <td class="product__quantity">
            <div class="input-counter">
                <div>
                    <label>1</label>
                </div>
            </div>
        </td>
        <td class="product__subtotal">
            <div class="price">
                <span class="new__price">$ ${price}</span>
            </div>
        </td>
    </tr>`
    }
    document.getElementById("tableBody").innerHTML = newHTML

    let tax = totalPrice * 0.07
    let taxTotalPrice = totalPrice+tax
    tax = tax.toFixed(2);

    document.getElementById("totalPrice").innerText = "$ "+ totalPrice;
    document.getElementById("tax").innerText = "$ "+ tax;
    document.getElementById("taxTotalPrice").innerText = "$ "+ taxTotalPrice;
    console.log(taxTotalPrice,"taxTotalPrice")
}