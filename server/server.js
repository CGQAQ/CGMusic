const express = require('express');
const router = require('./routers');
const bodyParser = require('body-parser');

const port = 3000;


const app = new express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);

app.get('/', (req, res) => {
    res.end('express works');
});

app.listen(port, error => {
    if(error){
        console.error(error);
        return;
    }
    console.log("server runs on port: ", port);
});