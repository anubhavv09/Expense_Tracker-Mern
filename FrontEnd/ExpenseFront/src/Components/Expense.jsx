import React,{useEffect, useState} from 'react'
import Navbar from './Navbar'
import '../Styles/expense.css'
import axios from 'axios'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import obj from './AuthService'
import {z} from 'zod';

const Expense = () => {
   const[expense,setExpense]=useState();
   const[date,setDate]=useState();
   const[desc,setDesc]=useState();
   const[category,setCategory]=useState();
   const[amount,setAmount]=useState();
   const[currentIn,setCurrentIn]=useState(null);
   const[totalExpense,setTotalExpense]=useState([]);
   const token2=obj.getToken();
   const expenseSchema=z.string().max(15);
   const descSchema=z.string().max(30);
   const apiUrl=import.meta.env.VITE_API_BASE_URL;
   

   const saveData=async(e)=>{
    e.preventDefault();
    const expense1=expenseSchema.safeParse(expense);
    const category1=expenseSchema.safeParse(category);
    const decs1=descSchema.safeParse(desc);

    if(!expense1.success)
    {
      alert("Length of Expense is long");
      return;
    }

    if(!category1.success)
    {
      alert("Length of Category is long")
      return;
    }

    if(!decs1.success)
    {
      alert("Length desc is long");
      return;
    }


    console.log(apiUrl);

  
    const data1={
        title:expense,
        amount:amount,
        date:date,
        category:category,
        description:desc  
    }
   
 

    try {
      const objToken={
        headers:{
          Authorization:`Bearer ${token2}`
        }
      }
        await axios.post(`${apiUrl}/transactions/expense`, data1,objToken);
        const result = await axios.get(`${apiUrl}/transactions/expense/getExpense`,objToken);
        setTotalExpense(result.data.message);
        
      } catch (error) {
        console.log(error);
      }

      
   }

   const deleteOne1=async(id)=>{
    

    
     try{
      const objToken={
        headers:{
          Authorization:`Bearer ${token2}`
        }
      }

    axios.delete(`${apiUrl}/transactions/expense/${id}`);
    const result= await axios.get(`${apiUrl}/transactions/expense/getExpense`,objToken);
    setTotalExpense(result.data.message);
   }catch(error)
   {
    console,log(error);
   }

   }

   useEffect(()=>{

    const currentExpense=async()=>{ 
        try{
          const config={
            headers:{
              Authorization:`Bearer ${token2}`
            }
          };
         
          const result = await axios.get(`${apiUrl}/transactions/total`,config);
           
          
            setCurrentIn(result.data.data);
        }
        catch(error)
        {
            console.log(error)
        }
       
    };

    currentExpense();

   },[totalExpense])


   useEffect(()=>{

    const refresh=async()=>{
      try{
        const config={
          headers:{
            Authorization:`Bearer ${token2}`
          }
        }
        const result= await axios.get(`${apiUrl}/transactions/expense/getExpense`,config);
       
        setTotalExpense(result.data.message);
        // setTotalExpense(result.data.data);    


    }catch(error)
    {
         console.log(error)
    }

    }

    refresh();
  },[])
  

  return (
    <div className='expense-1'>
    <Navbar/>
    <div className='snackbar-out'>
    <div className='snack-bar2'>
            <div className='text-1'>
             <p>{`Expenses ${currentIn}`}</p>
            </div>
        </div>
    </div>
    <div className='form-expense'>
      <form onSubmit={saveData}> 
            <input type="text" name="name" placeholder='Expense Title' onChange={(e)=>setExpense(e.target.value)} required  /><br></br>
            <input type="text" name="name" placeholder='Expense  Amount' onChange={(e)=>setAmount(e.target.value)}  required /><br></br>
            <input type="date" name="name" placeholder='Enter a Date' onChange={(e)=>setDate(e.target.value)}required /><br></br>
            <input type="text" name="name" placeholder='Category' onChange={(e)=>setCategory(e.target.value)}  required/><br></br>
            <input type="text" name="name" placeholder='Add a Refrence' onChange={(e)=>setDesc(e.target.value)}required /><br></br>
            <button>Submit</button>
      </form>
    </div>
    <div className='show-salary'>
  {totalExpense && totalExpense.length > 0 ? (
    
        <div className='show-salary2'>
      {totalExpense.map((element, index) => (
       
          <ul>
            <li>Title <span>{element.title}</span></li>
            <li>Amount <span>{element.amount}</span></li>
            <li>Date <span>{element.date}</span></li>
            <li>Category <span>{element.category}</span></li>
            <li>Description <span>{element.description}</span></li>
            <li><i><MdDelete onClick={()=>{deleteOne1(element._id)}}/></i></li>
          
          </ul>
       
      ))}
    </div>
  ) : (
    <h2></h2>
  )}
</div>
    </div>
  )
}

export default Expense