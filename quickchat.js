// Send Message (REAL AI)

async function sendMessage() {

const text =
messageInput.value.trim();

if (!text) return;


// Show user message

addMessage(text, "user");

currentChat.push({
text: text,
sender: "user"
});

messageInput.value = "";


// Show typing

addMessage("AI is typing...", "ai");

try {

// Send request to YOUR Render server

const response = await fetch(
"https://ai-chat-server-ltfa.onrender.com/chat",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
messages: [
{
role: "user",
content: text
}
]
})
}
);
const data = await response.json();


// Remove typing message

chatContainer.lastChild.remove();


// Show AI reply

addMessage(data.reply, "ai");

currentChat.push({
text: data.reply,
sender: "ai"
});

} catch (error) {

chatContainer.lastChild.remove();

addMessage(
"Server error. Try again.",
"ai"
);

console.error(error);

}

}
