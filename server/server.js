const express = require('express');
const router = require('./routers');
const bodyParser = require('body-parser');
const path = require('path');

const middlewares = require('./middlewares');

const port = 3000;


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/', router);
app.use(middlewares.redirectMidlleware);

app.use(express.static(path.resolve(__dirname, '../dist')));

app.listen(port, error => {
    if(error){
        console.error(error);
        return;
    }
    console.log("Server runs on port: ", port);
});