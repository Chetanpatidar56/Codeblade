const express=require('express');
const authRouter=express.Router();
const {register,login, logout, adminregister, deleteprofile}=require('../controllers/userAuthent');
const usermiddleware = require('../middleware/usermiddleware');
const adminmiddleware = require('../middleware/adminmiddleware');

authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',usermiddleware,logout);
authRouter.post('/admin/register',adminmiddleware,adminregister);
authRouter.post('/deleteprofile',usermiddleware,deleteprofile);
authRouter.get('/check',usermiddleware,(req,res)=>{
    const reply={
        firstname:req.result.firstname,
        email:req.result.email,
        _id:req.result._id,
        role:req.result.role,
    }
    res.status(200).json({
        user:reply,
        message:"Valid User"
    })
})
// authRouter.post('/logout',logout);
// authRouter.post('/getprofile',getprofile);

module.exports=authRouter;