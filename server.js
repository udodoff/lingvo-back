//init all dependencies
const express = require('express')
const mysql = require('mysql2')

//init express & port
const app = express();
const port = 3000;

//endpoint for the "/"
app.get('/', (req, res) => {
    res.writeHead(200);         //sending status 200
    res.end('Hello World!');    //sending responce "hello world"
});

app.listen(port, () => {        //listening port 3000
    console.log(`Example app listening on port ${port}!`);
});