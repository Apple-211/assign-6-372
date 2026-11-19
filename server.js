/*
 * Name: Yasmin Castro
 * Date: 11/18/2026
 * CSC 372-01
 *
 * This file sets up the Express server for the Trivia book
 * application and handles incoming HTTP requests.
 */

let express = require('express');
let app = express();
let port = process.env.PORT || 3000;


let triviaRoutes = require('./routes/trivia-routes');

app.use(express.json());
app.use('/triviabook', triviaRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Triviabook!');
});


let pool = require('./db');

/**
 * Tests the connection to the PostgreSQL database.
 * @returns {Promise<void>} Resolves when the test finishes.
 */
async function testDatabaseConnection() {
  try {
    let result = await pool.query('SELECT NOW()');
    console.log('Successfully connected to Neon PostgreSQL!');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testDatabaseConnection();


// goes ahead and start the Express server.
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
