let productsId = [];

// Displaying the cart with its content
function displayCart() {
    const elt = document.querySelector('#cart');
    let products = JSON.parse(localStorage.getItem('products'));
    let total = 0;
    let prices = [];

    //if cart is empty, displaying a message
    if (!localStorage.getItem('products')) {
        elt.innerHTML = 'Votre panier est vide';
    } else {
        // When cart contains items, creating elements to display it
        for (let i = 0; i < products.length; i++) {
            elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2 class="cartItem${products[i].productId}">
                <a href="product.html?${products[i].productId}" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${products[i].image}" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${products[i].name}</h5>
                        <p class="color">Couleur: ${products[i].option}</p>
                        <p class="quantity">Quantité: ${products[i].quantity}</p> 
                        <p class="price">Prix: ${products[i].price}.00 &euro;</p>
                        <button class="btn btn-warning btnRemove">Enlever cet article</button>
                    </div>
                </a>                               
            </div>
            `;

            // The prices are pushed in an array, and so are the ids
            prices.push(`${products[i].price}`);
            productsId.push(`${products[i].productId}`);

            // Removal of an item when clicking the btnRemove button
            btnRemove = document.querySelectorAll('.btnRemove');

            for (let j = 0; j < btnRemove.length; j++) {
                btnRemove[j].addEventListener('click', (e) => {
                    e.preventDefault();
                    let itemToRemove = `${products[i].productId}`;
                    // Using filter to separate the item to remove from the rest of the array
                    products = products.filter(
                        (element) => element.productId !== itemToRemove
                    );
                    localStorage.setItem('products', JSON.stringify(products));
                    window.location.reload();
                });
            }
        }
    }
    // Total is calculated with a map.reduce of prices
    total = prices
        .map((x) => {
            return parseInt(x, 10);
        })
        .reduce(function (total, num) {
            return total + num;
        });

    // Then total is stored in localStorage and displayed
    localStorage.setItem('total', total);
    const totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;

    // Clearing the cart from everything in it when clicking btnClear
    const btnClear = document.querySelector('#clearCart');
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

// Ordering the cart's content when clicking the btnOrder
const btnOrder = document.getElementById('orderCart');
btnOrder.onclick = order();

function order() {
    btnOrder.addEventListener('click', (e) => {
        e.preventDefault();

        //Defining the variables
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const email = document.getElementById('email').value;

        //Creating the contact object
        const contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        };
        let products = productsId;

        // Creating the object which will be the body of the request
        let orderContent = {};
        orderContent = { contact, products };

        // Making a POST request to the API then fetching the orderId, finally redirecting to confirm.html
        return fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(orderContent),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => localStorage.setItem('orderId', res.orderId))
            .then(() => (window.location = 'confirm.html'))
            .catch((error) => {
                console.log('Erreur de connexion au serveur', error);
            });
    });
}
