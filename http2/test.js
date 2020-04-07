const http2 = require('http2');
const fs = require('fs');
const client = http2.connect('https://localhost:8443', {
    ca: fs.readFileSync('./crt.pem')
});
client.on('error', (err) => console.error(err));
req.setEncoding('utf8');
let data = '';
req.on('data', (chunk) => { data += chunk; });
req.on('end', () => {
    client.close();
});
req.end();