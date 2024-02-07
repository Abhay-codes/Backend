const connection =require('./connectDb.js')
const util = require("util");

connection.connect();

const query = util.promisify(connection.query).bind(connection); // instead of using callbackk ----async await can be used 


//onlogin


const loginUser = async(email) => {
    const result = await query(`SELECT * FROM users WHERE email = ?`, [email]);
    console.log(result);

    return result;
}


//on signup



const checkForExistingUser = async (email) => {
    
    const result = await query(`SELECT * FROM users WHERE email = ?`, [email]);

    console.log(result);
    return result;
}




const signupUser = async (signupdata) => {
    
    
    const result = await query(`INSERT INTO users ( name, email, password, salt ) VALUES ( ?, ?, ?, ? )`, [signupdata.name, signupdata.email,signupdata.password, signupdata.salt]);

    console.log(result);
    return result;

}
module.exports={
    loginUser,
    checkForExistingUser,
    signupUser
}