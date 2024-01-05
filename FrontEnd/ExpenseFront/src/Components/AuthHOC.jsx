import React from 'react'
import { Navigate } from 'react-router-dom';
import obj from './AuthService';

const AuthHOC = ({WrappedComponent}) => {

  return (props)=>{
   
    if(obj.getToken())
    {
        return <WrappedComponent {...props}/>
    }
    else{
        return <Navigate to="/signIn" />;
    }

  }
   
  
}

export default AuthHOC