Expense Tracker

Overview
Expense Tracker is a web application designed to help users manage their personal finances with ease. Built with React for the frontend and Node.js with Express for the backend, this app provides a seamless experience for tracking expenses and viewing reports.

Key Features
React Frontend: Developed an interactive and responsive UI for tracking expenses.
Node.js & Express Backend: Implemented back-end services for handling user data efficiently.
MongoDB Integration: Achieved a 20% performance boost with fast and reliable data storage.
Chakra UI: Designed a clean and intuitive interface that enhances user experience and accessibility.
Delete Function: Added functionality to remove unwanted items from the expense list, giving users more control over their financial records.

Technologies Used
React
Node.js
Express
MongoDB
Chakra UI

![ScreenShot](/expenseTracker.png)


How to Clone and Run the Project Locally
Steps to Get Started
Clone the Repository Open your terminal and run the following command to clone the repository:


git clone [https://github.com/your-username/expense-tracker.git](https://github.com/alavyap/Expense-Tracker)

cd expense-tracker

Install Dependencies Install the necessary dependencies for both the frontend and backend by running the following commands:


# Install backend dependencies

cd server
npm install

# Install frontend dependencies

cd ../client
npm install

Configure Environment Variables Create a .env file in the backend folder and add your MongoDB connection URL. You can get this URL from your MongoDB Atlas account or your local MongoDB setup.

The MongoDB URL syntax looks like this:

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
Replace <username> with your MongoDB username.
Replace <password> with your MongoDB password.
Replace <dbname> with your MongoDB database name.
Run the Backend Server Navigate to the backend folder and start the server:


cd backend
npm start

The backend will run on http://localhost:5000.

Run the Frontend In another terminal window, navigate to the frontend folder and start the React app:

cd frontend

npm start

The frontend will run on http://localhost:3000.

Access the App Open your browser and navigate to http://localhost:3000 to use the Expense Tracker locally.

Notes
Make sure you have Node.js and npm installed on your machine.
To run the app locally, you need a working MongoDB instance and the correct connection URL added to your .env file.
