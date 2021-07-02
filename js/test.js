function verifyInputs(){

    // Verify mail
     if (!email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')) 

    //
}


function isEmpty(){    
    let string = document.querySelectorAll('.inputs').value;
    if( !string.replace(/\s+/, '').length ) {
        alert( "Le formulaire de commande est incomplet" );
        document.getElementById('orderCart').disabled = true;
    }
}
    