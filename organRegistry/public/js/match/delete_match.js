// Citation for the following file
// Date: 08/04/2023
// Based on CS340 starter code
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main/

function deleteMatch(idMatch) {
    // Put our data we want to send in a javascript object
    let data = {
        idMatch: idMatch
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "Match/delete-match-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // delete data from the table
            deleteRow(idMatch);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}


function deleteRow(data){

    let table = document.getElementById("match-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-id") == data) {
            table.deleteRow(i);
            break;
       }
    }
}