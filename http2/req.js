const fs = require('fs');
const path = require('path');
const http2 = require('http2');

const taskList = [];
console.log('请求数据中...');
const start = new Date().getTime();
let count = 0;
let success = 0;
let error = 0;
let times = 1000;

const client = http2.connect('https://localhost:3001/', {
    ca: fs.readFileSync(path.join(__dirname, './crt.pem'))
});
for (let i = 0; i < times; i++) {
    taskList[i] = new Promise((resolve, reject) => {
        let req = client.request({ ':path': '/link', id: 1 });
        req.setEncoding('utf8');
        let data = '';
        req.on('data', (chunk) => { data += chunk; });
        req.on('error', () => {
            count++;
            error++;
            resolve({ count, success, error });
        })
        req.on('end', () => {
            count++;
            success++;
            resolve({ count, success, error });
            req.end();
            req = null;
        });
    })
}
Promise.all(taskList)
    .then(result => {
        client.close();
        console.log('count:' + count);
        console.log('success:' + success);
        console.log('error:' + error);
        const end = new Date().getTime();
        console.log('time:' + (end - start));
    })
    .catch(err => {
        console.log(err);
    })