// Get the objects we need to modify
let addDonorForm = document.getElementById('add-donor-form-ajax');

// Modify the objects we need
addDonorForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("input-firstName-donor");
    let inputLastName = document.getElementById("input-lastName-donor");
    let inputEmail = document.getElementById("input-email-donor");
    let inputPhone = document.getElementById("input-phone-donor");
    let inputZip = document.getElementById("input-zip-donor");
    let inputBloodType = document.getElementById("input-bloodType-donor");
    let inputAge = document.getElementById("input-age-donor");


    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let bloodTypeValue = inputBloodType.value;
    let ageValue = inputAge.value;
    let zipValue = inputZip.value;
    let emailValue = inputEmail.value;
    let phoneValue = inputPhone.value;


    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        bloodType: bloodTypeValue,
        age: ageValue,
        zip: zipValue,
        email: emailValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "Donors/add-donor-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputBloodType.value = '';
            inputAge.value = '';
            inputZip.value = '';
            inputEmail.value = '';
            inputPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("donors-table");


    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData.rows[parsedData.rows.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");
    let zipCell = document.createElement("TD");
    let bloodTypeCell = document.createElement("TD");
    let ageCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.idDonors;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    phoneCell.innerText = newRow.phoneNumber;
    zipCell.innerText = newRow.zip;
    bloodTypeCell.innerText = newRow.bloodType;
    ageCell.innerText = newRow.age;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(zipCell);
    row.appendChild(bloodTypeCell);
    row.appendChild(ageCell);

    // Add the row to the table
    currentTable.appendChild(row);
}