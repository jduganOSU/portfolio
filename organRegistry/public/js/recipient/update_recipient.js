// Citation for the following file
// Date: 08/04/2023
// Based on CS340 starter code
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/

// Get the objects we need to modify
let updateRecipientForm = document.getElementById('update-recipient-form-ajax');

// Modify the objects we need
updateRecipientForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputRecipientId = document.getElementById("input-recipientID-recipient");
    let inputKnownDonor = document.getElementById("update-knownDonor-recipient");

    // Get the values from the form fields
    let recipientIdValue = inputRecipientId.value;
    let knownDonorValue = inputKnownDonor.value;
    if (knownDonorValue === 'none') {
        knownDonorValue = null;
    }

    // Put our data we want to send in a javascript object
    let data = {
        recipientID: recipientIdValue,
        knownDonor: knownDonorValue,
    }
    

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "Recipients/put-recipient-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Parse the response
            let updatedRecipients = JSON.parse(xhttp.response);

            updateRecipientsTable(updatedRecipients.rows);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

