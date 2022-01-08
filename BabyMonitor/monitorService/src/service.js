const expresss = require('express');
const bodyParser = require( 'body-parser');
const cors  = require('cors');
const helmet  = require('helmet');
const morgan  = require('morgan');

var port = 4000;

for(var i = 0; i< 4; i++){
    var app = expresss();
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(cors());
    app.use(morgan('combined'));

    app.get('/knockknock', (req,res) => {
        res.status(200).send('OK')
    });

    app.listen(port, () => {
        console.log('listening on port '+port);
    });
    port++;
}
/*

var app = expresss();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/knockknock', (req,res) => {
    res.status(200).send('OK')
});

app.listen(4000, () => {
    console.log('listening on port 4000');
});
*/