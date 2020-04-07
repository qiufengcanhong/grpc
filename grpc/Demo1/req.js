var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const taskList = [];
console.log('请求数据中...')
const start = (new Date()).getTime();
let count = 0;
let success = 0;
let error = 0;
let times = 5000;
for (let i = 0; i < times; i++) {
    taskList[i] = new Promise((resolve, reject) => {
        var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
        var client = new hello_proto.Greeter('39.100.197.67:50051',
            grpc.credentials.createInsecure());
        client.sayHello({ id: 1 }, function (err, response) {
            count++;
            if (err) {
                hello_proto=null
                client=null
                error++;
                resolve();
            } else {
                success++;
                hello_proto=null
                client=null;
                resolve();
            }
        });
    })
}
Promise.all(taskList).then((result) => {
    console.log('count:' + count);
    console.log('success:' + success);
    console.log('error:' + error);
    const end = (new Date()).getTime();
    console.log('time:' + (end - start));
}).catch((err) => {
    console.log(err);
})
