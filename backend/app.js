const express = require('express')

const app = express()
const cookieParser =  require("cookie-parser")
const errorMiddleware = require("./middleware/error")

app.use(express.json())
app.use(cookieParser())
// route imports
const product = require("./routes/productRoute")
const user  =  require("./routes/userRoute")
app.use(errorMiddleware)
// middleware for error
app.use("/api/v1",product)
app.use("/api/v1",user)

module.exports = app