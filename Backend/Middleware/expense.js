require('dotenv').config();
const password=process.env.JWT_PASSWORD;


const verify=()=>{
    try{
        const token=req.headers.token;
        const result=JWT.verify(token,password);
        next();

    }catch(error)
    {
      return res.status(200).json({
        message:"Authentication failed"
      })
    }

}

module.exports={verify}