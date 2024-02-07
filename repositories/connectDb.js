mysql= require('mysql')
const dbconfig =require("../db.json");
const connection = mysql.createConnection(dbconfig); 


module.exports= connection;

  

