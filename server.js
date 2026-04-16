import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* 🔑 PASTE YOUR GROQ API KEY HERE */
const GROQ_API_KEY = process.env.GROQ_API_KEY;

/* CHAT ROUTE */

app.post("/chat", async (req, res) => {

try {

const messages = req.body.messages;

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

} catch (err) {

console.log("SERVER ERROR:", err);

res.json({
reply: "Server error"
});

}

});

/* TEST ROUTE */

app.get("/", (req, res) => {
res.send("Server running successfully");
});

/* START SERVER */

app.listen(3000, () => {
console.log("Server running on port 3000");
});
