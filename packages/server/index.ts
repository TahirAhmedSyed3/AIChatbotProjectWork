import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: `OpenAI key: ${process.env.OPENAI_API_KEY}` });

});

app.get("/api/hello", (req, res) => {
  res.json({ message: `Hello World` });
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
