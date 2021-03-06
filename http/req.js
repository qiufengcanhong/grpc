const http = require('http');
const taskList = [];
let { employees } = require('./data.js');
console.log('请求数据中...');
const start = new Date().getTime();
let count = 0;
let success = 0;
let error = 0;
let times = 1;
for (let i = 0; i < times; i++) {
    taskList[i] = new Promise((resolve, reject) => {
        http.get(`http://39.100.197.67:3000?id=1&${JSON.stringify(employees)}`, function (req, res) {
            let stream = '';
            req.setTimeout(10000);
            req.on('data', function (data) {
                stream += data;
            })
            req.on('error', function () {
                count++;
                error++;
                resolve({ count, success, error });
            })
            req.on('end', function () {
                count++;
                success++;
                resolve({ count, success, error });
            })
        })
    })
}
Promise.all(taskList)
    .then(result => {
        console.log('count:' + count);
        console.log('success:' + success);
        console.log('error:' + error);
        const end = new Date().getTime();
        console.log('time:' + (end - start));
    })
    .catch(err => {
        console.log(err);
    })