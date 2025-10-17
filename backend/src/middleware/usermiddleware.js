const jwt=require('jsonwebtoken');
const redisClient=require('../config/redis');
const User=require('../model/user');

const usermiddleware=async(req,res,next)=>{
    try{
        const{token}=req.cookies;
        if(!token){
            throw new Error("Token is not present");
        }

        const payload=jwt.verify(token,process.env.JWT_SECRET);

        const {_id}=payload;

        if(!_id){
            throw new Error("Id is missing");
        }
        const result=await User.findById(_id);

        if(!result){
            throw new Error("User doesn't exist");
        }

        const isblocked=await redisClient.exists(`token:${token}`);
        if(isblocked){
            throw new Error("Invalid Token");
            
        }
        req.result=result;
        next();

    }
    catch(err){
        res.send("Error:"+err.message);
        console.log(err);
        
    }
}
module.exports=usermiddleware;