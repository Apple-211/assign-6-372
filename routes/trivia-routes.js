/*
 * Name: Yasmin Castro
 * Date: 11/19/2026
 * CSC 372-01
 *
 * Define the API routes for the Triviabook app.
 */

let express = require('express');
let router = express.Router();

let triviaController = require('../controllers/trivia-controller');

// Route for retrieving all trivia Topics
router.get('/topics', triviaController.getTopics);

router.get('/topic/:topic', triviaController.getQuestionsByTopic);

router.get('/random', triviaController.getRandomQuestion);

router.post('/answer', triviaController.checkAnswer);

router.post('/question/add', triviaController.addQuestion);

module.exports = router;
