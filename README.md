# Express Server Auth

This project is a TypeScript-based Express server that connects to a PostgreSQL database and provides user-related API endpoints.

## What this project does

- Starts a server with Express
- Accepts JSON and form data
- Connects to PostgreSQL
- Creates and manages a users table
- Supports CRUD operations for users through API routes

## Packages used and how to install them

Here is the list of packages used in this project:

1. Express
   - Purpose: Creates the web server and API routes.
   - Install: `npm install express`

2. pg
   - Purpose: Connects the server to PostgreSQL and runs SQL queries.
   - Install: `npm install pg`

3. TypeScript
   - Purpose: Adds type safety to JavaScript code.
   - Install: `npm install -D typescript`

4. tsx
   - Purpose: Runs TypeScript files directly during development.
   - Install: `npm install -D tsx`

5. @types/express
   - Purpose: Provides TypeScript types for Express.
   - Install: `npm install -D @types/express`

6. @types/pg
   - Purpose: Provides TypeScript types for the pg package.
   - Install: `npm install -D @types/pg`

## How to run the project

Install all dependencies:

```bash
npm install
```

## Database setup code

This project uses this code to create the users table automatically if it does not already exist.

Why this code is used:
- It connects the server to the PostgreSQL database.
- It creates the `users` table so the app has a place to store user data.
- It helps the application start with the correct database structure.
- It prevents errors when the table already exists by using `IF NOT EXISTS`.

Example code:

```ts
const initDB = async () => {
  try {
    await pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  email VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  age INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
    `)

    console.log("Database connected successfully")
  } catch (error) {
    console.log(error)
  }
}

initDB()
```

What it does:
- connects to PostgreSQL through the `pool`
- runs a SQL query to create a `users` table
- logs a success message if the table is ready
- logs an error if the database operation fails

Start the development server:

```bash
npm run dev
```

The server will run on port 9000.
