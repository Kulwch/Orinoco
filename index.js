async function getTeddies() {
    try {
        let response = await fetch('http://localhost:3000/api/teddies');
        if (response.ok) {
            let teddies = await response.json();
            displayTeddiesCards(teddies);
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

function displayTeddiesCards(teddies) {
    const element = document.querySelector('#productsList');

    for (let i = 0; i < teddies.length; i++) {
        // looping on the array length to create as many div as needed

        element.innerHTML += `
                <div class="col-6 col-lg-4 mx-auto productCard list-group-item">
                    <a
                        href="product.html?${teddies[i]._id}"
                        class="col-6 col-lg-4 text-decoration-none productLink"
                    >
                        <img class="card-img-top" src="${
                            teddies[i].imageUrl
                        }" />
                        <div class="card-body teddyInfos">
                            <h5 class="card-title name">${teddies[i].name}</h5>
                            <a class="btn mx-auto addToCart" href="cart.html">
                                <img src="./cart_ico32.ico" class="cartIcon" />
                            </a>
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

getTeddies();
