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


/**
 * Retrieves all Q's for a specific trivia topic.
 * @param {string} topic - The name of the trivia topic.
 * @returns {Promise<Array>} Questions belonging to the topic.
 */
async function getQuestionsByTopic(topic) {
    let result = await pool.query(
        `SELECT questions.id, questions.question,
            questions.answer, questions.difficulty
     FROM questions
     JOIN topics ON questions.topic_id = topics.id
     WHERE topics.name = $1
     ORDER BY questions.id`,
        [topic]
    );

    return result.rows;
}


/**
 * Retrieves 1 random trivia question withOUT its answer.
 * @returns {Promise<Object|undefined>} A random trivia question.
 */
async function getRandomQuestion() {
    let result = await pool.query(
        `SELECT questions.id, questions.question,
            questions.difficulty, topics.name AS topic
     FROM questions
     JOIN topics ON questions.topic_id = topics.id
     ORDER BY RANDOM()
     LIMIT 1`
    );

    return result.rows[0];
}


/**
 * Gets a trivia question by its ID.
 * @param {number} id - The ID of the trivia question.
 * @returns {Promise<Object|undefined>} The matching question.
 */
async function getQuestionById(id) {
    let result = await pool.query(
        `SELECT id, question, answer, difficulty
     FROM questions
     WHERE id = $1`,
        [id]
    );

    return result.rows[0];
}


/**
 * Adds a trivia question, creating its topic if necessary.
 * @param {string} topic - trivia topic name.
 * @param {string} question - trivia question.
 * @param {string} answer - correct answer.
 * @param {string} difficulty - question difficulty.
 * @returns {Promise<Array>} Updated questions for the topic.
 */
async function addQuestion(topic, question, answer, difficulty) {
    let client = await pool.connect();

    try {
        await client.query('BEGIN');

        let topicResult = await client.query(
            `INSERT INTO topics (name)
       VALUES ($1)
       ON CONFLICT (name)
       DO UPDATE SET name = EXCLUDED.name
       RETURNING id`,
            [topic]
        );

        let topicId = topicResult.rows[0].id;

        await client.query(
            `INSERT INTO questions (topic_id, question, answer, difficulty)
       VALUES ($1, $2, $3, $4)`,
            [topicId, question, answer, difficulty]
        );

        let result = await client.query(
            `SELECT id, question, answer, difficulty
       FROM questions
       WHERE topic_id = $1
       ORDER BY id`,
            [topicId]
        );

        await client.query('COMMIT');
        return result.rows;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    getAllTopics,
    getQuestionsByTopic,
    getRandomQuestion,
    getQuestionById,
    addQuestion
};


