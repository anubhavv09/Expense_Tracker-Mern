import React, { useState } from "react";
import "../Styles/SignIn.css";
import axios from "axios";
import { Router } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DashBoard from "./DashBoard";
import obj from "./AuthService";
import {z} from 'zod';


const SignIn = () => {
  
  const[username,setUserName]=useState('');
  const [password,setPassword]=useState('');
  const [confirm,setConfirm]=useState('');
  const [checker,setChecker]=useState(false);
  const navigate = useNavigate();
  const userSchema=z.string().max(20).min(6);
  const upiUrl=import.meta.env.VITE_API_BASE_URL;

  const loginData=async(e)=>{


   const username1=userSchema.safeParse(username);
   const password1=userSchema.safeParse(password);
   const confirm1=userSchema.safeParse(confirm);
   
   if(!username1.success||!password1.success||!confirm1.success)
   {
    alert("Username length is too Long or Short")
    return;
   }


    e.preventDefault();
    if(password!==confirm)
    {
      setChecker(true);
      return;
    }

    const obj1={
      username:username,
      password:password
    }
    
    try{
    const result= await axios.post(`${upiUrl}verify/login`,obj1,{
      headers:{
        "Content-Type":"application/json"
      }
    })
    
    const token=await result.data.token;

    // localStorage.setItem('token1',token);
     obj.setToken(token);
      setPassword('');
      setUserName('');
      setConfirm('');
      setChecker(false);
      navigate('/dashboard');
      

    }catch(error)
    {
        
        alert(error.response.data.message)
      
    }


  }

  const take=()=>{
    
     navigate('/')     

  }



  return (
    <div>
      <div className="main-body">
      <div className=" front-page-2">
        <div className="part-1">
          <div className="left-side">
            <h1 className="sign-up1">Sign in</h1>
            <div className="text-sign-in">Sign in using Username</div>
            <div
              className="boxes"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "10px",
              }}
            >
              <form onSubmit={loginData}>
              <input
                type="text"
                placeholder="Enter username"
                className="input-1"
                name="username"
                value={username}
                onChange={(e)=>setUserName(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Enter password"
                className="input-1"
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              ></input>
              <input
                type="password"
                placeholder="Confirm password"
                className="input-1"
                name="password"
                value={confirm}
                onChange={(e)=>setConfirm(e.target.value)}
              ></input>
               <div className="button-1">
              <button className="btn-btn2">SIGN IN</button>
               </div>
              </form>
            </div>
            <div className="wrong-password" >
              {
                checker?(<p style={{color:"red"}}>Passwords are not same</p>):(<p></p>)
              }
            </div>
          </div>
        </div>
        <div className="part-2">
          <div className="right-side">
            <p className="p-create">Create</p>
            <p className="p-create">Account</p>

            <h5 className="sign-up">
              Sign up if you still dont have an account
            </h5>
            <button className="btn-btn-3"  onClick={take}>SIGN UP</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SignIn;
