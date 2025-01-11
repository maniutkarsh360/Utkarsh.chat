const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

// Store conversation history (optional, if you want to keep track of context)
let conversationHistory = [];

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  
  // Add the user's message to the conversation history
  conversationHistory.push({ role: "user", content: userMessage });

  // Get the response from GPT model
  const botReply = await getGPTResponse(conversationHistory);

  // Add the bot's reply to the conversation history
  conversationHistory.push({ role: "assistant", content: botReply });

  res.json({ reply: botReply });  // Send back the bot's reply to the frontend
});

// Function to interact with GPT API
async function getGPTResponse(messages) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_API_KEY`,  // Replace with your actual API key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",  // Or any other available model
      messages: messages,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;  // Return the GPT response
}

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
