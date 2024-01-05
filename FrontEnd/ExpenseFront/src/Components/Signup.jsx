import React, { useState } from "react";
import "../Styles/Signup.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import zod from 'zod';

const Signup = () => {

    const[username,setUserName]=useState("");
    const[password,setPassword]=useState("");
    const[confirm,setConfirm]=useState("");
    const[email,setEmail]=useState("");
    const[show,setShow]=useState(true);
    const navigate=useNavigate();
    const usernameSchema=zod.string().max(20).min(6);
    const passwordSchema=zod.string().max(20).min(6);
    const apiUrl=import.meta.env.VITE_API_BASE_URL;
    // const emailSchema=zod.email().max(30).string();


  const handleSubmit = async(e) => {
    e.preventDefault();
   
    const username1=usernameSchema.safeParse(username);
    const password1=passwordSchema.safeParse(password);
    const confirm1=passwordSchema.safeParse(confirm);
    // const email1=emailSchema.safeParse(email);

    if(!username1.success)
    {
      alert("Username must be 6 characters long")
      return;
    }

    if(!password1.success||!confirm1.success)
    {
      alert("password  should be 6 characters long")
      return;
    }

   
    if(password!==confirm)
    {
      setShow(false);
     return;
    }
    const data={
        username:username,
        password:password,
        email:email,
    }

    try{
     await axios.post(`${apiUrl}verify`,data)
      
        setUserName("");
        setPassword("");
        setConfirm("");
        setEmail("");
        setShow(true);
        navigate('/signIn');
    }
    catch(error)
    {
        
        alert(error.response.data.message)
    }
  };

  const navigatethere=()=>{
    navigate('/signIn');
  }

  return (
    <div>
      <div className="signup-parent">
        <div className="signup-heading">Sign Up</div>
        <div className="signup-heading2">Create your Account</div>

        <form className="form-4" onSubmit={handleSubmit}>
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} />
            <input type="text" name="username" value={username} onChange={(e)=>setUserName(e.target.value)} placeholder="Username" />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faEnvelope} />
            <input type="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} />
            <input type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="confirm"
              value={confirm}
              onChange={(e)=>setConfirm(e.target.value)}
              placeholder="Confirm Password"
            
            />
          </div>
          <button type="submit">Sign Up</button>
          {
            !show?(<p style={{color:"red",fontSize:"20px"}}>Passwords dont match</p>):(<p></p>)
          }
        </form>
        <div className="already-user">

          <p className="already-font">Already a user ?</p>
        <button type="submit" className="move-out" onClick={navigatethere}>Click here</button>
        </div>
       
      </div>
    
    </div>
  );
};

export default Signup;
