import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// DEBUG da API KEY
console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY ? "OK" : "NÃO CARREGOU");

// ROTA IA
app.post("/ai", async (req, res) => {
  const { message } = req.body;

  // validação
  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Mensagem vazia" });
  }

  try {
    // 🔴 CHAMADA DA API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // 🔥 trocado pra evitar erro de acesso
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

    // 🔴 SE DER ERRO NA API
    if (!response.ok) {
      console.error("🚨 ERRO COMPLETO OPENAI:\n", JSON.stringify(data, null, 2));
      return res.status(500).json({
        error: data.error?.message || "Erro na API de IA"
      });
    }

    // 🔴 SEGURANÇA EXTRA
    if (!data.choices || data.choices.length === 0) {
      console.error("Resposta vazia:", data);
      return res.status(500).json({ error: "Sem resposta da IA" });
    }

    const aiMessage = data.choices[0].message.content;

    res.json({ reply: aiMessage });

  } catch (error) {
    console.error("💥 ERRO NO SERVIDOR:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

// SERVIDOR
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});