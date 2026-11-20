# Assignment-6-372

## Triviabook API:

Triviabook is a REST API built using Node.js, Express, and PostgreSQL, as required by the assignment instructions. It allows users to retrieve trivia topics (Science and Geography), get random trivia questions, check answers, view questions by topic, and add new questions.

## Installation and Setup:

1. Clone the GitHub repo in VS code
2. Installed the required dependencies: npm install
3. Created a `.env` file in the root folder
4. Added the Neon PostgreSQL connection string: DATABASE_URL= string snippet from neon goes here
5. Start the Express server: npm start
6. The server will run at: http://localhost:3000
7. Tested with EchoAPI

## Database:

NEON PostgreSQL database with two tables (topic table and questions table.)

- **topics:** `id` (Primary Key), `name` (Unique)
- **questions:** `id` (Primary Key), `topic_id` (Foreign Key), `question`, `answer`, `difficulty` (easy, medium, hard)

`topic_id` references `topics.id`

Use `schema.sql` and `seed.sql` to create and populate the database.

## API Endpoints:

- **GET /triviabook/topics** - Retrieves all available trivia topics
- **GET /triviabook/topic/:topic** - Retrieves questions for a topic
- **GET /triviabook/random** - Retrieves a random trivia question without revealing the answer
- **POST /triviabook/answer** - Checks a submitted answer 
- **POST /triviabook/question/add** - Adds a new question 

## Deployment:

Render URL: https://triviabook-api-3z5a.onrender.com


https://triviabook-api-3z5a.onrender.com/triviabook/topics — Lists available topics