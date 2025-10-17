const mongoose=require('mongoose');
const {Schema}=mongoose;

const userschema=new Schema({
    firstname:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20
    },
    lastname:{
        type:String,
        minLength:3,
        maxLength:20
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        immutable:true,
        trim:true,
        lowercase:true
    },
    age:{
        type:Number,
        min:5,
        max:100
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    problemsolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem'
        }], 
        unique:true
    },
    password:{
        type:String,
        required:true,
    

    }
},{timestamps:true});
userschema.post('findOneAndDelete',async function(userinfo){
    if(userinfo){
        await mongoose.model('submissions').deleteMany({userId: userinfo._id});
    }
});

const User=mongoose.model("user",userschema);
module.exports=User;