// Get the objects we need to modify
let updateOrganForm = document.getElementById('update-organ-form-ajax');

// Modify the objects we need
updateOrganForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrganID = document.getElementById("organSelect");
    let inputAvailability = document.getElementById("input-isAvailable-update");

    // Get the values from the form fields
    let organIDValue = inputOrganID.value;
    let availabilityValue = inputAvailability.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for homeworld

    if (isNaN(availabilityValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        organID: organIDValue,
        availability: availabilityValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "Organs/put-organ-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Parse the response
            let updatedOrgans = JSON.parse(xhttp.response);

            // Add the new data to the table
            updateOrgansTable(updatedOrgans.rows);

            // Clear the input fields for another transaction
            inputOrganID.value = '';
            inputAvailability.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
