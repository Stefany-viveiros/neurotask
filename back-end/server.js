import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; // 🔹 importante se Node < 18

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ai", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um assistente de produtividade inteligente." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro na IA:", error); // 🔹 mostra o erro real no terminal
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));