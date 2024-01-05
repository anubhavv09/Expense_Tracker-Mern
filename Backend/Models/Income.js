const mongoose=require("mongoose");
const express=require("express");
const app=express();
app.use(express.json());


const IncomeSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    trim:true,
    maxLength:30
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
      type:Date,
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

  const Income1=mongoose.model('Income',IncomeSchema);
  
  module.exports={Income1}



