document.querySelector('.commandRecap').innerHTML = `
    <h2 class="h4">Merci pour votre commande ! Voici le récapitulatif : </h2>
    <br/>
    <p class="text-center"><strong>Numéro de commande:</strong> ${localStorage.getItem(
        'orderId'
    )}</p>
    <p class="text-center">Contenu:</p>
   
    <p class="text-center">Montant total de votre commande : <strong> ${localStorage.getItem(
        'total'
    )} ,00 &euro; </strong></p>`;
