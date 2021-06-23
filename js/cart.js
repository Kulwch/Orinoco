function displayCart() {
    const elt = document.querySelector('#cart');
    let products = JSON.parse(localStorage.getItem('product'));

    for (let i = 0; i < products.length; i++) {
        console.log(products.length);
        console.log(products);
        elt.innerHTML += `
                <div class="col-12 col-md-6">
                    <a
    href="product.html?${products[i].idProduit}"
    class="text-decoration-none productLink"
>
    <img
        class="card-img-top img-fluid"
        src="${products[i].image}"
        alt="Oh le joli nounours !"
    />
    <div class="card-body teddyInfos text-dark">
        <h5 class="card-title name">
            ${products[i].nom}
        </h5>
        <p class="color">Couleur: ${products[i].option}
        <p class="price">Prix: 
            ${products[i].prix}.00 &euro;</p>
    </div>
</a>
                </div>
            `;

        console.log(elt);
        console.log(localStorage.getItem('product'));
    }
}

displayCart();
