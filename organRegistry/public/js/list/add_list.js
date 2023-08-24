// Get the objects we need to modify
let addListForm = document.getElementById('add-list-form-ajax');

// Modify the objects we need
addListForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrganCat = document.getElementById("input-organCat-list");

    // Get the values from the form fields
    let organCatValue = inputOrganCat.value;


    // Put our data we want to send in a javascript object
    let data = {
        organName: organCatValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "LIST/add-list-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrganCat.value = '';

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
    let currentTable = document.getElementById("list-table");


    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData.rows[parsedData.rows.length - 1]


    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let organCatCell = document.createElement("TD");


    // Fill the cells with correct data
    idCell.innerText = newRow.idOrganList;
    organCatCell.innerText = newRow.organName;


    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(organCatCell);


    // Add the row to the table
    currentTable.appendChild(row);
}