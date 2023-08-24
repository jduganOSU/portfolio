// Get the objects we need to modify
let addOrganForm = document.getElementById('add-organ-form-ajax');

// Modify the objects we need
addOrganForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDateRemoved = document.getElementById("input-dateRemoved");
    let inputIsAvaialable = document.getElementById("input-isAvailable");
    let inputIdDonor = document.getElementById("input-idDonor");
    let inputIdOrganList = document.getElementById("input-organList");

    // Get the values from the form fields
    let dateRemovedValue = inputDateRemoved.value;
    let isAvailableValue = inputIsAvaialable.value;
    let idDonorValue = inputIdDonor.value;
    let idOrganListValue = inputIdOrganList.value;

    // Put our data we want to send in a javascript object
    let data = {
        dateRemoved: dateRemovedValue,
        isAvailable: isAvailableValue,
        idDonor: idDonorValue,
        idOrganList: idOrganListValue
    }

    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Organs/add-organ-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let newOrgans = JSON.parse(xhttp.response);
            updateOrgansTable(newOrgans.rows);

            // Clear the input fields for another transaction
            
            inputDateRemoved.value = '';
            inputIsAvaialable.value = '';
            inputIdDonor.value = '';
            inputIdOrganList.value = ''; 
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})