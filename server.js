const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const response = await getGPTResponse(userMessage);
  res.json({ reply: response });
});

async function getGPTResponse(message) {
  const response = await fetch("https://api.openai.com/v1/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer YOUR_API_KEY`,  // Replace with your API Key
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",  // You can choose the latest available model
      messages: [{ role: "user", content: message }]
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
