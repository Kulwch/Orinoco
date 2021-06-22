console.log(product);

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
