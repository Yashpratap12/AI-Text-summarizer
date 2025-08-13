// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // We'll use the path module to find the .env file
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly load environment variables from the .env file in the same directory
dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3001;

// Initialize the Gemini AI with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Configure CORS to allow requests from your frontend
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Middleware for JSON body parsing
app.use(express.json());

// Main API endpoint to summarize text
app.post('/summarize', async (req, res) => {
  try {
    const userText = req.body.text;

    if (!userText) {
      return res.status(400).json({ error: 'Text is required for summarization.' });
    }
    
    const prompt = `Please summarize the following text in a concise and clear manner, focusing on the key points.
    
    Text to summarize:
    "${userText}"
    
    Summary:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    res.json({ summary });

  } catch (error) {
    console.error('Error during AI API call:', error);
    res.status(500).json({ error: 'Failed to summarize text. Please try again.' });
  }
});

// Basic route to check if the server is running
app.get('/', (req, res) => {
  res.send('AI Text Summarizer Backend is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});