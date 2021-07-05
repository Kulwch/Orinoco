

function verifyInputs(){

    // Verify first Name
    if (!firstName.match('/^[a-z ,.'-]+$/i')){}

    // Verify name
    else if (!lastName.match('^[a-zA-Z'-]+$')){}

    // Verify adress
    else if (!address.match('^(\d+) ?([A-Za-z](?= ))? (.*?) ([^ ]+?) ?((?<= )APT)? ?((?<= )\d*)?$')){}

    // Verify city
    else if (!city.match('^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$')){}

    // Verify mail
    else if (!email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')){} 

    else {}
}



