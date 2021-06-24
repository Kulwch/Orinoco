let productsId = [];
let orderContent = {};

function displayCart() {
    const elt = document.querySelector('#cart');
    let products = JSON.parse(localStorage.getItem('product'));
    let total = 0;
    let prices = [];
    let totalToPay = 0;

    for (let i = 0; i < products.length; i++) {
        elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2 class="cartContent${[
                i,
            ]} cartItem">
                <a href="product.html?${
                    products[i].idProduit
                }" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${
                        products[i].image
                    }" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${products[i].nom}</h5>
                        <p class="color">Couleur: ${products[i].option}</p>
                        <p class="quantity">Quantité: ${
                            products[i].quantite
                        }</p> 
                        <p class="price">Prix: ${products[i].prix}.00 &euro;</p>
                    </div>
                </a>
                <div class="">
                    <button onclick="removeFromCart()" class="btn btn-warning btnRemove">Enlever cet article</button>
                </div>                
            </div>
            `;

        prices.push(`${products[i].prix}`);
        productsId.push(`${products[i].idProduit}`);
    }

    totalToPay = prices.map(function (x) {
        return parseInt(x, 10);
    });

    function sum(total, num) {
        return total + num;
    }

    total = totalToPay.reduce(sum);

    let totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;

    console.log(total);
    function removefromCart() {
        document.getElementsByTagName('btnRemove').onclick =
            ('click',
            (e) => {
                e.preventDefault();

                localStorage.removeItem('product', thisItem);

                let thisItem = document.querySelector(`.${carContent[i]}`);
                thisItem.remove;
                window.location.reload();
            });
        console.log(carContent[i]);
    }
}

displayCart();

function clearCart() {
    document.getElementById('clearCart').onclick =
        ('click',
        (e) => {
            e.preventDefault();
            if (localStorage.getItem('product')) {
                localStorage.clear();
                window.location.reload();
            } else {
                alert('Le panier est déjà vide !');
            }
        });
}

function order() {
    let firstName = document.getElementById('firstName').value;
    let name = document.getElementById('name').value;
    let adress = document.getElementById('adress').value;
    let city = document.getElementById('city').value;
    let mail = document.getElementById('mail').value;

    let contact = {
        firstName: firstName,
        name: name,
        adress: adress,
        city: city,
        email: mail,
    };

    let products = [];

    products = productsId;

    orderContent = { contact, products };
    console.log(orderContent);

    document.getElementById('orderCart').onclick =
        ('click',
        (e) => {
            e.preventDefault();
            const orderThisCart = fetch(
                'http://localhost:3000/api/teddies/order',
                {
                    method: 'POST',
                    body: JSON.stringify(orderContent),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
        });
}
