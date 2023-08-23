// Citation for the following file
// Date: 08/04/2023
// Based on CS340 starter code
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/

// Get the objects we need to modify
let addRecipientForm = document.getElementById('add-recipient-form-ajax');

// Modify the objects we need
addRecipientForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName-recipient");
    let inputLastName = document.getElementById("input-lastName-recipient");
    let inputPriority = document.getElementById("input-priority-recipient");
    let inputBloodType = document.getElementById("input-bloodType-recipient");
    let inputAge = document.getElementById("input-age-recipient");
    let inputMedicalCondition = document.getElementById("input-medicalCondition-recipient");
    let inputZip = document.getElementById("input-zip-recipient");
    let inputOrganNeeded = document.getElementById("input-organNeeded-recipient");
    let inputTransplantComplete = document.getElementById("input-transplantComplete-recipient");
    let inputKnownDonor = document.getElementById("input-knownDonor-recipient");

    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let priorityValue = inputPriority.value;
    let bloodTypeValue = inputBloodType.value;
    let ageValue = inputAge.value;
    let medicalConditionValue = inputMedicalCondition.value;
    let zipValue = inputZip.value;
    let organNeededValue = inputOrganNeeded.value;
    let transplantCompleteValue = inputTransplantComplete.value;
    let knownDonorValue = inputKnownDonor.value;
    if (knownDonorValue === 'none') {
        knownDonorValue = null;
    }

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        priority: priorityValue,
        bloodType: bloodTypeValue,
        age: ageValue,
        medicalCondition: medicalConditionValue,
        zip: zipValue,
        organNeeded: organNeededValue,
        transplantCompleted: transplantCompleteValue,
        knownDonor: knownDonorValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Recipients/add-recipient-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let newRecipients = JSON.parse(xhttp.response);
            updateRecipientsTable(newRecipients.rows);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputPriority.value = '';
            inputBloodType.value = '';
            inputAge.value = '';
            inputMedicalCondition.value = '';
            inputZip.value = '';
            inputOrganNeeded.value = '';
            inputTransplantComplete.value = '';
            inputKnownDonor.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})
