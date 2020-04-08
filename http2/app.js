const fs = require('fs')
const path = require('path')
const http2 = require('http2')


const server = http2.createSecureServer({
    cert: fs.readFileSync(path.join(__dirname, './crt.pem')),
    key: fs.readFileSync(path.join(__dirname, './key.pem'))
});

server.on('error', (err) => console.error(err));

server.on('stream', (stream, headers) => {
    const { id } = headers;
    let result = {
        err: 0,
        msg: 'ok',
        data: {
            name: "hello world",
            id
        }
    }
    if (+id !== 1) {
        result.data.name = "hello grpc";
    }
    stream.end(JSON.stringify(result));
});
server.listen(3001);
