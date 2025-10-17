const express=require('express');
const submitrouter=express.Router();
const usermiddleware=require('../middleware/usermiddleware');
const {submitCode,runCode} = require('../controllers/submitCode');

submitrouter.post('/submit/:id',usermiddleware,submitCode);
submitrouter.post('/run/:id',usermiddleware,runCode)

module.exports=submitrouter;