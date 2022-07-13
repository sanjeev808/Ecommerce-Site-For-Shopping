const app =  require('./app')

const dotenv =  require("dotenv")

const connectDatabase = require("./config/database")
const { faYoutube } = require('@fortawesome/free-brands-svg-icons')

//handling uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error ${err.message}`)
    console.log(`shutting down the server due to uncaught Exception`)
    process.exit(1)
})

//config
dotenv.config({path:"./backend/config/config.env"});

//connnet database 
connectDatabase()

 const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is working on https://localhost:${process.env.PORT}`)
} )

// unhandle promise rejected
process.on("unhandleRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log(`shutting down the server due to unhundle promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})