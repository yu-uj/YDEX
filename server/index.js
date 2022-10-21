const express = require('express');
const port = 4000;
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// app.post('/connect', async (req, res) => {
//     const { Account } = req.body; //0xc041e30D61aa7b1c5FD2Ce4B9b4e6EC0d36141D9

//     const connet = new MongoDB(Defs.NAME_DB_ACCOUNT);
//     const lastid = await connet.lastId();
//     const id = lastid[0].id + 1;
//     const save = connet.insertData(id, Account);

// })

//몽고 DB 연결
const Mongoconn = require("./models");
Mongoconn();

// routing 설정
const routes = require("./routes");
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server is on ${port}...`);
})

module.exports = app;
//git clone -b server --single-branch
//git branch --server
//git remote -v -- origin
//git add .
//git commit -m "dasdasd"
//git push origin server
//git에서 풀리퀘스트 누르기