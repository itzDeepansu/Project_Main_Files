const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('index', { content: alldata });
});

let alldata="";
app.post('/save-question', (req, res) => {
    alldata=""
    const question = req.body.question;
    console.log('Received question:', question);
    const { OpenAI } = require('openai');
    
    const client = new OpenAI({ apiKey: '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' }); // Replace with your actual API key
    
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
        await (async () => {
            for await (const chunk of asyncIterable) {
                alldata+=chunk.choices[0]?.delta?.content || ""
            }
        })();
    }
    main();
    res.sendStatus(200);
});
app.get('/get-question', (req, res) => {
    console.log(alldata);
    res.json(alldata);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
