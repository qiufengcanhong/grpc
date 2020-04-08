const express = require('express');
const app = express();
let { employees } = require('./data.js');
app.get('/', function (req, res) {
    const { id } = req.query;    
    let result = {
        err: 0,
        msg: 'ok',
        data: {
            name: "hello world",
            id,
            employees
        }
    }
    if (+id !== 1) {
        result.data.name = "hello grpc";
    }
    res.end(JSON.stringify(result));
})
app.listen(3000, () => {
    console.log('服务启动...');
})
