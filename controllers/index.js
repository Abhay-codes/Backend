const express = require("express");
const  {loginService, signUpService} =require('../services');


const emailRegex = /^[^\d][a-zA-Z\d._-]*[a-zA-Z][a-zA-Z\d._-]*@([a-zA-Z\d.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[a-zA-Z\d@]+$/;
const loginController=async(req,res)=>{
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

module.exports = {
    loginController,
    signUpController
  };
