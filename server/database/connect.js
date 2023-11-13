const { Pool } = require('pg');

require('dotenv').config(); // needed for integration testing

// Connect to the database

const db = new Pool({
  connectionString: process.env.DB_URL,
});

// Exporting db

module.exports = db;
