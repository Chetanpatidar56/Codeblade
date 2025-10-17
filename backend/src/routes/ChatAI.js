const express=require('express');
const usermiddleware = require('../middleware/usermiddleware');
const Doubtsolver = require('../controllers/Doubtsolver');
const AIRouter=express.Router();

AIRouter.post('/chat',usermiddleware,Doubtsolver);

module.exports=AIRouter