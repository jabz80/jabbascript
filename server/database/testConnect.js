const { Pool } = require('pg');
const fs = require('fs');
const bcrypt = require("bcrypt");

require('dotenv').config() // needed for integration testing


const testSql = fs.readFileSync(__dirname + '/testDB.sql').toString();

const resetTestDB = async () => {
  const db = new Pool({
    connectionString: process.env.DB_URL
  });

  try {

    await db.query(testSql);

    // Hash passwords
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    const passwords = await db.query("SELECT password FROM users");

    await Promise.all(passwords.rows.map(async (p) => {
      const hash = await bcrypt.hash(p.password, salt);
      await db.query("UPDATE users SET password = $1 WHERE password = $2", [hash, p.password]);
    }))


    // Close the database connection
    await db.end();

    return 'Test DB reset';
  } catch (err) {
    // Close the database connection in case of an error
    if (db) {
      db.end();
    }

    throw new Error(`Test DB reset failed: ${err.message}`);
  }
};

module.exports = { resetTestDB };