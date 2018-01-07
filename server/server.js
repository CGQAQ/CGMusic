const express = require('express');
const router = require('./routers');
const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');


const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', router);
app.get('/*', (req, res, next) => {
    if(!_.startsWith(req.path, '/assets') && !_.startsWith(req.path, '/vendor') && !_.startsWith(req.path, '/index.bundle')){
        res.sendFile(path.join(__dirname, '../', 'dist', 'index.html'));
    }
    else {
        next()
    }
});


app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, error => {
    if(error){
        console.error(error);
        return;
    }
    console.log("Server runs on port: ", port);
});