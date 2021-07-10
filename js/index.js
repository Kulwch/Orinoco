// Gathering all teddies from the API with function getTeddies()
async function getTeddies() {
    return fetch('http://localhost:3000/api/teddies')
        .then((response) => response.json())
        .then((teddies) => displayTeddiesCards(teddies))
        .catch((error) => {
            console.log('Erreur de connexion au serveur', error);
        });
}

// Displaying the json objects gathered within injected HTML
function displayTeddiesCards(teddies) {
    const element = document.querySelector('#productsList'); // Where the HTML will be injected

    for (let i = 0; i < teddies.length; i++) {
        // looping on the array teddies.length to create as many elements as needed

        element.innerHTML += `
                <div class="col-12 col-md-6 productCard list-group-item">
                    <a
                        href="product.html?${teddies[i]._id}"
                        class="text-decoration-none productLink"
                    >
                        <img class="card-img-top img-fluid" src="${
                            teddies[i].imageUrl
                        }"  alt="Un joli nounours !" />
                        <div class="card-body teddyInfos text-dark">
                            <h5 class="card-title name">${teddies[i].name}</h5>
                            <p class="price">${
                                teddies[i].price / 100
                            }.00 &euro;</p>
                            <p class="description"> ${
                                teddies[i].description
                            }</p>
                        </div>
                    </a>
                </div>
            `;
    }
}
