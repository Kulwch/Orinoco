let productsId = [];
let orderContent = {};

// Displaying the cart with its content
function displayCart() {
    const elt = document.querySelector('#cart');
    let products = JSON.parse(localStorage.getItem('product'));
    let total = 0;
    let prices = [];
    let totalToPay = 0;

    //if cart is empty, displaying a message
    if (!localStorage.getItem('product')) {
        elt.innerHTML = 'Votre panier est vide';
    } else {
        // When cart contains items, creating elements to display it
        for (let i = 0; i < products.length; i++) {
            elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2 class="cartContent${products[i]} cartItem">
                <a href="product.html?${products[i].idProduit}" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${products[i].image}" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${products[i].nom}</h5>
                        <p class="color">Couleur: ${products[i].option}</p>
                        <p class="quantity">Quantité: ${products[i].quantite}</p> 
                        <p class="price">Prix: ${products[i].prix}.00 &euro;</p>
                    </div>
                </a>
                <div class="">
                    <button class="btn btn-warning btnRemove">Enlever cet article</button>
                </div>                
            </div>
            `;

            // The prices are pushed in an array, and so are the ids
            prices.push(`${products[i].prix}`);
            productsId.push(`${products[i].idProduit}`);
        }
    }

    totalToPay = prices.map(function (x) {
        return parseInt(x, 10);
    });

    function sum(total, num) {
        return total + num;
    }

    total = totalToPay.reduce(sum);

    localStorage.setItem('total', total);

    let totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;

    console.log(total);

    let btnClear = document.querySelector('#clearCart');
    btnClear.onclick = clearCart();

    function clearCart() {
        btnClear.addEventListener('click', (e) => {
            e.preventDefault();
            if (localStorage.getItem('product') != 'true') {
                localStorage.clear();
                window.location.reload();
            }
        });
    }
}

displayCart();

let btnOrder = document.getElementById('orderCart');
btnOrder.onclick = order();

function order() {
    btnOrder.addEventListener('click', (e) => {
        e.preventDefault();
        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        let contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        };
        let products = productsId;
        orderContent = { contact, products };

        console.log(orderContent);

        return fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(orderContent),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => localStorage.setItem('orderId', res.orderId))
            .then(() => (window.location = 'confirm.html'));
    });
}
