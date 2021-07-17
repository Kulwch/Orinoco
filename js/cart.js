// Displaying the cart with its content
function displayCart() {
    const elt = document.querySelector('#cart');   

    //if cart is empty, display a message and disable button orderCart
    let product = JSON.parse(localStorage.getItem('product'));

    if (!localStorage.getItem('product')) {
        elt.innerHTML = 'Votre panier est vide';
        document.querySelector('#orderCart').disabled = true;
    } else {
        // When cart contains items, creating elements to display it
        for (let oneProduct of product) {  
            elt.innerHTML += `
            <div class="col-4 col-md-3 col-lg-2">
                <a href="product.html?${oneProduct.productId}" class="text-decoration-none productLink">
                    <img class="card-img-top img-fluid" src="${oneProduct.image}" alt="Oh le joli nounours !"/>
                    <div class="card-body teddyInfos text-dark">
                        <h5 class="card-title name">${oneProduct.name}</h5>
                        <p class="color">Couleur: ${oneProduct.option}</p>
                        <p class="quantity">Quantité: ${oneProduct.quantity}</p> 
                        <p class="price">Prix: ${oneProduct.price}.00 &euro;</p>                       
                    </div>
                </a>  
                 <button class="btn btn-warning btnRemove">Enlever cet article</button>                             
            </div>
            `;                
    }    
    removeItem();
    totalCalc();             
} 

function removeItem() {
   // Removal of an item when clicking the btnRemove button
    let btnRemove = document.querySelectorAll('.btnRemove');

    for (let j = 0; j < btnRemove.length; j++) {
        btnRemove[j].addEventListener('click', (e) => {
            e.preventDefault();
            let itemToRemove = `${product[j].tagKey}`;
            // Using filter to separate the item to remove from the rest of the array
            product = product.filter((element) => element.tagKey !== itemToRemove);
            localStorage.setItem('product', JSON.stringify(product));
            window.location.reload();
        });
    }
}

function totalCalc() {
    let prices = [];

    for(let oneProduct of product){
        prices.push(oneProduct.price);
    }
    
    // Total is calculated with a map.reduce of prices  
    let total = prices
        .map((x) => parseInt(x, 10))
        .reduce((total, num) => total + num, 0);

    // Then total is stored in localStorage and displayed
    localStorage.setItem('total', total);
    const totalPrice = document.querySelector('.totalPrice');
    totalPrice.innerHTML = `${total},00 &euro;`;
}

// Clearing the cart from everything in it when clicking btn clearCart
const btnClear = document.querySelector('#btnClearCart');
btnClear.addEventListener("click", 
function clearCart() {
    localStorage.clear();
    window.location.reload();
});
 
const btnOrder = document.querySelector('#orderCart');
btnOrder.addEventListener("click", (e) => {
    e.preventDefault();
    order();
})

function order() {

    //Defining the variables
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    

    //Verify cart is not empty
    if (localStorage.getItem('total') == 0 ||

    // Verify first Name
    !firstName.match(`^[a-zA-Z'-]+$`) ||   

    // Verify name
    !lastName.match(`^[a-zA-Z'-]+$`) ||

    // REGEX are not efficient with addresses and city names, so they're not used here
    // Verify address
    address === '' ||
    
    // Verify city
    city === '' ||
    
    // Verify mail
    !email.match(`^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$`)){
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

        let products = [];
        for(let oneProduct of product){
            
            products.push(oneProduct.productId);
        }
        

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
        }
    }
}
    

