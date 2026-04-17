# Task Manager Application

A simple full-stack task management web application that allows users to add tasks, view tasks, and mark tasks as completed.

This project was developed as part of a technical assessment.

## Tech Stack

- Frontend: React (Vite), JavaScript, CSS
- Backend: Node.js, Express.js
- Data Storage: In-memory JSON structure (stored in server runtime memory)

## Features

- Add a task (title + description)
- View all tasks
- Mark a task as completed
- Validate task title (cannot be empty)
- Bonus: Delete a task
- Bonus: Filter tasks by status (All, Pending, Completed)

## Project Structure

- `backend` - Express REST API
- `frontend` - React app

## API Endpoints

- `POST /tasks` - Create a task
- `GET /tasks` - Fetch all tasks
- `PUT /tasks/:id` - Mark task as completed
- `DELETE /tasks/:id` - Delete task (bonus)

## Run Locally

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs at `http://localhost:5000`.

### 2) Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Assumptions / Limitations

- Data is in-memory; restarting backend clears tasks.
- Authentication is not implemented.
- No persistent database is used in this submission.

## Optional Deployment

Not deployed in this local submission.
