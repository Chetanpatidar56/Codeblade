const SumbitProblem=require('../model/submission');
const Problem=require('../model/problem');
const { getlanguageById, submitBatch, submitToken } = require('../utilis/problemutilis');

const submitCode=async(req,res)=>{
   try{
    //submit required all these essentials
     const userId=req.result._id;
    const problemId=req.params.id;
    let {language,code}=req.body;
    if(!userId||!problemId||!code||!language){
        return res.status(400).send("Some Fields Missing");
    }
    // when we submit it actually runs hiddencases, for that
    // we have to fetch hiddentestcases from database respective to problem -->based on id
    const problem=await Problem.findById(problemId);
    if(language==='cpp'){
        language='c++';
    }
    //frontend code,language is saved to database for in case of error from judge0
    const submittedResult=await SumbitProblem.create({
        userId,
        problemId,
        code,
        language,
        status:'pending',
        testCasesTotal:problem.hiddentestcases.length
    })

    //submiting hidden testcases to judge0 
    const languageId=getlanguageById(language);
    const submissions=problem.hiddentestcases.map((testcase)=>({
        source_code:code,
        language_id:languageId,
        stdin:testcase.input,
        expected_output:testcase.output
    }));

    const submitResult=await submitBatch(submissions);
    const resultToken=submitResult.map((value)=>value.token);
    const testResult=await submitToken(resultToken);
    
    

    //update submitResult with the result get from judge0
    let testCasePassed=0;
    let runtime=0;
    let memory=0;
    let status='accepted';
    let errorMessage=null;
    for(const test of testResult){
        if(test.status_id==3){
            testCasePassed++;
            runtime=runtime+parseFloat(test.time);
            memory=Math.max(memory,test.memory);
        }
        else{
            if(test.status_id==4){
                status='error';
                errorMessage=test.stderr;
            }
            else{
                status='wrong';
                errorMessage=test.stderr;
            }
        }
    }
   //store updated data to submittedResult
   submittedResult.status=status;
   submittedResult.testCasePassed=testCasePassed;
   submittedResult.errorMessage=errorMessage;
   submittedResult.runtime=runtime;
   submittedResult.memory=memory;

   await submittedResult.save();

   //store problem solved by user that are unique
   if(!req.result.problemsolved.includes(problemId))
   {
    req.result.problemsolved.push(problemId);
    await req.result.save();

   }
   const accepted=(status=='accepted');
   res.status(201).json({
    accepted,
    totalTestCases:submittedResult.testCasesTotal,
    passedTestCases:testCasePassed,
    runtime,
    memory
   });
   
    
   }catch(err){
    res.status(500).send("Internal Server Error"+err.message);

   }

}
const runCode=async(req,res)=>{
    try{
        //fetch user info to show responses on frontend
        const userId=req.result._id;
        const problemId=req.params.id;
        let {code,language}=req.body;
        if(!userId ||!problemId|| !code||!language){
            return res.status(404).send("Some Missing Field");
        }
        const problem=await Problem.findById(problemId);
        if(language=='cpp'){
            language='c++';
        }
         //accessing language id by the already creating function getlanguageById
         const languageId=getlanguageById(language);
        //submit problem to judge0 for execution for visibletestcases
       
        const submission=problem.visibletestcases.map((testcase)=>({
            source_code:code,
            language_id:languageId,
            stdin:testcase.input,
            expected_output:testcase.output
        }));

        const submitResult=await submitBatch(submission);
        const resultToken=submitResult.map((value)=>value.token);
        const testResult=await submitToken(resultToken);
        const toshow=testResult.map(r=>({
            input:r.stdin,
            output:r.expected_output,
            Result:r.status.description
        }));
        
        let testCasePassed=0;
        let runtime=0;
        let memory=0;
        let status=true;
        let errorMessage=null;
        for(const test of testResult){
            if(test.status_id==3){
                testCasePassed++;
                runtime=runtime+parseFloat(test.time);
                memory=Math.max(memory,test.memory);
            }
            else{
                if(test.status_id==4){
                    status=false;
                    errorMessage=test.stderr;

                }
                else{
                    status=false;
                    errorMessage=test.stderr;
                }
            }
        }

        res.status(201).json({
            success:status,
            testCases:testResult,
            runtime,
            memory

        });

        

    }catch(err){
        res.status(500).send("Internal Server Error"+err);

    }
}
module.exports={submitCode,runCode};