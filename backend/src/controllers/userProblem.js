const {getlanguageById, submitBatch, submitToken} = require("../utilis/problemutilis");
const Problem=require('../model/problem');
const User=require('../model/user');
const SumbitProblem = require("../model/submission");
const SolutionVideo = require("../model/solutionVideo");


const createproblem = async(req, res) => {
    const {title, description, difficulty, tags, visibletestcases,
        hiddentestcases, startcode, refrencesolution, problemcreator} = req.body;

    try {
        // Validation
        if(!title || !description || !difficulty) {
            return res.status(400).send("Required fields missing");
        }
        
        if(!refrencesolution || !Array.isArray(refrencesolution)) {
            return res.status(400).send("Reference solution array required");
        }
        
        if(!visibletestcases || !Array.isArray(visibletestcases)) {
            return res.status(400).send("Visible test cases array required");
        }

        for(const {language, completecode} of refrencesolution) {
            // Normalize language name
            let normalizedLanguage = language.toLowerCase();
            if(normalizedLanguage === 'cpp') {
                normalizedLanguage = 'c++';
            }
            
            const languageId = getlanguageById(normalizedLanguage);
            
            if(!languageId) {
                return res.status(400).send(`Unsupported language: ${language}`);
            }

            const submissions = visibletestcases.map((testcase) => ({
                source_code: completecode,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            console.log(`\n=== Testing ${language} ===`);
            console.log('Number of test cases:', submissions.length);

            const submitResult = await submitBatch(submissions);
            const resultToken = submitResult.map((value) => value.token);
            const testResult = await submitToken(resultToken);
            
            // 🔍 DETAILED DEBUG LOGGING
            for(let i = 0; i < testResult.length; i++) {
                const test = testResult[i];
                const testcase = visibletestcases[i];
                
                console.log(`\n--- Test Case ${i + 1} ---`);
                console.log('Status:', test.status_id, '-', test.status?.description);
                console.log('Input:', JSON.stringify(testcase.input));
                console.log('Expected:', JSON.stringify(testcase.output));
                console.log('Actual stdout:', JSON.stringify(test.stdout));
                console.log('Stderr:', test.stderr);
                console.log('Compile output:', test.compile_output);
                
                // Compare byte-by-byte
                if(test.stdout !== testcase.output) {
                    console.log('❌ MISMATCH DETAILS:');
                    console.log('Expected length:', testcase.output?.length);
                    console.log('Actual length:', test.stdout?.length);
                    console.log('Expected bytes:', Buffer.from(testcase.output || ''));
                    console.log('Actual bytes:', Buffer.from(test.stdout || ''));
                }

                if(test.status_id !== 3) {
                    const errorDetails = {
                        language,
                        testCaseNumber: i + 1,
                        status: test.status?.description,
                        input: testcase.input,
                        expectedOutput: testcase.output,
                        actualOutput: test.stdout,
                        stderr: test.stderr,
                        compileOutput: test.compile_output
                    };
                    
                    console.error('Full error details:', JSON.stringify(errorDetails, null, 2));
                    
                    return res.status(400).json({
                        error: `Test failed for ${language}`,
                        details: errorDetails
                    });
                }
            }
        }

        const userProblem = await Problem.create({
            ...req.body,
            problemcreator: req.result._id
        });
        
        res.status(200).json({
            message: "Problem stored successfully",
            problemId: userProblem._id
        });

    } catch(err) {
        console.error('Error in createproblem:', err);
        res.status(400).send("Error occurred: " + err.message);
    }
}


const updateproblem=async(req,res)=>{
    const {id}=req.params;
     const{title,description,difficulty,tags,visibletestcases,
        hiddentestcases,startcode,refrencesolution,problemcreator,}=req.body;
        try{
            if(!id){
                return res.status(400).send("ID is missing");
            }
            const dsaproblem=await Problem.findById(id);
            if(!dsaproblem){
                return res.status(404).send("Problem is not present");
            }
            for(const {language,completecode} of refrencesolution){
            const languageId=getlanguageById(language);

            const submissions=visibletestcases.map((testcase)=>({
                source_code:completecode,
                language_id:languageId,
                stdin:testcase.input,
                expected_output:testcase.output
            }));
        
            const submitResult=await submitBatch(submissions);

            const resultToken=submitResult.map((value)=>value.token);

            const testResult=await submitToken(resultToken);
            for(const test of testResult){
                if(test.status_id!=3){
                     return res.status(400).send("Error Occured");
                }
            }
        }
            const newproblem=await Problem.findByIdAndUpdate(id,{...req.body},{runValidator:true, new:true});
            res.status(200).send(newproblem);


        }catch(err){
            res.status(404).send("Error Occured"+err.message);
        }
    
}
const deleteproblem=async(req,res)=>{
    const {id}=req.params;
    try{
        if(!id){
            return res.status(400).send("ID is missing");
        }
        const deletedproblem=await Problem.findByIdAndDelete(id);
        if(!deletedproblem){
            return res.status(400).send("Problem is not present");
        }
        res.status(200).send("Deleted Successfully");

    }catch(err){
        res.status(400).send("Error Occured"+err.message);

    }
}
const getproblembyid=async(req,res)=>{
    const{id}=req.params;
    try{
        if(!id){
            return res.status(400).send("ID is missing");
        
        }
        const getproblem=await Problem.findById(id);
        console.log(getproblem);
        if(!getproblem){
            return res.status(404).send("problem is not available");
        }
        
        // integrating video feature
        const videos=await SolutionVideo.findOne({problemId:id});
        if(videos){
            responsedata={
                ...getproblem.toObject(),
                secureUrl:videos.secureUrl,
                cloudinaryPublicId:videos.cloudinaryPublicId,
                duration:videos.duration,
                thumbnailUrl:videos.thumbnailUrl
            }
        

             return res.status(201).send(responsedata);
        }
        res.status(201).send(getproblem);


    }catch(err){
        res.status(404).send("Error Occured"+err);

    }
}
const getallproblem=async(req,res)=>{
    
    try{
        const getall=await Problem.find({}).select('_id title difficulty tags');
        if(getall.length==0){
            return res.send(400).send("Problems are Missing");
        }
        res.status(200).send(getall);

    }catch(err){
        res.status(404).send("Error"+err);

    }

}
const allproblemsolvedbyuser=async(req,res)=>{
    try{
        const userId=req.result._id;
        const user=await User.findById(userId).populate({
            path:"problemsolved",
            select:'_id title description tags difficulty'
        })
        res.status(200).send(user.problemsolved);

    }catch(err){
        res.status(500).send("Server Error"+err);
    }
}
const submissionsbyuser=async(req,res)=>{
    try{
        const userId=req.result._id;
        const problemId=req.params.id;
        const ans=await SumbitProblem.find({userId,problemId});
        if(ans.length==0){
            res.status(200).send("No Submissions are present");
        }
        res.status(200).send(ans);

    }catch(err){
        res.status(500).send("Internal Server Error");

    }
}
module.exports={createproblem,updateproblem,deleteproblem,getproblembyid,getallproblem,allproblemsolvedbyuser,submissionsbyuser};