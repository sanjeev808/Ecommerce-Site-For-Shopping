const express = require('express')

const app = express()

const errorMiddleware = require("./middleware/error")

app.use(express.json())
// route imports
const product = require("./routes/productRoute")
app.use(errorMiddleware)
// middleware for error
app.use("/api/v1",product)
module.exports = app