// Send Message (REAL AI)

async function sendMessage() {

const text =
messageInput.value.trim();

if (!text) return;


addMessage(text, "user");

currentChat.push({
text: text,
sender: "user"
});

messageInput.value = "";


// Show typing

addMessage("AI is typing...", "ai");


// Send to server

try {

const response = await fetch(
"https://ai-chat-server-ltfa.onrender.com/",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
message: text
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
