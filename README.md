# Student Management REST API

Lab Assignment 2 – Web Dev III (Node.js & Express Backend), Unit 2.

A REST API built with **Node.js + Express** to perform CRUD operations on student
records. Data is stored in an in-memory **array / JSON** (no database, no Mongoose).

## Project Structure

```
student-management-api/
├── app.js                      # Express server setup
├── routes/
│   └── studentRoutes.js        # Modular student routes (CRUD)
├── middleware/
│   └── logger.js               # Custom logger middleware
├── data/
│   └── students.js             # In-memory student data
├── Student_API.postman_collection.json
├── package.json
└── README.md
```

## How to Run

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`

## API Endpoints

| Method | Endpoint         | Description          | Success | Errors   |
|--------|------------------|----------------------|---------|----------|
| GET    | `/students`      | Get all students     | 200     | –        |
| GET    | `/students/:id`  | Get student by ID    | 200     | 400, 404 |
| POST   | `/students`      | Add a new student    | 201     | 400      |
| PUT    | `/students/:id`  | Update a student     | 200     | 400, 404 |
| DELETE | `/students/:id`  | Delete a student     | 200     | 400, 404 |

### Sample Request Body (POST / PUT)

```json
{ "name": "Neha", "course": "BCA" }
```

## Status Codes

- **200** Success
- **201** Created
- **400** Bad Request (invalid ID / missing or invalid fields / malformed JSON)
- **404** Not Found (student or route does not exist)
- **500** Internal Server Error

## Middleware

`logger.js` logs the HTTP method, URL and timestamp of every request:

```
[2026-10-05T10:00:00.000Z] GET /students
```

## Testing with Postman

Import `Student_API.postman_collection.json` into Postman and run each request.
