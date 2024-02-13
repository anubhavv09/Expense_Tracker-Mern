
const express=require("express");
const cors=require('cors');
require('dotenv').config()
const PORT=process.env.PORT;
const app=express();
const {dataBase}=require('./Db/db');
const transactionRouter=require('./Routes/transaction');
const verifyRouter=require('./Routes/sign');
const verify=require('./Middleware/expense');


app.use(express.json());
app.use(cors())


app.use('/transactions',transactionRouter);
app.use('/verify',verifyRouter);

const main=()=>{
     dataBase();
}

main();

app.listen(PORT,()=>{
    console.log(PORT)
    console.log("we are working",PORT)
})

