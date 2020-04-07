var express = require('express');
var app = express();

//定义方法
app.get('/', function (req, res) {
    res.send('HellowWorld')
});
app.get('/list', function (req, res) {
    let result = {
        err: 0,
        msg: 'ok',
        data: {
            name: "hello world",
            id: req.query.id
        }
    }
    if (req.query.id !== 1) {
        result.data.name = "hello grpc";
    }
    res.send(result)
})
//定义端口，此处所用为3000端口，可自行更改
var server = app.listen(3000, function () {
    console.log('runing 3000...');
})
