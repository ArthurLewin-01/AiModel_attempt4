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

let chatNumber =
chats.length + 1;


// Send Message

function sendMessage() {

const text =
messageInput.value.trim();

if (!text) return;


// Add user message

addMessage(text, "user");

currentChat.push({
text,
sender: "user"
});

messageInput.value = "";


// Fake AI reply

setTimeout(() => {

const reply = randomReply();

addMessage(reply, "ai");

currentChat.push({
text: reply,
sender: "ai"
});

}, 600);

}


// Random Reply

function randomReply() {

const replies = [

"That's interesting!",
"I understand.",
"Tell me more.",
"Nice question!",
"Good idea!",
"Cool!"

];

return replies[
Math.floor(Math.random() * replies.length)
];

}


// Add Message UI

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


// Save Chat

function saveConversation() {

if (currentChat.length === 0) return;

chats.push({
id: "c" + chatNumber,
messages: [...currentChat]
});

chatNumber++;

localStorage.setItem(
"chats",
JSON.stringify(chats)
);

renderHistory();

}


// New Chat

newChatBtn.onclick = () => {

saveConversation();

currentChat = [];

chatContainer.innerHTML = "";

};


// Render History

function renderHistory() {

chatHistoryDiv.innerHTML = "";

chats.forEach((chat, index) => {

const row =
document.createElement("div");

row.className =
"flex justify-between items-center p-3 bg-white/10 rounded-lg hover:bg-white/20";


// Title

const title =
document.createElement("span");

title.innerText =
chat.id;

title.className =
"cursor-pointer";

title.onclick = () => {

loadChat(index);

};


// Delete Button

const deleteBtn =
document.createElement("button");

deleteBtn.innerHTML =
"<i class='fas fa-trash'></i>";

deleteBtn.className =
"text-red-400 hover:text-red-300";

deleteBtn.onclick = () => {

deleteChat(index);

};


row.appendChild(title);
row.appendChild(deleteBtn);

chatHistoryDiv.appendChild(row);

});

}


// Load Chat

function loadChat(index) {

chatContainer.innerHTML = "";

currentChat =
chats[index].messages;

currentChat.forEach(msg => {

addMessage(
msg.text,
msg.sender
);

});

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


// Send button

sendBtn.onclick = sendMessage;


// Enter key

messageInput.addEventListener(
"keypress",
e => {

if (e.key === "Enter") {

sendMessage();

}

}
);


// Load history on start

renderHistory();
