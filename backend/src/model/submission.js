const mongoose=require('mongoose');
const {Schema}=mongoose;

const submissionSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        index:true
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:'Problem',
        required:true,
        index:true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['javascript','c++','java','python','c']
    },
    status:{
        type:String,
        enum:['pending','accepted','wrong','error'],
        default:'pending'
    },
    runtime:{
        type:Number,
        default:0
    },
    memory:{
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:''
    },
    testCasePassed:{
        type:Number,
        default:0
    },
    testCasesTotal:{
        type:Number,
        default:0
    }
},{timestamps:true})
submissionSchema.index({userId:1,problemId:1});

const SumbitProblem= mongoose.model('submissions',submissionSchema);
module.exports=SumbitProblem;