import React, { useEffect, useState } from "react";
import "../Styles/DashBoard.css";
import Navbar from "./Navbar";
import axios from "axios";
import Card from "./Card";
import Snackbar from "./Snackbar";
import SnackBarHeader from "./SnackBarHeader";
import { GiWallet } from "react-icons/gi";
import { FaSackDollar } from "react-icons/fa6";

import { MdAttachMoney } from "react-icons/md";
import Chart from "./Chart";
import obj from "./AuthService";

const DashBoard = () => {
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [minExpense,setMinExpense]=useState(0);
  const[maxExpense,setMaxExpense]=useState(0);
  const[recent,setRecent]=useState([]);
  const result3=obj.getToken();
 
  const apiUrl=import.meta.env.VITE_API_BASE_URL;



  useEffect(() => {
    const income1 = async () => {
      try {
        const config={
          headers:{
            Authorization:`bearer ${result3}`
          }
        }
        const result2 = await axios.get(
          `${apiUrl}transactions/income`,config
        );
        if(result2.data.data)
        {
          setIncome(result2.data.data);
        }
        else{
          throw new Error("No data coming from end points")
        }
        
      } catch (error) {
         console.log(error)
      }
    };

    income1();
  }, []);

  useEffect(() => {
    const expense2 = async () => {
      try {
        const config={
          headers:{
            Authorization:`bearer ${result3}`
          }
        }

        const result = await axios.get(
          `${apiUrl}transactions/total`,config
        );
        if(result.data.data)
        {
          setExpense(result.data.data);
        }
        else{
          throw new Error("No data coming from end points")
        }
        
      } catch (error) {
         console.log(error)
      }
    };

    expense2();
  }, []);

  useEffect(() => {
    const minMax = async () => {
     
      try {
        const config={
          headers:{
            Authorization:`Bearer ${result3}`
          }
        }
        const result= await axios.get(`${apiUrl}transactions/maxmin`,config);
       if(result.data.max&&result.data.min)
       {
        setMax(result.data.max);
        setMin(result.data.min);
       }
       else{
          throw new Error("No data coming from End Points")
       }
       
      } catch (error) {
         console.log(error)
      }
    };
    minMax();

    const minMax2=async()=>{
      const hd={
        headers:{
          Authorization:`Bearer ${result3}`
        }
      }
         
        try{
            const result2=await axios.get(`${apiUrl}transactions/expense/maxmin`,hd);
            
            if(result2.data.min&&result2.data.max)
            {
              setMinExpense(result2.data.min)
              setMaxExpense(result2.data.max)
            }
            else{
              throw new Error("No data coming from End Points")
            }
            
        }
        catch(error)
        {
          console.error(error)
        }
    }

    minMax2();

    const recent=async()=>{
          
      try{
        const config={
          headers:{
            Authorization:`Bearer ${result3}`
          }
        }
        
        const data3=await axios.get(`${apiUrl}transactions/expense/recent`,config);
        if(data3.data.data)
        {
          setRecent(data3.data.data);
        }
        else{
          throw new Error("No Data coming from End Points")
        }
       

      }
      catch(error)
      {
       console.log(error)
      }
    }
     recent();

  }, []);

  return (
    <div>
      <Navbar />
      <div className="main-dashboard">
        <div className="child-1">
          
          <div className="charts-1" style={{display:"flex",justifyContent:"center",marginLeft:"30px"}}>
            <Chart/>
          </div>
          <div className="incomes-expenditure">
          <Card  title={"Income"} value={`$ ${income}`}/>
          <Card  title={"Expense"} value={`$ ${expense}`} />  
          </div>
         
          <div className="difference-parent">
          <Card  title={"Income Left"} value={`$ ${income-expense>0?income-expense:0}`}  />
          </div>
        
          
        </div>
        <div className="child-2">
          <SnackBarHeader  val={"Salary"} icon={<FaSackDollar className="icon-2" />}/>
          <Snackbar min={`${min}`} max={`${max}`}/>
          <SnackBarHeader val={"Expense"} icon={<GiWallet className="icon-1"/>}/>
          <Snackbar min={`${minExpense}`} max={`${maxExpense}`}/>
          
          <div className="recent-requests">
            <div className="title-recent">Recent History</div>
             {
             recent&&recent.length>0?(
              recent.map((element)=>{
              return  <div className="recent-table">
                 <span className="adjust">{element.dataType==="Income"?(<p className="income-recent">{element.title}</p>):(<p className="recent-expense">{element.title}</p>)}</span>  
                 <span className="adjust">{element.dataType==="Income"?(<p className="income-recent2">{+element.amount}</p>):(<p className="recent-expense2">{-element.amount}</p>)}</span> 
               </div>
              })

             ):(<h1></h1>)
             }
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashBoard;
