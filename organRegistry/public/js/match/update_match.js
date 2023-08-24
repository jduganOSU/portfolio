// Get the objects we need to modify
let updateMatchForm = document.getElementById('update-match-form-ajax');

// Modify the objects we need
updateMatchForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputMatchID = document.getElementById("input-matchID-match");
    let inputRecipientID = document.getElementById("update-recipientID-match");
    let inputOrganID = document.getElementById("update-organID-match");


    // Get the values from the form fields
    let matchIDValue = inputMatchID.value;
    let recipientIDValue = inputRecipientID.value;
    let organIDValue = inputOrganID.value;
   

    // Put our data we want to send in a javascript object
    let data = {
        matchID: matchIDValue,
        recipientID: recipientIDValue,
        organID: organIDValue
    }
    

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "Match/put-match-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Parse the response
            let updatedMatches = JSON.parse(xhttp.response);

            // Add the new data to the table
            updateMatchTable(updatedMatches.rows);

            // Clear the input fields for another transaction
            inputMatchID.value = '';
            inputOrganID.value = '';
            inputRecipientID.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

