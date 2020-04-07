var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // 解析 url 参数
    var params = url.parse(req.url, true).query;
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
    res.end(JSON.stringify(result));

}).listen(3000);