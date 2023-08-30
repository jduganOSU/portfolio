// ./database/db-connector.js

// Get an instance of postgres we can use in the app
const { Pool } = require('pg');

// Load environment variables (this will load the .env file into process.env)
require('dotenv').config();
console.log("dataabase url: ",process.env.DATABASE_URL);

// Create a new connection pool using the provided credentials from the .env file
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Export it for use in our application
module.exports = pool;
