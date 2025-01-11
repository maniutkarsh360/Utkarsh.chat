const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // Display user's message
  chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
  document.getElementById("user-input").value = '';

  // Call the GPT model (This is just a placeholder for actual API call)
  fetchGPTResponse(userInput);
}

function fetchGPTResponse(userInput) {
  // Simulating GPT response (Replace with real API call)
  const gptResponse = `Utkarsh AI: I received your message: ${userInput}`;

  // Display GPT's response
  setTimeout(() => {
    chatBox.innerHTML += `<div><strong>Utkarsh AI:</strong> ${gptResponse}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}
