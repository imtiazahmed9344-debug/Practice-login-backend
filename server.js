// express import
const express = require("express");

// sql server library
const sql = require("mssql");

// cors allow mobile request
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// database configuration
const config = {
 user: "sa", // database username
 password: "123456", // database password
 server: "YOUR_SERVER_IP", // sql server ip
 database: "login_app",
 options:{
  encrypt:false,
  trustServerCertificate:true
 }
};


// LOGIN API
app.post("/login", async (req,res)=>{

 try{

  const {username,password}=req.body;

  await sql.connect(config);

  const result = await sql.query`
  SELECT * FROM users
  WHERE username=${username}
  AND password=${password}
  `;

  if(result.recordset.length>0){

   res.json({
    status:true,
    message:"Login success"
   });

  }else{

   res.json({
    status:false,
    message:"Invalid login"
   });

  }

 }catch(err){

  res.send(err);

 }

});


// server start
app.listen(3000,()=>{

 console.log("Server running");

});