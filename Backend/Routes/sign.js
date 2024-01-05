const express=require("express")
const router=express.Router();
const cors=require('cors');
const app=express();
app.use(cors());
const signController=require('../Controller/Authenticate');


router.post('/',signController.addCredentials)
router.post('/login',signController.verifyDetails)
router.get('/getUsername',signController.getUserName)



module.exports=router