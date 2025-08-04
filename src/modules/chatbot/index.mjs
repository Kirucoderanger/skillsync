export function renderChatbot(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Career Advice Bot</h2>
    <textarea id="chat-input" placeholder="Ask your question..."></textarea>
    <button id="chat-send">Ask</button>
    <div id="chat-response">Bot: Hello! Ask me about your career path.</div>
  `;

  document.getElementById("chat-send").onclick = () => {
    const input = document.getElementById("chat-input").value;
    document.getElementById("chat-response").innerText = "Bot: " +
      (input.toLowerCase().includes("resume") ? "Try adding measurable results!" : "Keep learning and exploring!");
  };
}
