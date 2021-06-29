btnRemove = document.querySelectorAll('.btnRemove');
btnRemove.onclick = removefromCart();

function removefromCart() {
    for (let j = 0; j < btnRemove.length; j++) {
        btnRemove.addEventListener('click', (e) => {
            e.preventDefault();

            let itemToRemove = products[i].productId;
            console.log(itemToRemove);
            document.querySelector(`.${products[i].tagKey}`).remove();
            window.location.reload();
        });
    }
}
