/*
 * Name: Yasmin Castro
 * Date: 11/18/2026
 * CSC 372-01
 *
 * This file creates a connection for the
 * Triviabook PostgreSQL database that is on Neon.
 */

require('dotenv').config();

let { Pool } = require('pg');

let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
