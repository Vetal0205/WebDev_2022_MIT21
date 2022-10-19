const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname,'public')))


app.listen(PORT,()=>{
    console.log(`Client start at port ${PORT}`)
})