const mongoose=require("mongoose");
const express=require("express");
const app=express();
app.use(express.json());

const ExpenseSchema = new mongoose.Schema({
     
  username:{
    type:String,
    trim:true,
    maxLength:30,
    required:true
  },
  dataType:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
   },
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20
    },
    date: {
      type: Date,
      required: true,
      trim: true,
      maxLength: 20
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 50
    }
  }, {
    timestamps: true
  });

  const Expense1=mongoose.model('Expense',ExpenseSchema);
  
  module.exports={Expense1}



