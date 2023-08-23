const pool = require('./db-connector');


function getOrgansPage() {
    return new Promise((resolve, reject) => {
        const query = `SELECT "Organs".*, "OrganList"."organName", "Donors"."firstName", "Donors"."lastName", "Donors"."idDonors" 
               FROM "Organs"
               JOIN "OrganList" ON "Organs"."idOrganList" = "OrganList"."idOrganList"
               JOIN "Donors" ON "Organs"."idDonor" = "Donors"."idDonors"
               ORDER BY "Organs"."idOrgans"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}

function getOrgans(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "Organs" ORDER BY "Organs"."idOrgans"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getDonorsPage(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "Donors"
                        ORDER BY "Donors"."idDonors"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getDonors(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "Donors"`
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}

function getRecipientsPage(){
    return new Promise((resolve, reject) => {
        const query = `SELECT 
                            "Recipients".*, 
                            "OrganList"."organName", 
                            "Donors"."firstName" AS "d_fn", 
                            "Donors"."lastName" AS "d_ln", 
                            "Donors"."idDonors"
                            FROM 
                                "Recipients"
                            JOIN 
                                "OrganList" ON "Recipients"."organNeeded" = "OrganList"."idOrganList"
                            LEFT JOIN 
                                "Donors" ON "Recipients"."knownDonor" = "Donors"."idDonors"
                            ORDER BY 
                                "Recipients"."idRecipients"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getRecipients(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "Recipients"
                        ORDER BY "idRecipients"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getTransplantsPage(){
    return new Promise((resolve, reject) => {
        const query = `SELECT "Transplants".*, "Organs"."idOrgans", "Recipients"."firstName", "Recipients"."lastName", "Recipients"."idRecipients"
                        FROM "Transplants"
                        JOIN "Organs" ON "Transplants"."idOrgan" = "Organs"."idOrgans"
                        JOIN "Recipients" ON "Transplants"."idRecipient" = "Recipients"."idRecipients"
                        ORDER BY "Transplants"."idTransplants"`;
        pool.query(query, (error, results) => {
            console.log(results);
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getTransplants(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "Transplants"`
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
            console.log("Fetched transplants: ", results.rows);
        });
    });
}


function getOrganListPage(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "OrganList"
                        ORDER BY "OrganList"."idOrganList"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getOrganList(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "OrganList"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getMatchPage(){
    return new Promise((resolve, reject) => {
        const query = `SELECT 
        "OrganRecipientMatch".*, 
        "Recipients"."idRecipients", 
        "Recipients"."firstName", 
        "Recipients"."lastName"
    FROM 
        "OrganRecipientMatch"
    JOIN 
        "Recipients" ON "OrganRecipientMatch"."idRecipient" = "Recipients"."idRecipients"
    ORDER BY 
        "OrganRecipientMatch"."idMatch"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}


function getMatch(){
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM "OrganRecipientMatch" ORDER BY "OrganRecipientMatch"."idMatch"`;
        pool.query(query, (error, results) => {
            if (error) reject(error);
            else resolve(results);
        });
    });
}

// ORGAN DML
function addOrgan(data){
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "Organs" ("dateRemoved", "isAvailable", "idDonor", "idOrganList") VALUES ($1, $2, $3, $4)`;
        

        let values = [data.dateRemoved, data.isAvailable, data.idDonor, data.idOrganList];
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}


function updateOrgan(data){
    return new Promise((resolve, reject) => {
        const query = `UPDATE "Organs" SET "isAvailable" = $1 WHERE "Organs"."idOrgans" = $2`;

        let values = [data.availability, data.organID]
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}


function deleteOrgan(organID) {
    return new Promise(async (resolve, reject) => {
        const client = await pool.connect();

        try {
            await client.query('BEGIN'); // Start the transaction

            await client.query(`DELETE FROM "OrganRecipientMatch" WHERE "idOrgan" = $1`, [organID]);
            await client.query(`DELETE FROM "Transplants" WHERE "idOrgan" = $1`, [organID]);
            await client.query(`DELETE FROM "Organs" WHERE "idOrgans" = $1`, [organID]);

            await client.query('COMMIT'); // Commit the transaction
            resolve();
        } catch (e) {
            await client.query('ROLLBACK'); // Rollback the transaction on error
            reject(e);
        } finally {
            client.release(); // Return the client to the pool
        }
    });
}



// RECIPIENT DML
function addRecipient(data) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO "Recipients" 
                ("firstName", "lastName", "priority", "bloodType", "age", "medicalCondition", "zip", 
                "organNeeded", "transplantCompleted", "knownDonor")
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
        `;

        let values = [
            data.firstName, 
            data.lastName, 
            data.priority, 
            data.bloodType, 
            data.age, 
            data.medicalCondition,
            data.zip, 
            data.organNeeded, 
            data.transplantCompleted, // Ensure that the property name in your data object matches this.
            data.knownDonor
        ];

        pool.query(query, values, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


function updateRecipient(data){
    return new Promise((resolve, reject) => {
        const query = `UPDATE "Recipients" SET "knownDonor" = $1 WHERE "Recipients"."idRecipients" = $2`;

        let values = [data.knownDonor, data.recipientID]
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}


// DONORS DML
function addDonor(data) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO "Donors" 
                ("firstName", "lastName", "email", "phoneNumber", "zip", "bloodType", "age")
            VALUES 
                ($1, $2, $3, $4, $5, $6, $7);
        `;

        let values = [
            data.firstName, 
            data.lastName, 
            data.email, 
            data.phone, 
            data.zip, 
            data.bloodType, 
            data.age
        ];

        pool.query(query, values, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


// TRANSPLANTS DML
function addTransplant(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO "Transplants" 
                ("dateCompleted", "zip", "isSuccess", "hospital", "idOrgan", "idRecipient")
            VALUES 
                ($1, $2, $3, $4, $5, $6)`;

        let values = [
            data.dateCompleted, 
            data.zip, 
            data.isSuccess, 
            data.hospital, 
            data.idOrgan, 
            data.idRecipient
        ];

        pool.query(query, values, (error) => {
            if (error) { 
                console.error("database error: ", error);
                reject(error);
            }
            else resolve();
        });
    });
}


// MATCH DML
function addMatch(data){
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "OrganRecipientMatch" ("idRecipient", "idOrgan") VALUES ($1,$2)`;

        let values = [data.idRecipient, data.idOrgan];
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}


function updateMatch(data){
    return new Promise((resolve, reject) => {
        const query = `UPDATE "OrganRecipientMatch" SET "idRecipient" = $1, "idOrgan" = $2 
        WHERE "OrganRecipientMatch"."idMatch" = $3`;

        let values = [data.recipientID, data.organID, data.matchID];
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}


function deleteMatch(data){
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM "OrganRecipientMatch" WHERE "OrganRecipientMatch"."idMatch" = $1`;

        let values = [data.idMatch];
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}

// ORGAN LIST DML
function addOrganList(data) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO "OrganList" ("organName") VALUES ($1)`;

        let values = [data.organName]
        pool.query(query, values, (error) => {
            if (error) reject(error);
            else resolve();
        });
    });
}



module.exports = {
    getOrgansPage,
    getDonorsPage,
    getRecipientsPage,
    getTransplantsPage,
    getOrganListPage,
    getMatchPage,
    getOrgans,
    getDonors,
    getRecipients,
    getTransplants,
    getOrganList,
    getMatch,
    addOrgan, 
    updateOrgan, 
    deleteOrgan, 
    addRecipient, 
    updateRecipient,
    addDonor, 
    addTransplant, 
    addMatch,
    updateMatch,
    deleteMatch, 
    addOrganList
};