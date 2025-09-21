import express from "express";
import dotenv from "dotenv";
import { chatController } from "./controllers/chat.controller";

dotenv.config();



const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

// Health check route
app.get("/", (req, res) => {
  res.json({ message: `OpenAI key loaded: ${!!process.env.OPENAI_API_KEY}` });
});

// In-memory store for conversation tracking

// Zod schema for validation


// Simple test route
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello World" });
});

// Chat endpoint
app.post("/api/chat", chatController.sendMessage);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
