const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

// Chat route to handle user messages and communicate with the OpenAI API
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const botReply = await getGPTResponse(userMessage);  // Get response from GPT
  res.json({ reply: botReply });  // Send back the response
});

// Function to interact with GPT model
async function getGPTResponse(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer YOUR_API_KEY`,  // Replace with your API Key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",  // You can use the latest model available
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;  // Return the GPT response
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return "Sorry, I couldn't process your message.";  // Fallback message
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
