const express=require('express');
const problemrouter=express.Router();
const adminmiddleware=require('../middleware/adminmiddleware');
const {createproblem, updateproblem, deleteproblem, getproblembyid, getallproblem, allproblemsolvedbyuser, submissionsbyuser} = require('../controllers/userProblem');
const usermiddleware = require('../middleware/usermiddleware');

problemrouter.post('/create',adminmiddleware,createproblem);
problemrouter.delete('/delete/:id',adminmiddleware,deleteproblem);
problemrouter.put('/update/:id',adminmiddleware,updateproblem);
problemrouter.get('/getproblembyid/:id',usermiddleware,getproblembyid);
problemrouter.get('/getallproblem',usermiddleware,getallproblem);
problemrouter.get('/allproblemsolvedbyuser',usermiddleware,allproblemsolvedbyuser);
problemrouter.get('/submissions/:id',usermiddleware,submissionsbyuser);

module.exports=problemrouter;