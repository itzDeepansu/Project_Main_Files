const { OpenAI } = require("openai");
const client = new OpenAI({
  apiKey: "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",
});
const dat = "my name is zues";
messages = [
  {
    role: "system",
    content:
      "You are a custom data experts that specializes in giving accurate answers based on data provided to you",
  },
  {
    role: "user",
    content:
      "hi , i want to give you some data and i want you to learn from this data and afterwards give me answers specific to this data ",
  },
  {
    role: "assistant",
    content:
      "Sure, feel free to provide the data, and I'll do my best to learn from it and provide you with answers based on that data.",
  },
  {
    role: "user",
    content: dat,
  },
  {
    role: "assistant",
    content: "Hello! It's nice to meet you. How can I assist you today? If you have any questions or tasks you'd like me to help with, feel free to let me know.",
  },
];
const question = "whats my name?";
messages.push({ role: "user", content: question })
async function getans() {
  const reply = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages ,
  });
  answer = reply["choices"][0]["message"]["content"];
  messages.push({ role: "assistant", content: answer });
  
}
getans();
