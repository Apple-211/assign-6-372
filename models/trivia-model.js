/*
 * Name: Yasmin Castro
 * Date: 11/19/2026
 * CSC 372-01
 *
 * This file contains database queries for the
 * Triviabook app
 */

let pool = require('../db');

/**
 * Retrieves all trivia topics from the database.
 * @returns {Promise<Array>} A list of trivia topics.
 */
async function getAllTopics() {
  let result = await pool.query(
    'SELECT name FROM topics ORDER BY name'
  );

  return result.rows.map((row) => row.name);
}

module.exports = {
  getAllTopics
};
