let productsId = [];

let products = JSON.parse(localStorage.getItem('products'));
let prices = [];

// Displaying the cart with its content
function displayCart() {
    const elt = document.querySelector('#cart');
    

    //if cart is empty, displaying a message
    if (!localStorage.getItem('products')) {
        elt.innerHTML = 'Votre panier est vide';
    } else {
        // When cart contains items, creating elements to display it
        for (let i = 0; i < products.length; i++) {
            elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2 ${products[i].tagKey}">
                <a href="product.html?${products[i].productId}" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${products[i].image}" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${products[i].name}</h5>
                        <p class="color">Couleur: ${products[i].option}</p>
                        <p class="quantity">Quantité: ${products[i].quantity}</p> 
                        <p class="price">Prix: ${products[i].price}.00 &euro;</p>                       
                    </div>
                </a>  
                 <button class="btn btn-warning btnRemove" onclick="removeItem(products)">Enlever cet article</button>                             
            </div>
            `;

            // The prices are pushed in an array, and so are the ids
            prices.push(`${products[i].price}`);
            productsId.push(`${products[i].productId}`);

           
        }
    }
    totalCalc(prices);
    
}

function totalCalc(prices) {
    let total = 0;
    // Total is calculated with a map.reduce of prices
    total = prices
        .map((x) => parseInt(x, 10))
        .reduce((total, num) => total + num, 0);

    // Then total is stored in localStorage and displayed
    localStorage.setItem('total', total);
    const totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;
}

function removeItem(products) {
    // Removal of an item when clicking the btnRemove button
    btnRemove = document.querySelector('.btnRemove');    
       
        let itemToRemove = `${products[i].tagKey}` ;
        

        // Using filter to separate the item to remove from the rest of the array
        products = products.filter((element) => element.tagKey !== itemToRemove);
        localStorage.setItem('products', JSON.stringify(products));
        window.location = 'cart.html';
}


// Clearing the cart from everything in it when clicking btn clearCart
function clearCart() {
    if (localStorage.getItem('product') != 'true') {
        localStorage.clear();
        window.location.reload();
    }
}

function disallowOrder() {
    document.getElementById('orderCart').disabled = true;
    document
        .getElementById('orderForm')
        .insertAdjacentHTML(
            'beforeend',
            "<p>Commande impossible, le formulaire n'est pas complet ou a mal été saisi. Veuillez rafraîchir la page et recommencer.</p>"
        );
}

function order() {
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

    //Verify cart is not empty
    if (localStorage.getItem('total') == 0) {
        document
            .getElementById('orderForm')
            .insertAdjacentHTML(
                'beforeend',
                '<p>Impossible de commander un panier vide.</p>'
            );
    }
    // Verify first Name
    else if (!firstName.match(`^[a-zA-Z'-]+$`)) {
        disallowOrder();
        document
            .getElementById('orderForm')
            .insertAdjacentHTML('beforeend', '<p>Champ concerné: prénom.</p>');
    }

    // Verify name
    else if (!lastName.match(`^[a-zA-Z'-]+$`)) {
        disallowOrder();
        document
            .getElementById('orderForm')
            .insertAdjacentHTML('beforeend', '<p>Champ concerné: nom.</p>');
    }

    // REGEX are not very efficient with addresses and city name, so they're not used here

    // Verify mail
    else if (!email.match(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$`)) {
        disallowOrder();
        document
            .getElementById('orderForm')
            .insertAdjacentHTML('beforeend', '<p>Champ concerné: email.</p>');
    } else {
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
    }
}
