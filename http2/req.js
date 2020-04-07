const http = require('http')
const taskList = []
console.log('请求数据中...')
const start = new Date().getTime()
let count = 0
let success = 0
let error = 0
let times = 10
for (let i = 0; i < times; i++) {
    taskList[i] = new Promise((resolve, reject) => {
        const client = http2.connect('https://localhost:8443', {
            ca: fs.readFileSync('./crt.pem')
        });
        http.get('http://0.0.0.0:8080?id=1', function (req, res) {
            let stream = ''
            req.on('data', function (data) {
                stream += data
            })
            req.on('error', function () {
                count++
                error++
                resolve({ count, success, error })
            })
            req.on('end', function () {
                count++
                success++
                resolve({ count, success, error })
            })
        })
    })
}
Promise.all(taskList)
    .then(result => {
        console.log('count:' + count)
        console.log('success:' + success)
        console.log('error:' + error)
        const end = new Date().getTime()
        console.log('time:' + (end - start))
    })
    .catch(err => {
        console.log(err)
    })