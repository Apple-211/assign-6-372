/*
 * Name: Yasmin Castro
 * Date: 11/19/2026
 * CSC 372-01
 *
 * Creates the topics & questions tables for
 * the Triviabook PostgreSQL database. * Refrence for later *
 */

CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(id),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    difficulty VARCHAR(10) NOT NULL
        CHECK (difficulty IN ('easy', 'medium', 'hard'))
);
