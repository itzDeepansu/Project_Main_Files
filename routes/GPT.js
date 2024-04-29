const express = require('express')
const router = express.Router()
module.exports = router
router.get('/', (req, res) => {
    
    const { OpenAI } = require('openai');
    
    const client = new OpenAI({ apiKey: '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' }); // Replace with your actual API key
    
    const question = "What is DSA";
    async function main() {
        const stream = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: question }
            ],
            stream: true
        });
        async function createAsyncIterableFromStream(stream) {
            const iterator = stream[Symbol.asyncIterator]();
    
            return {
                async next() {
                    const { done, value } = await iterator.next();
                    return { done, value };
                },
                [Symbol.asyncIterator]() {
                    return this;
                }
            };
        }
        const asyncIterable = await createAsyncIterableFromStream(stream);
        (async () => {
            for await (const chunk of asyncIterable) {
                process.stdout.write(chunk.choices[0]?.delta?.content || "");
            }
        })();
    }
    main()
    res.send("Done")
})
