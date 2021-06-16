async function getTeddies() {
    try {
        let response = await fetch('http://localhost:3000/api/teddies');
        if (response.ok) {
            let teddies = await response.json();
            createTeddiesCards(teddies);
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

getTeddies();

function createTeddiesCards(teddies) {
    for (let i = 0; i < teddies.length; i++) {
        // looping on the array length to create as many div as needed

        const productLink = document.createElement('a');
        let element = document.getElementById('productsList');
        element
            .appendChild(productLink)
            .classList.add(
                'col-6',
                'col-lg-4',
                'productCard',
                'mx-auto',
                'list-group-item'
            );
        productLink.setAttribute('href', 'product.html');

        const newImg = document.createElement('img');
        let image = document.getElementsByClassName('productCard')[i];
        image.appendChild(newImg).classList.add('card-img-top', 'teddyPicture');
        let imgSrc = document.getElementsByClassName('teddyPicture')[i];
        imgSrc.setAttribute('src', teddies[i].imageUrl);

        const productInfos = document.createElement('div');
        let elt = document.getElementsByClassName('productCard')[i];
        elt.insertAdjacentElement('beforeend', productInfos).classList.add(
            'card-body',
            'teddyInfos'
        );

        const cardTitle = document.createElement('h5');
        let card = document.getElementsByClassName('card-body')[i];
        card.appendChild(cardTitle).classList.add('card-title', 'name');
        cardTitle.innerText = teddies[i].name;

        const addToCartButton = document.createElement('a');
        card.insertAdjacentElement('beforeend', addToCartButton).setAttribute(
            'href',
            'cart.html'
        );
        addToCartButton.classList.add('btn', 'mx-auto', 'addToCart');

        const cartIcon = document.createElement('img');
        let cartBtn = document.getElementsByClassName('addToCart')[i];
        cartBtn.appendChild(cartIcon).setAttribute('src', './cart_ico32.ico');
        cartIcon.classList.add('cartIcon');

        const price = document.createElement('p');
        let cardP = document.getElementsByClassName('card-body')[i];
        cardP.insertAdjacentElement('beforeend', price).classList.add('price');
        price.innerText = euro.format(teddies[i].price / 100);

        const description = document.createElement('p');
        cardP
            .insertAdjacentElement('beforeend', description)
            .classList.add('description');
        description.innerText = teddies[i].description;
    }
}

const euro = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
});

async function getThisTeddy(id) {
    try {
        let response = await fetch('http://localhost:3000/api/teddies/id');
        if (response.ok) {
            let teddy = await response.json();
            displayTeddyInfos(teddy);
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}
getThisTeddy(id);
