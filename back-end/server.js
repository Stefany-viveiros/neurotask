

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "NÃO CARREGOU");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ROTA IA
app.post("/ai", async (req, res) => {
  const { message } = req.body;

  // 🔒 Validação
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

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
          {
            role: "system",
            content: "Você é um assistente de produtividade direto, motivador e prático."
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 150
      })
    });

    const data = await response.json();

    // 🔥 Tratamento de erro da API
    if (!response.ok) {
      console.error("Erro OpenAI:", data);
      return res.status(500).json({ error: "Erro na API de IA" });
    }

    // ✅ Retorna só o necessário
    const aiMessage = data.choices?.[0]?.message?.content || "Sem resposta";

    res.json({ reply: aiMessage });

  } catch (error) {
    console.error("Erro no servidor:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});