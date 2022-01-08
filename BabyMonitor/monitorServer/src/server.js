// ./src/server.js
const Evilscan = require('evilscan');
const { fork } = require('child_process');

const ESOptions = {
    target: '192.168.0.1-192.168.0.2',
    port: '4000-4999',
    display: 'json'
}

var scanData = [];

const scan = new Evilscan(ESOptions);
createScanEvents(scan);
startScan(scan);

function createScanEvents(Options){
    scan.on('result', data => {
        scanData.push(data);
    });

    scan.on('error', err => {
        throw new Error(err.toString());
    });

    scan.on('done', () => {
        console.log('finished');
        console.log(scanData);
        dayCare();
    });
}

function startScan(scan){
    console.log('starting scan')
    scanData = [];
    scan.run();
}

function dayCare(){
    for ( var i = 0; i < scanData.length; i++) {
        var processData = {
            Id:i,
            processId: child.pid,
            ip: scanData[i].ip,
            port: scanData[i].port,
        }
        await spawnChild(processData);
    }
}

async function spawnChild(processData){
    console.log('spawning child ' + processData.Id);
    const child = fork(__dirname + '/process/callService.js');
    child.on('message', (message) => {
        console.log(message);
    });
    child.send(JSON.stringify(processData));
    child.send('START');
}