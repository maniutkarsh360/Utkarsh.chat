const chatBox = document.getElementById("chat-box");

function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // Display user's message
  chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
  document.getElementById("user-input").value = '';

  // Send message to the backend
  fetch("/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput })
  })
  .then(response => response.json())
  .then(data => {
    const botReply = data.reply;
    chatBox.innerHTML += `<div><strong>Utkarsh AI:</strong> ${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto-scroll to the latest message
  })
  .catch(error => console.error("Error:", error));
}
