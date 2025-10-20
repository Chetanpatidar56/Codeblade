const User=require('../model/user');
const validate=require('../utilis/validate');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const redisClient=require('../config/redis');
const SubmitProblem=require('../model/submission');

const register=async(req,res)=>{
   
    const validationResult = validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error });
    }
    
    try{
        const{firstname,emailId,password}=req.body;
        
      
        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            return res.status(400).json({ message: "User already registered with this email" });
        }
        
        req.body.password=await bcrypt.hash(password,10);
        req.body.role='user';

        const user=await User.create(req.body);
    
        const token=jwt.sign({_id:user._id,emailId:user.emailId,role:'user'},process.env.JWT_SECRET,{expiresIn:60*60});
        const reply={
            firstname:user.firstname,
            emailId:user.emailId,
            _id:user._id
        }
       
        res.cookie('token', token, { 
            httpOnly: true,
            secure: true,           
            sameSite: 'none',      
            maxAge: 24 * 60 * 60 * 1000, 
            path: '/'
          });
        res.status(201).json({
            user:reply,
            message:"Registered Successfully"
        })

    }
    catch(err){
        console.log(err);
        res.status(400).json({message:err.message});
    }
}

const login=async(req,res)=>{
    try{
        const {emailId,password}=req.body;
        if(!emailId || !password){
            return res.status(400).json({ message: "Email and password are required" });
        }
        
        const user=await User.findOne({emailId});
        
        
        if(!user){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const match= await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        
        const reply={
            firstname:user.firstname,
            emailId:user.emailId,
            _id:user._id
        }
        const token=jwt.sign({_id:user._id, emailId:user.emailId,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60});
        
        res.cookie('token', token, { 
           httpOnly: true,
           secure: true,           
           sameSite: 'none',       
           maxAge: 24 * 60 * 60 * 1000, 
           path: '/'
    });
        res.status(200).json({
            user:reply,
            message:"Login Successful"
        })
    }
    catch(err){
        res.status(500).json({ message: "Error occurred: " + err.message });
    }
}

const logout=async(req,res)=>{
   try{
    const {token}=req.cookies;
    if (!token) {
        return res.status(400).json({ message: "No token found" });
    }
    
    const payload=jwt.decode(token);
    console.log(payload);
    await redisClient.set(`token:${token}`,'Blocked');
    await redisClient.expireAt(`token:${token}`,payload.exp);
    res.cookie("token",null,{expires: new Date(Date.now())});
    res.status(200).json({ message: "Logged Out Successfully" });

   }catch(err){
    res.status(503).json({ message: "Error:"+err.message });
   }
}
const adminregister=async(req,res)=>{
    try{
        validate(req.body);
        const{firstname,emailId,password}=req.body;
        req.body.password=await bcrypt.hash(password,10);
        
        
        const user=await User.create(req.body);
        const token=jwt.sign({_id:user._id,emailId:user.emailId,role:user.role},process.env.JWT_SECRET,{expiresIn:60*60});
      
        res.cookie('token', token, { 
        httpOnly: true,
        secure: true,          
        sameSite: 'none',      
        maxAge: 24 * 60 * 60 * 1000, 
        path: '/'
        });
        res.status(200).send("Registered Successfully");
        

    }catch(err){
        res.status(503).send("Error:"+err.message);

    }
}

const deleteprofile=async(req,res)=>{
    try{
        const userId=req.result._id;
        //finding user id and deleting based on that
        await User.findByIdAndDelete(userId);
        //also deleting submission done by user
        // await SubmitProblem.deleteMany({userId});
        res.status(200).send("Deleted Successfully");


    }catch(err){
        res.status(500).send("Error"+err.message);

    }

}
module.exports={register,login,logout,adminregister,deleteprofile};