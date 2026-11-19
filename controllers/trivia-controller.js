/*
 * Name: Yasmin Castro
 * Date: 11/19/2026
 * CSC 372-01
 *
 * This file handles requests/responses for
 * the Triviabook API !
 */

let triviaModel = require('../models/trivia-model');

/**
 * Retrieves all trivia topics and sends them as JSON.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Resolves when the request is handled.
 */
async function getTopics(req, res) {
    try {
        let topics = await triviaModel.getAllTopics();
        res.json(topics);
    } catch (error) {
        console.error('Error retrieving topics:', error);
        res.status(500).json({
            error: 'Failed to retrieve trivia topics.'
        });
    }
}


/**
 * Retrieves trivia questions for a specified topic.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Resolves when the request is handled.
 */
async function getQuestionsByTopic(req, res) {
    try {
        let topic = req.params.topic.toLowerCase();

        let questions = await triviaModel.getQuestionsByTopic(topic);


        let difficulty = req.query.difficulty;

        if (difficulty !== undefined) {
            difficulty = difficulty.toLowerCase();

            if (!['easy', 'medium', 'hard'].includes(difficulty)) {
                return res.status(400).json({
                    error: 'Difficulty must be easy, medium, or hard.'
                });
            }

            questions = questions.filter(
                (question) => question.difficulty === difficulty
            );
        }


        let limit = req.query.limit;

        if (limit !== undefined) {
            let parsedLimit = Number(limit);

            if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
                return res.status(400).json({
                    error: 'Limit must be a positive integer.'
                });
            }

            questions = questions.slice(0, parsedLimit);
        }



        if (questions.length === 0) {
            let topics = await triviaModel.getAllTopics();

            if (!topics.includes(topic)) {
                return res.status(404).json({
                    error: 'Topic not found.'
                });
            }
        }


        res.json(questions);
    } catch (error) {
        console.error('Error retrieving questions:', error);
        res.status(500).json({
            error: 'Failed to retrieve questions.'
        });
    }
}


/**
 * Retrieves a random trivia question and sends it as JSON.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Resolves when the request is handled.
 */
async function getRandomQuestion(req, res) {
    try {
        let question = await triviaModel.getRandomQuestion();

        if (!question) {
            return res.status(404).json({
                error: 'No trivia questions available.'
            });
        }

        res.json(question);
    } catch (error) {
        console.error('Error retrieving random question:', error);
        res.status(500).json({
            error: 'Failed to retrieve a random question.'
        });
    }
}


/**
 * Checks a user's answer to a trivia question.
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Resolves when the request is handled.
 */
async function checkAnswer(req, res) {
    try {
        let { id, guess } = req.body;

        if (id === undefined || typeof guess !== 'string' ||
            guess.trim() === '') {
            return res.status(400).json({
                error: 'A question ID and guess are required.'
            });
        }

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                error: 'Question ID must be a positive integer.'
            });
        }

        let question = await triviaModel.getQuestionById(id);

        if (!question) {
            return res.status(404).json({
                error: 'Question not found.'
            });
        }

        let correct = guess.trim().toLowerCase() ===
            question.answer.trim().toLowerCase();

        res.json({
            correct: correct,
            answer: question.answer
        });
    } catch (error) {
        console.error('Error checking answer:', error);
        res.status(500).json({
            error: 'Failed to check the answer.'
        });
    }
}


/**
 * Validates and + a new trivia question!
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} Resolves when the request is handled.
 */
async function addQuestion(req, res) {
    try {
        let { topic, question, answer, difficulty } = req.body;

        if (
            typeof topic !== 'string' ||
            typeof question !== 'string' ||
            typeof answer !== 'string' ||
            typeof difficulty !== 'string' ||
            !topic.trim() ||
            !question.trim() ||
            !answer.trim() ||
            !difficulty.trim()
        ) {
            return res.status(400).json({
                error: 'Topic, question, answer, and difficulty are required.'
            });
        }

        topic = topic.trim().toLowerCase();
        question = question.trim();
        answer = answer.trim();
        difficulty = difficulty.trim().toLowerCase();

        if (!['easy', 'medium', 'hard'].includes(difficulty)) {
            return res.status(400).json({
                error: 'Difficulty must be easy, medium, or hard.'
            });
        }

        let questions = await triviaModel.addQuestion(
            topic,
            question,
            answer,
            difficulty
        );

        res.status(201).json(questions);
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({
            error: 'Failed to add the trivia question.'
        });
    }
}


module.exports = {
    getTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    checkAnswer,
    addQuestion
};


