//import all dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./router/router')
const errorMiddleware = require('./middlewares/error-middleware')


//init express & port
const app = express();
const port = process.env.PORT

//for easier cookie and request.body working
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try {
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));   //listening port from .env file
    } catch (error) {           //catching errors
        console.log(error);
    }
}

start()