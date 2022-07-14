const mongoose =  require("mongoose")
const validator =  require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please Enter your Name"],
        maxLength:[30,"name cannot exceed 30 characters"],
        minLength:[4,"Name should have more then 4 characters"]
    },
    email:{
        type:String,
        required:[true,"please Enter your Email"],
        unique:true,
        validator:[validator.isEmail,"please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password Should be greater than 8 Characters"],
        select:false,
    },
    avatar:
        {
            public_id:{
                type:String,
                required:true
            
            },
            url:{
                type:String,
                required:true
                }
        },
        role:{
            type:String,
            default:"user",
        },
    
        resetPasswordToken:String,
        resetPasswordExpire:Date,
})
        userSchema.pre("save", async function(next){
           if(!this.isModified("password"))
           {
            next()
           }
            this.password =await bcrypt.hash(this.password,10)
        })

        // JWT TOken

        userSchema.methods.getJWTToken = function(){
            return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRE
            })
        }

// compare password

userSchema.methods.comparePassword = async function(enteredPassword)
{
    return await bcrypt.compare(enteredPassword,this.password);
}
module.exports =  mongoose.model("user",userSchema)