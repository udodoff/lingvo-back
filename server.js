const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.writeHead(200)
    res.end('Hello World!')
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))