const express=require('express');
const { submitContact } = require('../controllers/contactController');

const contactRouter=express.Router();

contactRouter.post('/submit', submitContact)

module.exports=contactRouter;
