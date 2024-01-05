
const express=require("express");
const app=express();
app.use(express.json());
const cors=require('cors');
const {Expense1}=require("../Models/Expense");
app.use(cors())
require('dotenv').config();
const jwt=require('jsonwebtoken');
const password=process.env.JWT_PASSWORD;

const addIncome=async(req,res)=>{

    try{
        
       const {title,amount,category,description,date} =req.body;
        
       const token2=req.headers.authorization.split(' ');
       const token=token2[1];
       const decoded=jwt.verify(token,password);


       
       const a=new Expense1({
        username:decoded.username,
        dataType:"Expense",
        title:title,
        amount:amount,
        date:date,
        category:category,
        description:description
       });

       if(!title||!amount||!category||!description||!date)
       {
        res.status(401).json({
            message:"All the fields are required"
        })
       }
       const data=await a.save();
       res.status(201).json({
        Saved:data
       })
    }catch(error)
    {
       res.status(501).json({
        message:"You have an error"
       })
    }

}

const getIncome=async(req,res)=>{

    try{
       const token2=req.headers.authorization.split(' ');
       const token=token2[1];
       const decoded=jwt.verify(token,password);


        const data=await Expense1.find({username:decoded.username});
        res.status(201).json({
            message:data
        })

    }
    catch(error)
    {
       res.status(501).json({
        message:"error"
       })
    }

}


const minMax=async(req,res)=>{

    try{
        const tokenSec=req.headers.authorization.split(' ');
        const token=tokenSec[1];
        const decoded=jwt.verify(token,password);
        const data=await Expense1.find({username:decoded.username});
        if(data.length===0)
        {
           return res.status(404).json({
             
                message:"No Records"
            })

        }
        let max=0;
        let min = Number.MAX_VALUE;
        data.forEach((element)=>{
            if(element.amount>=max)
            {
                max=element.amount;
            }

            if (element.amount < min) {
                min = element.amount;
              }
        })

        res.status(200).json({
            "max":max,
            "min":min
        })
       
    }catch(error)
    {
        console.log(error)
    }

}

const totalIncome=async(req,res)=>{

    try{
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
          return res.status(401).json({ error: 'Authorization header is missing' });
        }
        
        const tokenSec = authorizationHeader.split(' ');
        const token = tokenSec[1];
        const decoded=jwt.verify(token,password);
     
       const result=await Expense1.find({username:decoded.username});
       let count=0;
       result.forEach((element)=>{
          count=count+element.amount
       })
       res.status(200).json(
           {
               data:count
           }
       )

    }
    catch(error)
    {
       console.log("we have an error in toalExpense")
    }


}

const deleteIncome=async(req,res)=>{
    try{
        
        const id=req.params.id;
       
       await Expense1.deleteOne({_id:id}).then((result)=>{
           res.json({
            message:"Data Deleted Sucessfully",
           })
       }).catch((error)=>{
           res.status(400).json({
            message:"You have an error"
           })
       })
        
    }catch(error)
    {
         res.status(401).json({
            message:"You have an issue"
         })
    }
}

module.exports={addIncome,
    getIncome,deleteIncome,totalIncome,minMax
}