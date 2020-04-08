const PROTO_PATH = __dirname + '/employee.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');


let packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee

let { paySalary } = require('./pay_salary.js');

function main () {
    let server = new grpc.Server();
    server.addService(employee_proto.Employee.service,
        { paySalary: paySalary }
    );
    server.bind('localhost:4500', grpc.ServerCredentials.createInsecure());
    server.start();
}
main();