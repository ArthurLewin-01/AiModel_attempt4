const chatContainer = document.getElementById("chatContainer");
const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

// Random AI replies

const aiReplies = [
"That's interesting! Tell me more.",
"I understand what you're saying.",
"Can you explain that a bit more?",
"That's a great question.",
"I'm thinking about that...",
"Let's explore that idea together.",
"Interesting point!",
"That sounds cool.",
"Good question! I'll try to help.",
"Nice! Keep going."
];

// Send Message

function sendMessage() {

const message = messageInput.value.trim();

if (message === "") return;

// Add user message

addMessage(message, "user");

messageInput.value = "";

// AI reply delay

setTimeout(() => {

const randomReply =
aiReplies[Math.floor(Math.random() * aiReplies.length)];

addMessage(randomReply, "ai");

}, 700);

}

// Add Message Function

function addMessage(text, sender) {

const messageDiv = document.createElement("div");

messageDiv.classList.add(
"chat-bubble",
"max-w-xl",
"p-4",
"rounded-xl"
);

if (sender === "user") {

messageDiv.classList.add(
"ml-auto",
"bg-blue-500",
"text-white"
);

} else {

messageDiv.classList.add(
"bg-white/10"
);

}

messageDiv.innerText = text;

chatContainer.appendChild(messageDiv);

// Auto scroll

chatContainer.scrollTop =
chatContainer.scrollHeight;

}

// Button Click

sendBtn.addEventListener("click", sendMessage);

// Press Enter

messageInput.addEventListener("keypress", function(e) {

if (e.key === "Enter") {
sendMessage();
}

});
