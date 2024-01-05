const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { User } = require("../Models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const passwordJWT = process.env.JWT_PASSWORD;
const zod=require("zod");
const passwordSchema=zod.string().min(6);
const usernameSchema=zod.string().min(6);
app.use(cors());

const addCredentials = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const passwordValidation=passwordSchema.safeParse(password);
    const usernameValidation=usernameSchema.safeParse(username);
    if(!passwordValidation.success)
    {
      return res.status(401).json(
      {
        message:"Password should be 6 characters long"
      }
      )
    }

    if(!usernameValidation.success)
    {
      return res.status(401).json(
      {
        message:"Username should be 6 characters long"
      }
      )
    }

    const data = await User.findOne({ username: username });
    const data2 = await User.findOne({ email: email });

    if (data) {
      return res.status(400).json({
        message: "Username Exists",
      });
    } else if (data2) {
      return res.status(400).json({
        message: "Email Exists",
      });
    }

    const a = new User({
      username: username,
      password: password,
      email: email,
    });

    const result = await a.save();
    res.json({
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyDetails = async (req, res) => {
  const { username, password } = req.body;
  // console.log(req.body);
  try {
    const result = await User.findOne({ username: username });

    if (!result || result.password !== password) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }
    const token = jwt.sign({ username, password }, passwordJWT);
    // console.log(token);
    return res.status(200).json({
      message: "Sucessfull",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getUserName=(req,res)=>{
  try{
    const authorizationHeader=req.headers.authorization;
    // console.log(authorizationHeader);
    if(!authorizationHeader)
    {
      return res.status(400).json({
        message:"No token present"
      })
    }
    
    const tokenFetch=authorizationHeader.split(' ');
    const token=tokenFetch[1];
    const decoded=jwt.verify(token,passwordJWT);
      
    res.status(200).json(
      {
        "username":decoded.username
      }
    )
  }
  catch(error)
  {
   console.log(error);
  }

}

module.exports = {
  addCredentials,
  verifyDetails,
  getUserName
};
