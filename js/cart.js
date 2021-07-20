function cartFunctions() {
    displayCartItems();
    displayCartTotalPrice();
}

// Displaying the cart with its content
function displayCartItems() {
    const elt = document.querySelector('#cart');   

    //if cart is empty, display a message and disable button orderCart
    let products = JSON.parse(localStorage.getItem('products'));

    if (!localStorage.getItem('products')) {
        elt.innerHTML = 'Votre panier est vide';
        document.querySelector('#orderCart').disabled = true;
    } else {
        // When cart contains items, creating elements to display it
        for (let product of products) {  
            elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2">
                <a href="product.html?${product.productId}" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${product.image}" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${product.name}</h5>
                        <p class="color">Couleur: ${product.option}</p>
                        <p class="quantity">Quantité: ${product.quantity}</p> 
                        <p class="price">Prix: ${product.price}.00 &euro;</p>                       
                    </div>
                </a>  
                 <button class="btn btn-warning btnRemove" value="${product.tagKey}" onclick="removeItem(this.value)">Enlever cet article</button>                             
            </div>
            `;     
        }           
    }         
} 

function removeItem(val) {  
            
            let products = JSON.parse(localStorage.getItem('products'))
            let itemToRemove = val;

            // Using filter to separate the item to remove from the rest of the array
            products = products.filter((element) => element.tagKey !== itemToRemove);
            localStorage.setItem('products', JSON.stringify(products));
            window.location.reload();    
}

function displayCartTotalPrice() {
    let prices = [];
    let products = JSON.parse(localStorage.getItem('products'));
    if(products){
         for(let product of products){
            prices.push(product.price);
        }
    }   
    
    // Total is calculated with a map.reduce of prices 
    let total = 0; 
    total = prices
        .map((x) => parseInt(x, 10))
        .reduce((acc, curr) => acc + curr, 0);

    // Then total is stored in localStorage and displayed
    localStorage.setItem('total', total);
    const totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;
}

function clearCart() {
    localStorage.clear();
    window.location.reload();
}

function order() {

    //Defining the variables
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    
    if (localStorage.getItem('total') == 0 ||                           // Verify cart is not empty    
    !firstName.match(`^[a-zA-Z'-]+$`) ||                                // Verify first Name    
    !lastName.match(`^[a-zA-Z'-]+$`) ||                                 // Verify name
    address === '' ||                                                   // Verify address - REGEX are not efficient with addresses and city names, so they're not used here
    city === '' ||                                                      // Verify city     
    !email.match(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$`)){   // Verify mail
        document
        .getElementById('orderForm')
        .insertAdjacentHTML(
            'beforeend',
            "<p>Commande impossible, pensez à remplir tous les champs.</p>");
        
    } else {

        //Creating the contact object
        const contact = {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email,
        };

        const productIds = products.map(product => product.productIds);
               
        // Creating the object which will be the body of the request
        let orderContent = {};
        orderContent = { contact, products: productIds };

        // Making a POST request to the API then fetching the orderId, finally redirecting to confirm.html
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            body: JSON.stringify(orderContent),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => localStorage.setItem('orderId', res.json().orderId))
        .then(() => (window.location = 'confirm.html'))
        .catch((error) => {
            console.log('Erreur de connexion au serveur', error);
        });
    }
}

    

