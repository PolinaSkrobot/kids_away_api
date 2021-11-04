const express = require("express");
const router = express.Router();
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 


module.exports=(db)=>{
  router.post("/", (req, res) => {
    console.log("update", req.query);
    const data = JSON.parse(req.query.status); 
    console.log("update data", data);
      db.query(`
      UPDATE orders
      SET status = $1
      WHERE orders.id=$2;`, [data.status, data.id])
    
    .then((result) => {
      console.log("result after rate parent",result);
      res.send(result.command);
    })
    .then(()=>{
      client.messages 
            .create({ 
               body: 'Your order on KidsAway with sitter Sobina was confirmed! Thank you for trusting us',  
               messagingServiceSid: process.env.MESS_SERVING_SID,      
               to: process.env.PHONE_NUMBER_PARENT 
             }) 
            .then(message => console.log(message.sid)) 
            .done();
    })
  });
return router;
}