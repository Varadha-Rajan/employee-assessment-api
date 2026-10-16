
# Employee Assessment API

A backend REST API built using Node.js, Express.js, PostgreSQL, and Sequelize.

## Features

- Assessment CRUD operations
- Input validation
- Standardized API responses
- Error handling
- Pagination and filtering
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JavaScript

## Setup

1. Clone this repository.
2. Install dependencies:

   npm install

3. Create a `.env` file using `.env.example`.
4. Configure your local PostgreSQL credentials.
5. Start the server:

   npm run dev

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/assessments` | Create assessment |
| POST | `/api/assessments/list` | List assessments |
| GET | `/api/assessments/:id` | Get assessment by ID |
| PUT | `/api/assessments/:id` | Update assessment |
| DELETE | `/api/assessments/:id` | Delete assessment |

## Security

Never commit `.env` or actual database credentials.
