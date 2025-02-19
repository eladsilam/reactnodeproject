# Shai Salem And Elad Silam Project, Task #1

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# React Node Project

This project is a full-stack application that includes both frontend and backend components. The frontend is built with React, and the backend is built with Node.js and Express. The application includes user registration and login functionality with username, email, password, and role (user or admin).

## Project Structure

- `fe/`: Frontend code (React)
- `be/`: Backend code (Node.js and Express)

## Features

- User registration with username, email, password, and role
- User login with email and password
- Session management with cookies
- Backend API for user registration and login
- Database connection using MySQL

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MySQL

### Installation

1. Clone the repository:

```sh
git clone https://github.com/eladsilam/reactnodeproject.git
cd reactnodeproject
```
2. Install dependencies for the frontend:
```sh
cd fe
npm install
```

3. Install dependencies for the backend:
 ```sh
cd ../be
npm install
```

4. Create a MySQL database named final_backend.

Import the SQL dump file to set up the database schema and initial data:
```sh mysql -u your_username -p final_backend < path/to/your/sql/dump/file.sql```
Replace your_username with your MySQL username and path/to/your/sql/dump/file.sql with the path to your SQL dump file.


## Running the Application
### 1. Start the backend server
```sh
cd be
npm start
```

### 2. Start the frontend server
```sh
cd fe
npm start
```

The application should now be running on http://localhost:3000 for the frontend and http://localhost:8081 for the backend.

Register a new user by navigating to the /register page.
Log in with an existing user by navigating to the /login page.
Once logged in, the user's email will be displayed at the top right of the screen, and a "Logout" button will be available to end the session.
