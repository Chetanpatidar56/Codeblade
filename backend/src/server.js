const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const main=require('./config/db');
const cookieParser=require('cookie-parser');
const authRouter=require('./routes/userAuth');
const redisClient=require('./config/redis');
const problemrouter=require('./routes/problemshower');
const submitrouter = require('./routes/submit');
const AIRouter=require('./routes/ChatAI');
const videoRouter = require('./routes/videoCreator');
dotenv.config();
const app=express();

//allowing frontend port no. to make changes over the database 
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/user',authRouter);
app.use('/problem',problemrouter);
app.use('/submission',submitrouter);
app.use('/ai',AIRouter);
app.use('/video',videoRouter);



const initializeconnection= async()=>{
    try{
        await Promise.all([main(),redisClient.connect()]);
        console.log("Databases Connected");
        app.listen(process.env.PORT,()=>{
            console.log("listening at port no."+process.env.PORT);
        });

    }catch(err){
        console.log("Error from server:"+err);

    }
}
initializeconnection();



