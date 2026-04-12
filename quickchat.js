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


// Sidebar Toggle (Open + Close)

sidebarToggle.onclick = () => {

sidebar.classList.toggle("open");

};


// Send Message

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

}, 700);

}


// Random Reply

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


// Add Message

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


// Save Chat When New Chat Clicked

function saveCurrentChat() {

if (currentChat.length === 0) return;

chats.push([...currentChat]);

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}


// Render History with Delete

function renderHistory() {

chatHistoryDiv.innerHTML = "";

chats.forEach((chat, index) => {

const wrapper =
document.createElement("div");

wrapper.className =
"flex justify-between items-center p-3 bg-white/10 rounded-lg";

const title =
document.createElement("span");

title.innerText =
"Chat " + (index + 1);

title.className =
"cursor-pointer";

title.onclick = () => {

loadChat(index);

};

const deleteBtn =
document.createElement("button");

deleteBtn.innerHTML =
"<i class='fas fa-trash'></i>";

deleteBtn.className =
"text-red-400 hover:text-red-300";

deleteBtn.onclick = () => {

deleteChat(index);

};

wrapper.appendChild(title);
wrapper.appendChild(deleteBtn);

chatHistoryDiv.appendChild(wrapper);

});

}


// Load Chat

function loadChat(index) {

chatContainer.innerHTML = "";

currentChat = chats[index];

currentChat.forEach(msg => {

addMessage(
msg.text,
msg.sender
);

});

sidebar.classList.remove("open");

}


// Delete Chat

function deleteChat(index) {

chats.splice(index, 1);

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}


// New Chat (Save previous first)

newChatBtn.onclick = () => {

saveCurrentChat();

currentChat = [];

chatContainer.innerHTML = "";

sidebar.classList.remove("open");

};


// Send Button

sendBtn.onclick = sendMessage;


// Enter Key

messageInput.addEventListener(
"keypress",
e => {
if (e.key === "Enter")
sendMessage();
}
);


// Load History On Start

renderHistory();
