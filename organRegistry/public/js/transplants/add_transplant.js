// Citation for the following file
// Date: 08/04/2023
// Based on CS340 starter code
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/

// Get the objects we need to modify
let addTransplantForm = document.getElementById('add-transplant-form-ajax');

// Modify the objects we need
addTransplantForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDateCompleted = document.getElementById("input-dateCompleted-transplant");
    let inputZip = document.getElementById("input-zip-transplant");
    let inputSuccess = document.getElementById("input-isSuccess-transplant");
    let inputHospital = document.getElementById("input-hospital-transplant");
    let inputIdOrgan = document.getElementById("input-idOrgan-transplant");
    let inputIdRecipient = document.getElementById("input-idRecipient-transplant");


    // Get the values from the form fields
    let dateValue = inputDateCompleted.value;
    let zipValue = inputZip.value;
    let successValue = inputSuccess.value;
    let hospitalValue = inputHospital.value;
    let idOrganValue = inputIdOrgan.value;
    let idRecipient = inputIdRecipient.value;

    // Put our data we want to send in a javascript object
    let data = {
        dateCompleted: dateValue,
        zip: zipValue,
        isSuccess: successValue,
        hospital: hospitalValue,
        idOrgan: idOrganValue,
        idRecipient: idRecipient,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Transplants/add-transplant-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let newTransplants = JSON.parse(xhttp.response);
            updateTransplantsTable(newTransplants.rows);

            // Clear the input fields for another transaction
            inputDateCompleted.value = '';
            inputZip.value = '';
            inputSuccess.value = '';
            inputHospital.value = '';
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
