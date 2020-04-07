
var express = require('express');
var app = express();

app.get('/', function (req, res) {
    console.log(req.params);
    
})

var server = app.listen(3000)
http2.createServer(options, (request, response) => {
    var params = url.parse(request.url, true).query;
    let result = {
        err: 0,
        msg: 'ok',
        data: {
            name: "hello world",
            id: params.id
        }
    }
    if (params.id !== 1) {
        result.data.name = "hello grpc";
    }
    response.end(JSON.stringify(result));
}).listen(8080);
