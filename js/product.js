// Getting the _id from the url parameters
const getUrlId = window.location.search;
console.log(getUrlId);

const teddyId = getUrlId.slice(1); // Removing the ? from id with the .slice() method
console.log(teddyId);

// Gathering the teddy from the API with function getTeddy()
async function getTeddy() {
    let id = teddyId;
    try {
        let response = await fetch(`http://localhost:3000/api/teddies/${id}`);
        if (response.ok) {
            let teddy = await response.json();
            displayThisTeddy(teddy);
            showColors(teddy);
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

// Displaying the fetched Teddy's card
function displayThisTeddy(teddy) {
    const element = document.querySelector('.thisTeddy'); // Where the HTML will be injected

    element.innerHTML += `
                <div class="col mx-auto>
                    <div class="card">                      
                        <img class="card-img-top img-fluid" src="${
                            teddy.imageUrl
                        }"  alt="Oh le joli nounours !" />
                        <div class="card-body teddyInfos text-dark">
                            <h5 class="card-title name">${teddy.name}</h5>
                            <button class="btn btn-secondary" onclick="addToCart()">Ajouter au panier</button>
                            <select name="couleur" class="colorSelect">                                
                                <label>couleur souhaitée</label>
                            </select>
                            <p class="price">${teddy.price / 100}.00 &euro;</p>
                            <p class="description"> ${teddy.description}</p>
                        </div>
                    </div>
                </div>
            `;
}

function showColors(teddy) {
    for (i = 0; i < teddy.colors.length; i++) {
        let option = document.querySelector('.colorSelect');
        option.innerHTML += `<option value="${teddy.colors[i]}">${teddy.colors[i]}</option>`;

        console.log(teddy.colors[i]);
    }
}

function addToCart(teddy) {
    localStorage.setItem('product', teddyId);
}
console.log(localStorage);
getTeddy();
