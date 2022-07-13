const ErrorHander = require("../utilis/errorHandler")

module.exports = (err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.message = err.message || "internal server error";

    //wrong Mongodb ID error
    if(err.name ===  "castError")
    {
        const message =`Resource not found Invalid: ${err.path}`;
        err = new ErrorHander(message, 400);
    }
    
    res.statusCode(err.statusCode).json({
        success:false,
        error:err.message
    })
}