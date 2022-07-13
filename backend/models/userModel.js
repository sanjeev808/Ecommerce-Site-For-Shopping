const mongoose =  require("mongoose")
const validator =  require("validator")

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
    avter:[
        {
            public_id:{
                type:String,
                required:true
            
            },
            url:{
                type:String,
                required:true
                }
        }
    ]
})