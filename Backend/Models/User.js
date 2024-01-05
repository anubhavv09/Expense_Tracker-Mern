const mongoose=require("mongoose");
const { string } = require("zod");

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            maxLength:30,
            trim:true,
        },
        password:{
            type:String,
            required:true,
            maxLength:20,
            trim:true

        },
       email:{
            type:String,
            required:true,
            maxLength:30,
            trim:true
        }
    }
)

const User=mongoose.model('User',userSchema)

module.exports={User}