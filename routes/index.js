const express = require("express");
const  {loginController, signUpController,verifyToken,policyDocs,pdfData} =require('../controllers');

const router = express.Router();
router.post('/login', loginController);
router.post('/signup', signUpController);
router.get('/home',verifyToken);
router.get('/PolicyDocs',policyDocs);
router.get('/PDFdata', pdfData);
module.exports = router;
