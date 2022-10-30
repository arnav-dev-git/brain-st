const express = require('express');
const cors = require('cors');
const app = express();

const runModel  = require('./runModel');

app.use(cors());
app.use(express.static('web'));

app.get('/', (req, res) => {
    const options = {
        root: path.join(__dirname)
    };
    const fileName = 'web/index.html';

    res.sendFile(fileName, options);
})

app.get("/api", async (req, res) => {
    const paramsArrStr = req.query.array;
    const paramsArr = JSON.parse(paramsArrStr);
    const ans = await runModel(paramsArr);
    console.log("Ans: ", ans);
    res.send(ans);
})

app.listen(5000, () => {
    console.log("Server is running ....");
});