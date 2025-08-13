# React + Vite


# AI Text Summarizer
This is a full-stack web application that uses the Gemini API to summarize long blocks of text. The project consists of a React frontend and a Node.js Express backend.

## Key technologies used:

- Frontend: React, Vite, and CSS
- Backend: Node.js, Express, and the @google/generative-ai SDK
- API: Google Gemini 1.5 Flash

## How to Run the Project
To run this project on your local machine, you'll need to set up both the backend server and the frontend client.

# Prerequisites
Node.js: Make sure you have Node.js and npm installed.
Google Gemini API Key: You'll need a valid API key from the Google AI Studio.

* Step 1: Clone the Repository
  First, clone the project from GitHub and navigate into the project directory.

``git clone <https://github.com/Yashpratap12/AI-Text-summarizer>``
  `cd ai-text-summarizer`

* Step 2: Set Up the Backend
  Navigate into the server directory.
  `cd server`
   
- Install the required Node.js packages.
  `npm install`

* Create a file named .env in the server directory.

- Open the newly created .env file and add your Gemini API key in the following format:
 `API_KEY=your_gemini_api_key_here`

* Step 3: Set Up the Frontend
 - Open a new terminal window and navigate into the client directory.
  `cd ../client`

- Install the required frontend packages.
 `npm install`

- Start the frontend development server.
 `npm run dev`
