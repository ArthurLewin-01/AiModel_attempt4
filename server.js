const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/* API KEY from Render */
const GROQ_API_KEY = process.env.GROQ_API_KEY;

/* CHAT ROUTE */

app.post("/chat", async (req, res) => {

try {

const messages = req.body.messages;

console.log("Received:", messages);

const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${GROQ_API_KEY}`
},
body: JSON.stringify({
model: "llama-3.1-8b-instant",
messages: messages
})
}
);

const data = await response.json();

console.log("Groq Response:", data);

if (!data.choices) {

return res.json({
reply: "AI error — check logs"
});

}

res.json({
reply: data.choices[0].message.content
});

} catch (error) {

console.error("Server error:", error);

res.json({
reply: "Server error"
});

}

});

/* START SERVER */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

console.log("Server running on port", PORT);

});
