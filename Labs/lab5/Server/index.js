const express = require('express')
const app = express()

require('dotenv').config();

const PORT = 3000

// app.use(express.static(path.join(__dirname,'public')))


app.listen(PORT,()=>{
    console.log(`server start at port ${PORT}`)
})