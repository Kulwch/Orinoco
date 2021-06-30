// Getting the _id from the url parameters
const getUrlId = window.location.search;

// Removing the ? from id with .slice()
const teddyId = getUrlId.slice(1);

// Gathering the teddy from the API with function getTeddy()
async function getTeddy() {
    const id = teddyId;
    return fetch(`http://localhost:3000/api/teddies/${id}`)
        .then((response) => response.json())
        .then((teddy) => displayThisTeddy(teddy))
        .catch((error) => {
            console.log('Erreur de connexion au serveur', error);
        });
}

// Displaying the fetched Teddy's card
async function displayThisTeddy(teddy) {
    const element = document.querySelector('.thisTeddy'); // Where the HTML will be injected

    element.innerHTML += `
                <div class="col mx-auto>
                    <div class="card">                      
                        <img class="card-img-top img-fluid" src="${
                            teddy.imageUrl
                        }"  alt="Oh le joli nounours !" />
                        <div class="card-body teddyInfos text-dark">
                            <h5 class="card-title name">${teddy.name}</h5>
                            <button id="addCart" onclick="addToCart()" class="btn btn-secondary addBtn" >Ajouter au panier</button>
                            <select name="color" id="colorSelect">                                
                                <label>couleur souhaitée</label>
                            </select>
                            <p class="price">${teddy.price / 100}.00 &euro;</p>
                            <p class="description"> ${teddy.description}</p>
                        </div>
                    </div>
                </div>
            `;
    // Display the available customization options (colors)
    async function showColors(teddy) {
        for (i = 0; i < teddy.colors.length; i++) {
            let option = document.querySelector('#colorSelect');
            option.innerHTML += `<option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;
        }
    }
    showColors(teddy);
    addToCart(teddy);
}
getTeddy();

// Adding selected product to cart on click
async function addToCart(teddy) {
    document.getElementById('addCart').onclick =
        ('click',
        (e) => {
            e.preventDefault();

            const selection = document.querySelector('#colorSelect');
            const color = selection.value;
            let howMany = 1;

            // Creating the object 'product'
            let products = {
                name: teddy.name,
                productId: teddy._id,
                option: color,
                quantity: howMany,
                price: teddy.price / 100,
                image: teddy.imageUrl,
                tagKey: teddy._id + color,
            };

            let productInCart = JSON.parse(localStorage.getItem('products'));

            if (productInCart) {
                // If cart contains something
                productInCart.push(products);
                localStorage.setItem('products', JSON.stringify(productInCart));
                console.log(productInCart);
            } else {
                // Else, if empty
                productInCart = [];
                productInCart.push(products);
                localStorage.setItem('products', JSON.stringify(productInCart));
                console.log(productInCart);
            }
        });
    console.log(localStorage);
}
