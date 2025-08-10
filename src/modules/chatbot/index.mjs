/*const id = "containerId";
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

renderChatbot(id);
*/
export default async function chatBot() {
const chatbotpanel = document.getElementById("chatbotpanel");
document.getElementById("openchatbot").onclick = () => chatbotpanel.classList.remove("hidden");
document.getElementById("closechatbot").onclick = () => chatbotpanel.classList.add("hidden");



document.getElementById("chat-form").onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById("chat-input");
  const userMessage = input.value.trim();
  if (!userMessage) return;

  

  appendMessage("You", userMessage)
  input.value = "";

  const res = await fetch(`/.netlify/functions/chatbot?message=${encodeURIComponent(userMessage)}`);
  const data = await res.json();
  
  //const data = await fetch(res);
  //const reply = res.json();
  console.log(data);
  //const reply = result.message.content[0].text

  //const reply = await getBotReply(message);
  appendMessage("Bot", data);
}

}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  document.getElementById("chat-messages").appendChild(msg);
  msg.scrollIntoView();
}

//const openAiKey = process.env.VITE_OPENAI_API_KEY;
//const cohereKey = process.env.VITE_COHERE_KEY;

async function getBotReply1(message) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openAiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: message }],
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
}
//https://api.cohere.ai/v1/chat",
async function getBotReply(message) {
const response = await fetch("https://api.cohere.com/v2/chat", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Authorization": `Bearer ${cohereKey}`,
    "Content-Type": "application/json"
    
  },
  body: JSON.stringify({
    //model: "command-r-plus",
    model: "command-a-03-2025",
    //message: message,
    messages: [{ role: "user", content: message }],
    temperature: 0.7,
  })
});
const result = await response.json();
//return result;
//return result.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
return result.message.content[0].text;
}