function formatDate(sqlDate) {
    let date = new Date(sqlDate);
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
}

function formatYN(bool) {
    return bool === true ? 'Yes' : 'No';
}

// for the Organs table after adding and updating data
function updateOrgansTable(organs) {

    // Get table element
    let table = document.getElementById('organ-table')

    // clear the existing rows 
    for(let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    organs.forEach(organ => {
        let row = table.insertRow();
        let idCell = row.insertCell(0);
        let dateCell = row.insertCell(1);
        let availCell = row.insertCell(2);
        let donorCell = row.insertCell(3);
        let listCell = row.insertCell(4);

        // set the cell values
        idCell.innerHTML = organ.idOrgans;
        dateCell.innerHTML = formatDate(organ.dateRemoved);
        availCell.innerHTML = formatYN(organ.isAvailable);
        donorCell.innerHTML = organ.idDonor + "-" + organ.firstName + " " + organ.lastName;
        listCell.innerHTML = organ.organName;

    });
}


// for the recipients table after adding and updating
function updateRecipientsTable(recipients) {

    // Get table element
    let table = document.getElementById('recipient-table')

    // clear the existing rows 
    for(let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    recipients.forEach(recipient => {
        let row = table.insertRow();
        let idCell = row.insertCell(0);
        let firstNameCell = row.insertCell(1);
        let lastNameCell = row.insertCell(2);
        let priorityCell = row.insertCell(3);
        let bloodTypeCell = row.insertCell(4);
        let ageCell = row.insertCell(5);
        let medicalConditionCell = row.insertCell(6);
        let zipCell = row.insertCell(7);
        let organNeededCell = row.insertCell(8);
        let transplantCompleteCell = row.insertCell(9);
        let knownDonorCell = row.insertCell(10);

        // set the cell values
        idCell.innerHTML = recipient.idRecipients;
        firstNameCell.innerHTML = recipient.firstName;
        lastNameCell.innerHTML = recipient.lastName;
        priorityCell.innerHTML = recipient.priority;
        bloodTypeCell.innerHTML = recipient.bloodType;
        ageCell.innerHTML = recipient.age;
        medicalConditionCell.innerHTML = recipient.medicalCondition;
        zipCell.innerHTML = recipient.zip;
        organNeededCell.innerHTML = recipient.organName;
        transplantCompleteCell.innerHTML = formatYN(recipient.transplantCompleted);
        knownDonorCell.innerHTML = recipient.knownDonor === null ? "--": recipient.idDonors + "-" + recipient.d_fn + " " + recipient.d_ln;

    });
}


// for the transplants table after adding 
function updateTransplantsTable(transplants) {

    // Get table element
    let table = document.getElementById('transplant-table')

    // clear the existing rows 
    for(let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    transplants.forEach(transplant => {
        let row = table.insertRow();
        let idCell = row.insertCell(0);
        let dateCell = row.insertCell(1);
        let hospitalCell = row.insertCell(2);
        let zipCell = row.insertCell(3);
        let successCell = row.insertCell(4);
        let idOrganCell = row.insertCell(5);
        let idRecipientCell = row.insertCell(6);

        // set the cell values
        idCell.innerHTML = transplant.idTransplants;
        dateCell.innerHTML = formatDate(transplant.dateCompleted);
        zipCell.innerHTML = transplant.zip;
        hospitalCell.innerHTML = transplant.hospital;
        successCell.innerHTML = formatYN(transplant.isSuccess);
        idOrganCell.innerHTML = transplant.idOrgan;
        idRecipientCell.innerHTML = transplant.idRecipient + "-" + transplant.firstName + " " + transplant.lastName;       

    });
}


// for the match table after adding and updating
function updateMatchTable(matches) {

    // Get table element
    let table = document.getElementById('match-table')

    // clear the existing rows 
    for(let i = table.rows.length - 1; i > 0; i--) {
        table.deleteRow(i);
    }

    matches.forEach(match => {
        let row = table.insertRow();
        let idCell = row.insertCell(0);
        let organIDCell = row.insertCell(1);
        let recipientIDCell = row.insertCell(2);


        // set the cell values
        idCell.innerHTML = match.idMatch;
        organIDCell.innerHTML = match.idOrgan;
        recipientIDCell.innerHTML = match.idRecipient + "-" + match.firstName + " " + match.lastName;
    });
}



