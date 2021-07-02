function displayOrder() {
    const products = JSON.parse(localStorage.getItem('products'));
    // Creating the order summary
    document.querySelector('.orderSummary').innerHTML = `
    <h2 class="h4 text-center">Merci pour votre commande ! Voici le récapitulatif : </h2>
        <br/>
        <br/>
    <h3 class="text-center h5"><strong>Numéro de commande :</strong> ${localStorage.getItem(
        'orderId'
    )}</h3>
        <br/>
        <br/>
    <div class="row content">
    </div>     
    <p class="text-center mt-1">Montant total de votre commande : <strong> ${localStorage.getItem(
        'total'
    )},00 &euro; </strong></p>`;

    // Looping on products to create each product a card to be displayed
    const content = document.querySelector('.content');
    for (let i = 0; i < products.length; i++) {
        content.innerHTML += `
<div class="card col col-md-4">
    <img
        class="card-img-top"
        src="${products[i].image}"
        alt="Oh le joli nounours !"
    />
    <div class="card-body teddyInfos text-dark">
        <h5 class="card-title name">${products[i].name}</h5>
        <p class="price text-decoration-none">${products[i].price}.00 &euro;</p>
        <p class="quantity">Quantité: ${products[i].quantity}</p>
    </div>
</div>`;
    }
}
displayOrder();
