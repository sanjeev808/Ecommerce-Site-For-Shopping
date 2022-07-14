const ErrorHander = require("../utilis/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User =  require("../models/userModel")
const sendToken  = require("../utilis/JWTToken")

exports.registerUser = catchAsyncError(async(req,res,next)=>{

    const {name,email,password} = req.body;
    const user = await  User.create({
        name,email,
        password,
        avatar:{
            public_id:"this is sample of avatar",
            url:"Profile sample url"
        },
    });

    sendToken(user,200,res)

});


// login user

exports.loginUser = catchAsyncError( async (req,res,next) =>{

    const {email,password} = req.body;

    if(!email || !password)
    {
        return next( new ErrorHander("please Enter Email & Password",400))
    }
    
    const user = await User.findOne({ email }).select("+password");

    if(!user){

        return next(new ErrorHander("Invalid Email or password",401))
    }

    const isPasswordMatched = user.comparePassword(password);


    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid Email or password",401))
    }

    sendToken(user,200,res)

})


// logout user

exports.logout  = catchAsyncError( async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).json({
        sucess:true,
        message:"logged Out"
    })
})