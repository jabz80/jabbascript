const { Pool } = require('pg');

require('dotenv').config(); // needed for integration testing

// Connect to the database

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Exporting db

module.exports = db;
