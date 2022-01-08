const http = require('http');

var processData = {
    Id:0,
    processId: 0,
    ip:'',
    port:0,
}

process.on('message', (message) => {
    if (message == 'START') {
        timer = setInterval( function() {
            anyoneHome();
        },
        (10*1000));    } 
    else {
        processData = JSON.parse(message);
        console.log('child process '+processData.Id+' running for location ' + processData.ip+':'+processData.port)
    }

});

function anyoneHome(){

    const options = {
        hostname: processData.ip,
        port: processData.port,
        path: '/knockknock',
        method: 'GET',
    };

    const req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
        });
        res.on('end', () => {
            process.send( processData.Id + ': ' + res.statusCode);
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();
}