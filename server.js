const express =require('express');
const cors =require('cors')
const router =require("./routes")
const database = require("./repositories/connectDb");


const app =express()
app.use(express.json()) //Without this middleware, you would need to manually parse the JSON using something like JSON.parse(req.body).

// Configure CORS
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      exposedHeaders: ["Content-Length", "Authorization"],
      credentials: true,
    })
  );

const Port =8000;
database;
app.use('/', router);

app.listen(Port, ()=> {
    console.log(`Listening on Port - ${Port}`); 

})