
require('dotenv').config()
const mongoose=require("mongoose")
const url=process.env.MONGO_URL;
const PORT=process.env.PORT;
const db='expense';
const {Income1}=require('../Models/Income');
const {Expense1}=require('../Models/Expense');
const {User}=require('../Models/User');

const dataBase=async()=>{
    try{

       await mongoose.connect(`${url}${db}`);
    }catch(error)
    {
         console.log(error)
    }

}

module.exports={dataBase};
