const express = require("express");
const  {loginService, signUpService} =require('../services');
const jwt = require('jsonwebtoken');


var fs = require('fs');
const path = require('path');


const emailRegex = /^[^\d][a-zA-Z\d._-]*[a-zA-Z][a-zA-Z\d._-]*@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]+$/;




const verifyToken = (req, res, next) => {
    console.log("verifytoken",req.cookies);
    secretkey='876897668899';
    const token1 = req.cookies.token;

    console.log("token1",token1);
    if (!token1) {
        return res.status(401).send("User not authenticated");
    }

    jwt.verify(token1, secretkey, (err, payload) => {
        if (err) {
            // Token verification failed
            console.error("JWT verification error:", err);
            return res.status(403).send("Token verification failed");
        }

        if (!payload) {
            // Invalid token
            return res.status(401).send("User not authenticated");
        }

        console.log("Payload:", payload);
        req.email= payload.email; 
        req.password=payload.password;
        
    });
};








const loginController=async(req,res)=>{
    debugger
    try{
    const { email, password } = req.body;
        
    if (!email || !password) {
        return res.send({
            status: 0,
            success: false,
            message: "Please enter email or password",
            result: {},
        });
    }

    else if (!emailRegex.test(email)) {
        return res.send({
            status: 0,
            sucess: false,
            message: "Email must contain atleast one letter, @ special character and it doesn't start with number.",
            result: {}
        })
    }

    else {
        const loginData = {email, password};
        const result = await loginService(loginData); // Calling login services

        if (result && result.length == 0) {
            throw new Error("Wrong Email")
        }

        // For successfull login
        else {

            const secretKey = '876897668899';
            const token = jwt.sign(loginData, secretKey, { expiresIn: '30s' }); 
            //console.log('JWT token:', token);
            res.cookie('token',token);
               
            


            res.send({
                status: 1,
                success: true,
                message: "Successfully Login",
                result,
            }); 
        }
    }

}
 catch (error) { // error handling
    console.log(error);
    if (error.message == "Wrong Email")
    {
        return res.send({
            status: 0,
            success: false,
            message: "User doesn't exist!! Please Register",
            result: {},
        });
    }
    else if(error.message == "Please enter the correct password")
    {
        return res.send({
            status: 0,
            success: false,
            message: "Wrong Password",
            result: {},
        });
    }
    else{
        return res.send({
            status: 0,
            success: false,
            message: "Error in Login controller",
            result: {},
        });
    }
}
    };


    



const signUpController=async(req,res)=>{
    const {name, email ,  password} =req.body;
    try {
        
        
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.send({
                status: 0,
                sucess: false,
                message: "empty input",
                result: {}
            })
        }


        else if (!emailRegex.test(email)) {
            return res.send({
                status: 0,
                sucess: false,
                message: "enter a valid email.",
                result: {}
            })
        }

        else if (password.length <=6) {
            return res.send({
                status: 0,
                sucess: false,
                message: "Password length should be greater than 6.",
                result: {}
            })
        }

        else if (!passwordRegex.test(password)) {
            return res.send({
                status: 0,
                sucess: false,
                message: "password should follow the pattern ",
                result: {}
            })
        }

        else {
            const signupData = { name, email, password };
            const result = await signUpService(signupData);

        }
    }
    catch(error){
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
        console.log(res);
  
        }

    


}




const policyDocs=(req,res)=>{
    

    const directoryPath ='/home/abhay/Documents/project_investwell/frontend/public/pdf'
    try {
    const files =fs.readdirSync(directoryPath)
        result=[]
        let id =0;
        files.map(file => {
            id+=1; 
            const content={
                id:id,
                fileName:file
            }
            result.push(content)
        }
        )

          
        return res.send({
            success : true,
            status : 1,
            message : "Successfully get PolicyDocs Data",
            result
        })
    }

    catch (error) {
        console.log(error);
        return res.send({
            success : false,
            status : 0,
            message : "Error in Policy Docss Controller"
        })


    }
};




    const policyDocs1= async (req, res) => {
        try {
            const result = [];
            const folderName="/home/abhay/Documents/project_investwell/frontend/src/media/pdf"
            const policies = await fsPromises.readdir(folderName);
            policies.map(policy => {
                console.log(policy);
                result.push(policy);
            })
    
            return res.send({
                success : true,
                status : 1,
                message : "Successfully get PolicyDocs Data",
                result
            })
        } catch (error) {
            console.log(error);
            return res.send({
                success : false,
                status : 0,
                message : "Error in Policy Docss Controller"
            })
        }
    }

const pdfData=async(req,res)=>{
    const directoryPath ='/home/abhay/Documents/project_investwell/frontend/public/pdf'
    //const getcontent="/home/abhay/Documents/project_investwell/frontend/public/pdf/file-sample_150kB.pdf"
    try {
        const files =fs.readdirSync(directoryPath)
            result=[]
            //let id =0;
            files.map(file => {
                //id+=1; 
                content=directoryPath+ '/' +file;
                result.push(content)
            }
            )
    
              
            return res.send({
                success : true,
                status : 1,
                message : "Successfully get PolicyData",
                result
            })
        }
    
        catch (error) {
            console.log(error);
            return res.send({
                success : false,
                status : 0,
                message : "Error in Data Controller"
            })
    
    
        }
    };
   

module.exports = {
    loginController,
    signUpController,
    verifyToken,
    policyDocs,
    pdfData
  };
