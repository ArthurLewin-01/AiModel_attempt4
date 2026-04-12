// Elements

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


// Load chats from storage

let chats =
JSON.parse(localStorage.getItem("chats")) || [];

let currentChat = [];


// Fake AI Replies

function getReply() {

const replies = [

"That's interesting!",
"I understand.",
"Tell me more.",
"Nice question!",
"Good idea!",
"Cool!",
"Can you explain more?"

];

return replies[
Math.floor(Math.random() * replies.length)
];

}


// Send Message

function sendMessage() {

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


// Fake AI reply

setTimeout(() => {

const reply =
getReply();

addMessage(reply, "ai");

currentChat.push({
text: reply,
sender: "ai"
});

}, 600);

}


// Add message to UI

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


// Save current chat

function saveCurrentChat() {

if (currentChat.length === 0) return;


// Chat title from first message

let title =
currentChat[0]?.text
?.substring(0, 20) || "New Chat";


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


// New Chat

newChatBtn.addEventListener("click", () => {

saveCurrentChat();

currentChat = [];

chatContainer.innerHTML = "";

});


// Render chat history

function renderHistory() {

chatHistoryDiv.innerHTML = "";

chats.forEach((chat, index) => {

const row =
document.createElement("div");

row.className =
"flex justify-between items-center p-3 bg-white/10 rounded-lg hover:bg-white/20";


// Chat title

const title =
document.createElement("span");

title.innerText =
chat.title;

title.className =
"cursor-pointer";

title.onclick = () => {

loadChat(index);

};


// Delete button

const deleteBtn =
document.createElement("button");

deleteBtn.innerHTML =
"<i class='fas fa-trash'></i>";

deleteBtn.className =
"text-red-400 hover:text-red-300";

deleteBtn.onclick = () => {

deleteChat(index);

};


// Append

row.appendChild(title);
row.appendChild(deleteBtn);

chatHistoryDiv.appendChild(row);

});

}


// Load old chat

function loadChat(index) {

chatContainer.innerHTML = "";

currentChat =
[...chats[index].messages];

currentChat.forEach(msg => {

addMessage(
msg.text,
msg.sender
);

});

}


// Delete chat

function deleteChat(index) {

chats.splice(index, 1);

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}


// Send button

sendBtn.addEventListener(
"click",
sendMessage
);


// Enter key

messageInput.addEventListener(
"keypress",
e => {

if (e.key === "Enter") {

sendMessage();

}

}
);


// Load history at start

renderHistory();
