// Get the objects we need to modify
let addMatchForm = document.getElementById('add-match-form-ajax');

// Modify the objects we need
addMatchForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputIdRecipient = document.getElementById("input-idRecipient-match");
    let inputIdOrgan = document.getElementById("input-idOrgan-match");


    // Get the values from the form fields
    let recipientValue = inputIdRecipient.value;
    let organValue = inputIdOrgan.value;


    // Put our data we want to send in a javascript object
    let data = {
        idRecipient: recipientValue,
        idOrgan: organValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Match/add-match-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let newMatches = JSON.parse(xhttp.response);
            updateMatchTable(newMatches.rows);

            // Clear the input fields for another transaction
            inputIdOrgan.value = '';
            inputIdRecipient.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
