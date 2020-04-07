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
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main () {
    var client = new hello_proto.Greeter('39.100.197.67:50051',
        grpc.credentials.createInsecure());
    client.sayHello({ id: 2 }, function (err, response) {
        console.log('Greeting:', JSON.parse(response.message));
    });
}

main();