
const express=require("express");
const app=express();
app.use(express.json());
const cors=require('cors');
const {Income1}=require("../Models/Income");
const {Expense1}=require("../Models/Expense");
require('dotenv').config();
const jwt=require('jsonwebtoken');
const password=process.env.JWT_PASSWORD;
app.use(cors())



const addIncome=async(req,res)=>{

    try{
     
       const {title,amount,category,description,date} =req.body;
       const tokenSec=req.headers.authorization.split(' ');
       const token=tokenSec[1];
       const decoded=jwt.verify(token,password);
    //    console.log(decoded.username);
      

       const a=new Income1({
         username:decoded.username,
          dataType:"Income",
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



const totalIncome=async(req,res)=>{

     try{

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
          return res.status(401).json({ error: 'Authorization header is missing' });
        }
        
        const tokenSec = authorizationHeader.split(' ');
        const token = tokenSec[1];
        const decoded=jwt.verify(token,password);

        const result=await Income1.find({username:decoded.username});
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
        console.log("We have an error in totalIncome")
     }


}

const getIncome=async(req,res)=>{

    try{

        const tokenSec=req.headers.authorization.split(' ');
        const token=tokenSec[1];
        const decoded=jwt.verify(token,password);

        const data=await Income1.find({username:decoded.username});
        res.json({
            data
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

    const data=await Income1.find({username:decoded.username});
        

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

const recentRecords=async(req,res)=>{
    try{
        let income=[];
        let expense=[];

        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
          return res.status(401).json({ error: 'Authorization header is missing' });
        }
        
        const tokenSec = authorizationHeader.split(' ');
        const token = tokenSec[1];
        const decoded=jwt.verify(token,password);



        const data1=await Income1.find({username:decoded.username});
    
        const data2=await Expense1.find({username:decoded.username});

        if(data1.length==0&&data2.length===0)
        {
            return res.status(500).json({
                message:"No record Available"
            })
        }

       
   
        if(data1.length===0)
        {
            const len=data2.length-3;
            const resultArray=data2.splice(len,3);
          return  res.status(400).json({
                data:resultArray
            }) 
        }else if(data2.length==0)
        {   
            const len=data1.length-3;
            const resultArray=data1.splice(len,3);
           return res.status(200).json({
                data:resultArray
            }) 

        } 
         income=data1.splice(Math.max(data1.length-3,0),3);
         expense=data2.splice(Math.max(data2.length-3,0),3);

         const merge=[...income,...expense];
        //  console.log(merge);
         const topRecords=merge.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).splice(0,3);

        //  console.log(topRecords);

         res.status(200).json({
            data:topRecords
         })
        
    }catch(error)
    {
        console.log(error)
    }
}

const deleteIncome=async(req,res)=>{
    try{
        const id=req.params.id;
       
       await Income1.deleteOne({_id:id}).then(
        ()=>{
            res.json({
                message:"data deleted Sucessfully"
            })
        }
       )
    }catch(error)
    {
         res.status(401).json({
            message:"You have an issue"
         })
    }
}

module.exports={addIncome,
    getIncome,deleteIncome,totalIncome,minMax,recentRecords
}