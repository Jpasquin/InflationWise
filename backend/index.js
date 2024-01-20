// app.js
const apiKey = "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";
import OpenAI from "openai";
import express from "express";
import cors from "cors";

const app = express();
const openai = new OpenAI({ apiKey: apiKey });

const port = process.env.PORT || 3000;

app.use(cors());
app.get("/", (req, res) => {
  main();
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("API Running on http://localhost:3000");
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant. Write 3 good paragraphs about AI" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
}
