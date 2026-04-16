const chatContainer =
document.getElementById("chatContainer");

const messageInput =
document.getElementById("messageInput");

const sendBtn =
document.getElementById("sendBtn");

const newChatBtn =
document.getElementById("newChatBtn");

const chatHistoryDiv =
document.getElementById("chatHistory");

// Load saved chats
let chats =
JSON.parse(localStorage.getItem("chats")) || [];

let currentChat = [];

// Add message UI
function addMsg(text, sender) {

const msg =
document.createElement("div");

msg.classList.add(
"chat-bubble",
"p-4",
"rounded-xl",
"max-w-xl"
);

if (sender === "user") {

msg.classList.add(
"ml-auto",
"bg-blue-500"
);

} else {

msg.classList.add(
"bg-white/10"
);

}

msg.innerText = text;

chatContainer.appendChild(msg);

chatContainer.scrollTop =
chatContainer.scrollHeight;

}

// Send message to AI
async function sendMessage() {

const text =
messageInput.value.trim();

if (!text) return;

// Show user message
addMsg(text, "user");

currentChat.push({
role: "user",
content: text
});

messageInput.value = "";

// Show typing
addMsg("AI is typing...", "ai");

try {

const response = await fetch(
"https://ai-chat-server-ltfa.onrender.com/chat",
{
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
messages: currentChat
})
}
);

const data =
await response.json();

// Remove typing
chatContainer.lastChild.remove();

// Show reply
addMsg(data.reply, "ai");

currentChat.push({
role: "assistant",
content: data.reply
});

} catch (error) {

chatContainer.lastChild.remove();

addMsg(
"Server error. Try again.",
"ai"
);

console.error(error);

}

}

// Save chat
function saveCurrentChat() {

if (currentChat.length === 0)
return;

let title =
currentChat[0]?.content
?.substring(0, 20)
|| "New Chat";

chats.push({
title: title,
messages: [...currentChat]
});

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}

// New chat
newChatBtn.onclick = () => {

saveCurrentChat();

currentChat = [];

chatContainer.innerHTML = "";

};

// Render history
function renderHistory() {

chatHistoryDiv.innerHTML = "";

chats.forEach((chat, index) => {

const row =
document.createElement("div");

row.className =
"flex justify-between items-center p-3 bg-white/10 rounded-lg hover:bg-white/20";

const title =
document.createElement("span");

title.innerText =
chat.title;

title.className =
"cursor-pointer";

title.onclick = () => {
loadChat(index);
};

row.appendChild(title);

chatHistoryDiv.appendChild(row);

});

}

// Load chat
function loadChat(index) {

chatContainer.innerHTML = "";

currentChat =
[...chats[index].messages];

currentChat.forEach(msg => {

addMsg(
msg.content,
msg.role === "user"
? "user"
: "ai"
);

});

}

// Events
sendBtn.onclick =
sendMessage;

messageInput.addEventListener(
"keypress",
e => {

if (e.key === "Enter") {

e.preventDefault();

sendMessage();

}

}
);

// Load history
renderHistory();
