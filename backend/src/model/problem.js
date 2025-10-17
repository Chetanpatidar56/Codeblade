const mongoose=require('mongoose');
const {Schema}=mongoose;

const problemSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],
        required:true
    },
    tags:{
        type:String,
        enum:['array','linked list','string','dynamic programming','quene','stack','graph','math'],
        required:true
    },
    visibletestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }

    }
    ],
    hiddentestcases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            }
        }
    ],
    startcode:[
        {
            language:{
                type:String,
                required:true
            },
            initialcode:{
                type:String,
                required:true
            }
        }
    ],
    refrencesolution:[
        {
            language:{
                type:String,
                required:true
            },
            completecode:{
                type:String,
                required:true

            }
        }
    ],
    problemcreator:{
        type:Schema.Types.ObjectId,
        ref:'user',
        
    }
})
const Problem=mongoose.model('problem',problemSchema);
module.exports=Problem;