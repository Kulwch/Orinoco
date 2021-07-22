// Gathering the teddy from the API with function getTeddy()
async function getTeddy() {
    // Getting the _id from the url parameters
    const getUrlId = window.location.search;

    // Removing the ? from id with .slice()
    const teddyId = getUrlId.slice(1);
    const id = teddyId;

    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((res) => res.json())
        .then((teddy) => displayTeddy(teddy))
        .catch((error) => {
            console.log('Erreur de connexion au serveur', error);
        });
}

// Display the fetched Teddy's card
async function displayTeddy(teddy) {
    const element = document.querySelector('.thisTeddy'); // Where the HTML will be injected
    
    element.innerHTML += `
                <div class="col mx-auto>
                    <div class="card">                      
                        <img class="card-img-top img-fluid" src="${
                            teddy.imageUrl
                        }"  alt="Oh le joli nounours !" />
                        <div class="card-body teddyInfos text-dark">
                            <h5 class="card-title name">${teddy.name}</h5>
                            <button id="addCart" class="btn btn-secondary" value='${JSON.stringify(teddy)}' onclick="addToCart(this.value)">Ajouter au panier</button>
                            <select name="color" id="colorSelect">                                
                                <label>couleur souhaitée</label>
                            </select>
                            <p class="price">${teddy.price / 100}.00 &euro;</p>
                            <p class="description"> ${teddy.description}</p>
                        </div>
                    </div>
                </div>
            `;
    for (let color of teddy.colors) {
        let option = document.querySelector('#colorSelect');
        option.innerHTML += `<option value="${color}">${color}</option>`;
    }    
}


// Adding selected product to cart on click
async function addToCart(teddy) {
    teddy = JSON.parse(teddy);
    let productInCart = JSON.parse(localStorage.getItem('products'));

            const selection = document.querySelector('#colorSelect');
            const color = selection.value;

            // Creating the object 'product'
            let product = {
                name: teddy.name,
                productId: teddy._id,
                option: color,
                quantity: 1,
                price: teddy.price / 100,
                image: teddy.imageUrl,
                tagKey: teddy._id + color,
            };

            // If cart is not empty
            if (productInCart) {
                // If cart already contains an instance of the same product, the quantity is incremented
                let item = productInCart.find(
                    (thisItem) => thisItem.tagKey === teddy._id + color
                );
                if (item) {
                    item.quantity += 1;
                    item.price += teddy.price / 100;
                    addStorage(productInCart);
                } else {
                    // If cart contains something else, new product is added
                    productInCart.push(product);
                    addStorage(productInCart);
                }
            } else {
                // Else, if empty
                productInCart = [];
                productInCart.push(product);
                addStorage(productInCart);
            }
        }

// Async function to avoid repeating
async function addStorage(productInCart) {
    localStorage.setItem('products', JSON.stringify(productInCart));
}
