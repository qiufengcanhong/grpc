const PROTO_PATH = __dirname + '/helloworld.proto';
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
let { employees } = require('./data.js');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;
const sayHello = (call, callback) => {
    const data = { name: 'hello world', id: +call.request.id };
    if (call.request.id !== 1) {
        data.name = 'hello grpc'
    }
    callback(null, { message: JSON.stringify({ err: 0, msg: 'ok', data ,employees}) })
}

const main = () => {
    var server = new grpc.Server();
    server.addService(hello_proto.Greeter.service, { sayHello: sayHello });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
};
main();