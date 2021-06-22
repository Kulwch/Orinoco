// Getting the _id from the url parameters
const getUrlId = window.location.search;
console.log(getUrlId);

const teddyId = getUrlId.slice(1); // Removing the ? from id with the .slice() method
console.log(teddyId);

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
                            <button onclick="addToCart(teddy)" class="btn btn-secondary addBtn" >Ajouter au panier</button>
                            <select name="couleur" class="colorSelect">                                
                                <label>couleur souhaitée</label>
                            </select>
                            <p class="price">${teddy.price / 100}.00 &euro;</p>
                            <p class="description"> ${teddy.description}</p>
                        </div>
                    </div>
                </div>
            `;
    async function showColors(teddy) {
        console.log(teddy);
        for (i = 0; i < teddy.colors.length; i++) {
            let option = document.querySelector('.colorSelect');
            option.innerHTML += `<option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;

            console.log(teddy.colors[i]);
        }
    }
    showColors(teddy);
}
getTeddy();

// Display the available customization options (colors)

async function addToCart(teddy) {
    let selection = document.getElementsByClassName('.colorSelect');
    let option = selection.value;

    let product = {
        nom: teddy.name,
        idProduit: teddy._id,
        option: option,
        quantité: 1,
        prix: teddy.price / 100,
    };
    const button = document.querySelectorAll('addBtn');
    button.addEventListener('click', () => {
        let productInCart = localStorage.getItem(product);
        productInCart.push(product);
        localStorage.setItem('produit', product);
    });
}
