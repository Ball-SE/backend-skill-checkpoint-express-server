# Q&A Platform API

A RESTful API for a Question and Answer platform built with Express.js and PostgreSQL. This API allows users to create questions, provide answers, and vote on both questions and answers.

## 🚀 Features

- **Questions Management**: Create, read, update, delete, and search questions
- **Answers System**: Add answers to questions and manage them
- **Voting System**: Vote on questions and answers
- **Search & Filter**: Search questions by title and filter by category
- **Input Validation**: Comprehensive validation for all endpoints
- **PostgreSQL Integration**: Robust database connectivity with connection pooling

## 📋 API Endpoints

### Questions
- `POST /questions` - Create a new question
- `GET /questions` - Get all questions
- `GET /questions/search?title=&category=` - Search questions by title and category
- `GET /questions/:questionId` - Get a specific question
- `PUT /questions/:questionId` - Update a question
- `DELETE /questions/:questionId` - Delete a question (and all its answers)

### Answers
- `POST /questions/:questionId/answers` - Add an answer to a question
- `GET /questions/:questionId/answers` - Get all answers for a question
- `DELETE /questions/:questionId/answers` - Delete all answers for a question

### Voting
- `POST /questions/:questionId/vote` - Vote on a question
- `POST /answers/:answerId/vote` - Vote on an answer

### Health Check
- `GET /test` - Server health check endpoint

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Database Driver**: pg (node-postgres)
- **Development**: nodemon for auto-restart

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Ball-SE/backend-skill-checkpoint-express-server.git
   cd backend-skill-checkpoint-express-server
   ```

2. **Install dependencies**
   ```bash
   npm install express nodemon pg
   ```

3. **Set up PostgreSQL database**
   - Create a PostgreSQL database named `question`
   - Update the connection string in `utils/db.mjs` if needed:
     ```javascript
     const connectionPool = new Pool({
       connectionString: "postgresql://postgres:0864072737@localhost:5432/question",
     });
     ```

4. **Create database tables**
   You'll need to create the following tables in your PostgreSQL database:
   
   ```sql
   -- Questions table
    CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(255)
    );

   -- Answers table
    CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    content TEXT
    );

   -- Question votes table
    CREATE TABLE IF NOT EXISTS question_votes (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
    vote INTEGER CHECK (vote = 1 OR vote = -1)
    );

   -- Answer votes table
    CREATE TABLE IF NOT EXISTS answer_votes (
    id SERIAL PRIMARY KEY,
    answer_id INTEGER REFERENCES answers(id) ON DELETE CASCADE,
    vote INTEGER CHECK (vote = 1 OR vote = -1)
    );
   ```

## 🚀 Running the Application

1. **Start the development server**
   ```bash
   npm run start
   ```

2. **The server will start on port 4000**
   - API Base URL: `http://localhost:4000`
   - Health Check: `http://localhost:4000/test`

## 📝 API Usage Examples

### Create a Question
```Postman
    POST http://localhost:4000/questions 
 '{
    "title": "How to implement authentication?",
    "description": "I need help implementing JWT authentication in my Express app",
    "category": "Authentication"
  }'
```

### Get All Questions
```Postman
    GET http://localhost:4000/questions
```

### Search Questions
```Postman
    GET "http://localhost:4000/questions/search?title=authentication&category=Authentication"
```

### Add an Answer
```Postman
    POST http://localhost:4000/questions/1/answers
  '{
    "content": "You can use the jsonwebtoken library to implement JWT authentication"
  }'
```

### Vote on a Question
```Postman
    POST http://localhost:4000/questions/1/vote
  '{
    "vote": 1
  }'
```

## 🔧 Project Structure

```
backend-skill-checkpoint-express-server/
├── app.mjs                 # Main application entry point
├── package.json           # Dependencies and scripts
├── routes/                # API route handlers
│   ├── questions.mjs      # Question-related endpoints
│   ├── answers.mjs        # Answer-related endpoints
│   └── vote.mjs          # Voting endpoints
├── middlewares/           # Validation middleware
│   ├── question.validation.mjs
│   ├── answers.validation.mjs
│   └── vote.validation.mjs
└── utils/
    └── db.mjs            # Database connection configuration
```

## ✅ Validation Rules

- **Questions**: Must have title, description, and category
- **Answers**: Must have content (max 300 characters)
- **Votes**: Must have a vote value

## 🐛 Error Handling

The API returns appropriate HTTP status codes and error messages:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## 📞 Support

If you encounter any issues or have questions, please open an issue in the repository.
