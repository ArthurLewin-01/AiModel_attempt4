const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

const sidebar =
document.getElementById("sidebar");

const sidebarToggle =
document.getElementById("sidebarToggle");

const newChatBtn =
document.getElementById("newChatBtn");

const chatHistoryDiv =
document.getElementById("chatHistory");

let chats =
JSON.parse(localStorage.getItem("chats")) || [];

let currentChat = [];

// Sidebar toggle

sidebarToggle.onclick = () => {

sidebar.classList.toggle("open");

};

// Send message

function sendMessage() {

const message =
messageInput.value.trim();

if (!message) return;

addMessage(message, "user");

currentChat.push({
text: message,
sender: "user"
});

messageInput.value = "";

setTimeout(() => {

const reply = getReply();

addMessage(reply, "ai");

currentChat.push({
text: reply,
sender: "ai"
});

saveChat();

}, 700);

}

// Random reply

function getReply() {

const replies = [
"That's interesting!",
"I understand.",
"Tell me more.",
"Nice question!",
"Cool!",
"Good idea!"
];

return replies[
Math.floor(Math.random() * replies.length)
];

}

// Add UI message

function addMessage(text, sender) {

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

// Save chat

function saveChat() {

if (currentChat.length === 0) return;

chats.push([...currentChat]);

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}

// Render history

function renderHistory() {

chatHistoryDiv.innerHTML = "";

chats.forEach((chat, index) => {

const item =
document.createElement("div");

item.className =
"p-3 bg-white/10 rounded-lg cursor-pointer";

item.innerText =
"Chat " + (index + 1);

chatHistoryDiv.appendChild(item);

});

}

// New Chat (no deletion)

newChatBtn.onclick = () => {

currentChat = [];

chatContainer.innerHTML = "";

};

// Send

sendBtn.onclick = sendMessage;

messageInput.addEventListener(
"keypress",
e => {
if (e.key === "Enter")
sendMessage();
}
);

// Load history

renderHistory();
