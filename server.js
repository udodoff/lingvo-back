//import all dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectHistory = require('connect-history-api-fallback')
const router = require('./router/router')
const errorMiddleware = require('./middlewares/error-middleware')


//init express & port
const app = express();
const port = process.env.PORT

//for easier cookie and request.body working
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(connectHistory())
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